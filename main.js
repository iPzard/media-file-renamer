// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const getPort = require('get-port');
const path = require('path');
const { electron } = require('process');

// Dynamically set the port number to an open port within the range of 3000-3999
// This way if a port is in use it will just go to the next.
let port;
(async () => {
  port = await getPort({port: getPort.makeRange(3000, 3999)});
  ipcMain.on('get-port-number', (event, arg) => event.returnValue = port);

})();


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 850,
    height: 800,
    minWidth: 850,
    minHeight: 800,
    maxWidth: 1050,
    maxHeight: 1200,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'build/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  // DEV: Developer zone
  // Send window control event listeners to front end
  ipcMain.on('app-quit', (event, arg) => app.quit());
  ipcMain.on('app-minimize', (event, arg) => mainWindow.minimize());
  ipcMain.on('app-maximize', (event, arg) => mainWindow.maximize());
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })


  // Connect to Python micro-services
  const flask = exec(`cd ${__dirname} && flask run -p ${port}`); //.stdout.pipe(process.stdout); // console.log python stuffs
  process.on('exit', ()=> flask.kill()); // Kill flask when app closes
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})
