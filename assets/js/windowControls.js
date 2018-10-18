const { remote } = require("electron");

function minimize() {
  remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximize() {
  remote.BrowserWindow.getFocusedWindow().maximize();
}

function close() {
  remote.BrowserWindow.getFocusedWindow().close();
}

module.exports = {
  minimize: minimize,
  maximize: maximize,
  close: close
};
