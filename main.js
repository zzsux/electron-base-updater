const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const log = require('electron-log');

/** 创建主页面窗口 */
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html');

  // 打开控制台
  // mainWindow.webContents.openDevTools();
}

/** 应用最新版本查询 */
function checkUpdate(){
  if (process.platform == 'darwin') {
    // 设置要检测的Mac平台文件更新路径
    autoUpdater.setFeedURL('http://127.0.0.1:9005/darwin');
  } else {
    // 设置要检测的Windows平台文件更新路径
    // autoUpdater.setFeedURL('http://127.0.0.1:9005/win32');
    autoUpdater.setFeedURL('https://github.com/zzsux/electron-base-updater/releases/download/v1.0.0');
  }
  
  // 检测更新
  autoUpdater.checkForUpdates();
  
  //监听'error'事件
  autoUpdater.on('error', (err) => {
    console.log(err);
    log.info(err);
  })
  
  //监听'update-available'事件，发现有新版本时触发
  autoUpdater.on('update-available', () => {
    console.log('found new version');
  })
  
  //默认会自动下载新版本，如果不想自动下载，设置autoUpdater.autoDownload = false
  
  //监听'update-downloaded'事件，新版本下载完成时触发
  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '应用更新',
      message: '发现新版本，是否更新？',
      buttons: ['是', '否']
    }).then((buttonIndex) => {
      if(buttonIndex.response == 0) {
        autoUpdater.quitAndInstall();
        app.quit();
      }
    })
  })
}

/** 初始化完成 */
app.whenReady().then(() => {
  createWindow();
  checkUpdate();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

/** 关闭所有窗口时退出应用 */
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})
