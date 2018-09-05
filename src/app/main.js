const electron = require('electron');
require('electron-reload')(__dirname);

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const ipc = require('node-ipc');
ipc.config.id = 'eon';
ipc.config.retry = 1000;
const ipcmain = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {

	mainWindow = new BrowserWindow({ width: 1100, height: 900 });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

//--------------------

const os = require('os');
var apiProcess = null;

function startApi() {
    var proc = require('child_process').spawn;
    //  run server
    var apipath = path.join(__dirname, '..\\api\\bin\\dist\\win\\api.exe');
    if (os.platform() === 'darwin') {
        apipath = path.join(__dirname, '..//api//bin//dist//osx//Api');
    }
    apiProcess = proc(apipath);

    apiProcess.stdout.on('data', (data) => {
        writeLog(`stdout: ${data}`);
    });
    apiProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    startIpc();
}

function startIpc() {
    if (mainWindow == null) {
        createWindow();
        ipc.connectTo(
            'eoncore',
            function () {
                ipc.of.eoncore.on(
                    'connect',
                    () => ipc.log('## connected to eoncore ##', ipc.config.delay)
                );
                ipc.of.eoncore.on(
                    'disconnect',
                    () => ipc.log('disconnected from eoncore')
                );
            }
        );

        ipcmain.on('wallet.ListNodes', function (event, args) {
            ipc.of.eoncore.once('wallet.ListNodes', (data) => {
                ipc.log(data);
                mainWindow.webContents.send('wallet.ListNodes', data);
            });
            ipc.log(ipc.of.eoncore.emit('wallet.ListNodes', args));
        });

        ipcmain.on('exec-command', (event, args) => {
            ipc.of.eoncore.once(args.command, (data) => {
                ipc.log(data);
                mainWindow.webContents.send(args.command, data);
            });
            ipc.log(ipc.of.eoncore.emit(args.command, args.data));
        });
    }
}

//Kill process when electron exits
process.on('exit', function () {
    writeLog(ipc.of.eoncore.destroy);
    if (apiProcess != null) {
        apiProcess.kill();
    }
    writeLog('exit');
});

function writeLog(msg) {
    console.log(msg);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
if (process.argv.indexOf('debug') > -1) {
    app.on('ready', startIpc);
}
else {
    //app.on('ready', createWindow);
    app.on('ready', startApi);
}
