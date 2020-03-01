// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({ width: 1400, height: 850, webPreferences: {nodeIntegration: true} })
    mainWindow.resizable = false
    
    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit() })
app.on('activate', function () { if (BrowserWindow.getAllWindows().length === 0) createWindow() })