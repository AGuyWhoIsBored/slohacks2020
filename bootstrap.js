// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({ width: 1402, height: 875, webPreferences: {nodeIntegration: true} })
    mainWindow.resizable = false
    
    // load main page
    mainWindow.loadFile('index.html');
}

// related to opening and closing of app
app.on('ready', createWindow)
app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit() })
app.on('activate', function () { if (BrowserWindow.getAllWindows().length === 0) createWindow() })