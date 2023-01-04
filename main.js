const {app, BrowserWindow} = require('electron')
const path = require('path')

/** 创建主页面窗口 */
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // 打开控制台
  mainWindow.webContents.openDevTools()
}

/** 初始化完成 */
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/** 关闭所有窗口时退出应用 */
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
