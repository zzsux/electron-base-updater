# electron-base-updater

**Demo**

![image](https://github.com/zzsux/electron-base-updater/blob/main/demo/demo.png)

![image](https://github.com/zzsux/electron-base-updater/blob/main/demo/demo_new.png)

**项目文档**

基于electron-quick-start + electron-updater 实现 electron应用的自动更新

项目文件夹及相关文件说明：

文件夹
- `build/icons` - 运行 `npm run build-icon` 生成的一系列打包所需的图标文件目录；
- `demo` - 本地更新测试示例目录；
- `dist` - 运行 `npm run pack` 生成的一系列安装包文件目录；
- `node_modules` - 运行 `npm install` 下载的一系列依赖项文件目录；
- `public` - 静态资源目录，build/icons中的图标文件由该文件下的icon.png文件生成；
- `server` - 使用nodejs搭建的本地文件服务，本地测试时使用，若有远程文件服务地址，忽略此文件夹即可；


文件
- `.gitignore` - gitignore忽略文件；
- `index.html` - 要呈现的网页。这是应用程序的 **渲染器进程**；
- `main.js` - 启动应用程序并创建一个浏览器窗口来呈现 HTML。这是应用程序的 **主进程**；
- `package.json` - 依赖项json文件；
- `preload.js` - 在渲染器进程加载之前运行的内容脚本；


## 使用步骤

```bash
# 安装依赖
npm install

# 生成一系列打包所需的图标文件
npm run build-icon

# 运行应用
npm start

# 打包应用
npm run pack

# 本地测试更新需启动server文件夹下的本地文件服务
node server\koa-server\index.js

```

## 注意

测试更新功能需分别打包**两次**：

1.本地版本 1.0.0：修改 `package.json` 中的 `version` 为 1.0.0，然后执行打包命令 `npm run pack`，本地安装dist目录下生成的 `appName Setup 1.0.0.exe`安装包即可；

2.**远程最新版本 1.0.1**：修改 `package.json` 中的 `version` 属性为最新版本，如 1.0.1，
然后将dist目录下生成的最新版本 `latest.yml`、`appName 1.0.1.msi`、`appName Setup 1.0.1.exe`、`appName Setup 1.0.1.exe.blockmap` 文件
放到本地文件服务 `server/koa-server/win32` 目录下 或 远程文件服务地址下



无法触发更新时，可查看主进程日志文件确定问题

主进程日志文件输出目录示例：C:\Users\Developer\AppData\Roaming\electron-quick-start\logs\main.log ，
