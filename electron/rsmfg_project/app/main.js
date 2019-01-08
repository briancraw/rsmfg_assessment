
const electron = require("electron");
//const app = electron.app;
//const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
var {app, BrowserWindow, ipcMain} = electron;
var win;

function createWindow() {
  win = new BrowserWindow();
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
app.on('Window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
