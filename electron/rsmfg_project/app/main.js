
const electron = require("electron");
//const app = electron.app;
//const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
var {app, BrowserWindow, ipcMain} = electron;
var win;

function createWindow() {
  win = new BrowserWindow({
  //  titleBarStyle: 'hidden',
  width: 1280,
  height: 768,
  //minWidth: 1280,
  //minHeight: 768,
  //backgroundColor: '#312450',
  //show: false,
    icon: path.join(__dirname, 'img/icon.png')
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

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
