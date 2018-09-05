'use strict';

var app = angular.module('EonWallet', ['ngRoute']);
const ipc = window.require('electron').ipcRenderer;

const execcmd = (cmd, parms, callback, $scope) => {
    if (callback != null) {
        ipc.once(cmd, (event, args) => {
            callback(args);
            if ($scope != null) {
                $scope.$apply();
            }
        });
    }
    ipc.send('exec-command', { command: cmd, data: parms });
};

document.addEventListener('DOMContentLoaded', function () {
    angular.bootstrap(document, ['EonWallet']);
});

app.controller('WalletCtrl', function ($scope) {
    var ctrl = this;
    ctrl.Title = 'Nodes List';
    ctrl.ErrorMessage = undefined;

    ctrl.listNodes = () => {
        execcmd('wallet.ListNodes', ["test1", 103], (args) => ctrl.Nodes = args, $scope);
    };


});



