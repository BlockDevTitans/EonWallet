import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

const ipc = require('node-ipc');
ipc.config.id = 'eon';
ipc.config.retry = 1000;
const ipcmain = ipcMain;

function createWindow()
{

  const electronScreen = screen;
  //const size = electronScreen.getPrimaryDisplay().workAreaSize;
  const size = { width: 1000, height: 900 };

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  if (serve)
  {
    //In debug mode it's advised to start NET Core service separately
    //otherwise uncomment the following line
    //startApi();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

    win.webContents.openDevTools();
    win.setMenu(null);
  } else
  {
    startApi();

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));

    win.setMenu(null);
  }

  // Emitted when the window is closed.
  win.on('closed', () =>
  {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  ipc.connectTo(
    'eoncore',
    function ()
    {
      ipc.of.eoncore.on(
        'connect',
        () => ipc.log('## connected to eoncore ##', ipc.config.delay)
      );
      ipc.of.eoncore.on(
        'disconnect',
        () => ipc.log('disconnected from eoncore')
      );
      ipc.of.eoncore.on(
        'event',
        (data) =>
        {
          win.webContents.send(data.name + "-event", data.data);
        }
      );
    }
  );

  ipcmain.on('exec-command', (event, args) =>
  {
    ipc.of.eoncore.once(args.command, (data) =>
    {
      ipc.log(data);
      win.webContents.send(args.command, data);
    });
    ipc.log(ipc.of.eoncore.emit(args.command, args.data));
  });
}


const os = require('os');
var apiProcess = null;
function startApi()
{
  //Starts NET Core Api service
  var proc = require('child_process').spawn;
  var apipath = path.join(__dirname, '..\\api\\bin\\dist\\win\\api.exe');
  if (os.platform() === 'darwin')
  {
    apipath = path.join(__dirname, '..//api//bin//dist//osx//Api');
  }
  apiProcess = proc(apipath);

  apiProcess.stdout.on('data', (data) =>
  {
    console.log(`stdout: ${data}`);
  });
  apiProcess.stderr.on('data', (data) =>
  {
    console.log(`stderr: ${data}`);
  });
}

try
{
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () =>
  {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
    {
      app.quit();
    }
  });

  app.on('activate', () =>
  {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null)
    {
      createWindow();
    }
  });

  //Disables menu for all windows
  //app.on('browser-window-created', function (e, window)
  //{
  //  window.setMenu(null);
  //});

  //Kill process when electron exits
  process.on('exit', function ()
  {
    console.log(ipc.of.eoncore.destroy);
    if (apiProcess != null)
    {
      apiProcess.kill();
    }
    console.log('exit');
  });

} catch (e)
{
  // Catch Error
  // throw e;
}
