const {
    app,
    BrowserWindow
} = require("electron");
const path = require("path");
const url = require("url");
let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        minWidth: 1280,
        minHeight: 720,
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});