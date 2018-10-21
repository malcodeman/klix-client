const { shell } = require("electron");

function openExternalUrl() {
  const url = this.getAttribute("data-url");
  shell.openExternal(url);
}

module.exports = {
  openExternalUrl: openExternalUrl
};
