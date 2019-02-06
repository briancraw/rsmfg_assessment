/*
  Copyright (C) 2018, 3DM LLC, All rights reserved
  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
  Written by Brian Craw <craw.brian@gmail.com>, February 2019

  Revision Comments:
  02/05/2018 - Initial version.
*/


const electron = require("electron");
const {autoUpdater} = require("electron-updater");
const path = require("path");
const url = require("url");
var {app, BrowserWindow, ipcMain} = electron;
var win;

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

function programArduino() {
  const {execFile} = require('child_process');
  hexfile = path.join(__dirname, 'build', 'rsmfg.ino.hex');
  flashOpt = "-Uflash:w:"+"\""+hexfile+"\""+":i";
  console.log("flashOpt: "+flashOpt);
  //  var executablePath = ":\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  //var executablePath = "avrdude -v -patmega2560 -carduino -PCOM3 -b57600 -Uflash:w:"C:\Users\brian\Documents\RSMFG\rsmfg_assessment\arduino\hex_files\rsmfg.ino.hex":i -F"
  //const child = execFile('avrdude', ['-v', '-patmega2560', '-carduino', '-PCOM3 -b57600', '-Uflash:w:""\rsmfg.ino.hex":i', '-F'], (err, stdout, stderr) => {
  const child = execFile('avrdude', ['-v', '-patmega2560', '-cwiring', '-PCOM3 -b57600', flashOpt, '-F'], (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout.toString());
  });
} // programArduino


//handle setupevents as quickly as possible
//const setupEvents = require('./installers/setupEvents')
//if (setupEvents.handleSquirrelEvent()) {
if (handleSquirrelEvent(app)) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}

function createWindow() {
  win = new BrowserWindow({
  //  titleBarStyle: 'hidden',
  width: 1280,
  height: 768,
  //minWidth: 1280,
  //minHeight: 768,
  //backgroundColor: '#312450',
  //show: false,
    icon: path.join(__dirname, 'build/icon.png')
  });
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

//win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  require('./js/mainmenu');
}

app.on('ready', function() {
//  programArduino();
  createWindow();
  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

var { dialog } = require('electron');

autoUpdater.on('update-downloaded', (info) => {
    //win.webContents.send('updateReady');
  var detailString = "Version " + info.version + " has been downloaded." + "\n" + "The Application will now restart..."

  const dialogOpts = {
     type: 'info',
     buttons: ['Restart', 'Later'],
     title: 'Application Downloaded',
     message: process.platform === 'win32' ? info.releaseNotes : info.releaseName,
     detail: detailString,
  //   icon: "build/icon.png"
     //icon: appIcon
   };

   console.log(dialogOpts.message)

   dialog.showMessageBox(dialogOpts, (response) => {
     if (response === 0) autoUpdater.quitAndInstall()
   });
}); // update-downloaded

autoUpdater.on('update-available', (info) => {
  win.webContents.send('updateAvailable');

//  reportDownloadInProgress();

//  let msg = "A new version of the application is being downloaded." + "\n" + "Upon completion the Application will automatically restart.";

//  var dialogOpts = {
//     type: 'info',
//     //buttons: ['Ok'],
//     title: 'Application Update Available',
//     message: msg,
//  //   icon: "build/icon.png"
//     //icon: appIcon
//   };

//   console.log(dialogOpts.message)

//   dialog.showMessageBox(dialogOpts, (response) => {
//   });
//
}); // update-available

autoUpdater.on('error', message => {
  console.error('There was a problem updating the application');
  console.error(message);
});

//ipcMain.on("quitAndInstall", (event, arg) => {
//  autoUpdater.quitAndInstall();
//});

//module.exports = {
//handleSquirrelEvent: function() {
function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);
  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
  return spawn(updateDotExe, args);
};

const squirrelEvent = process.argv[1];
switch (squirrelEvent) {
  case '--squirrel-install':
  case '--squirrel-updated':
    // Optionally do things such as:
    // - Add your .exe to the PATH
    // - Write to the registry for things like file associations and
    // explorer context menus

    // Install desktop and start menu shortcuts
    spawnUpdate(['--createShortcut', exeName]);

    setTimeout(application.quit, 1000);
    return true;
 case '--squirrel-uninstall':
   // Undo anything you did in the --squirrel-install and
   // --squirrel-updated handlers

   // Remove desktop and start menu shortcuts
   spawnUpdate(['--removeShortcut', exeName]);

   setTimeout(application.quit, 1000);
   return true;
 case '--squirrel-obsolete':
   // This is called on the outgoing version of your app before
   // we update to the new version - it's the opposite of
   // --squirrel-updated
   application.quit();
   return true;
  }
} // switch (squirrelEvent)
