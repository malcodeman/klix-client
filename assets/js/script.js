const windowControls = require("./assets/js/windowControls");
const pagination = require("./assets/js/pagination");

async function main() {
  pagination.setInitial();
  pagination.getLatest();
}

document
  .getElementById("close")
  .addEventListener("click", windowControls.close);
document
  .getElementById("minimize")
  .addEventListener("click", windowControls.minimize);
document
  .getElementById("zoom")
  .addEventListener("click", windowControls.maximize);

main();
