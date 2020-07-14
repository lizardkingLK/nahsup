const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const { channels } = require('../src/shared/constants')
const meta = require('./config/meta')
const path = require('path')
const url = require('url')

let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '/../icon/Icon.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    // and load the index.html of the app.
    win.loadURL(process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                { label: 'submenu label 1' },
                { label: 'submenu label 2' },
                { type: 'separator' },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click() {
                        console.log('Hello World!')
                    }
                }
            ]
        }
    ])

    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on(channels.APP_INFO, (event) => {
    event.sender.send(channels.APP_INFO, {
        appName: app.getName(),
        appVersion: app.getVersion(),
    });
});