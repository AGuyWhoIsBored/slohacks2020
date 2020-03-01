// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const electronDl = require('electron-dl');
const server = require('./app');
const path = require('path')

let mainWindow;


function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({ width: 1600, height: 1050, webPreferences: {nodeIntegration: true}
    })
    mainWindow.resizable = false
    
    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:1500/');
    ipcMain.on('download-item', async (event, {url}) => {
        event.sender.send('download-success', url)
        console.log(url)
        const win = BrowserWindow.getFocusedWindow();
        console.log(await download(win, url));
      });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// face detecting test code
//const facedetect = require('./js/facedetect.js');
//facedetect.detectFaces('group_happy.jpg');