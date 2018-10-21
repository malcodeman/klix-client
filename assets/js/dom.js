function insertComponent(location, component) {
  location.insertAdjacentHTML("beforeend", component);
}

function clear(location) {
  location.innerHTML = "";
}

module.exports = {
  insert: insertComponent,
  clear: clear
};
