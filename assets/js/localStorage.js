function setToLocalStorage(key, data) {
    localStorage.setItem(key, data);
}

function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

function clearLocalStorage() {
    localStorage.clear();
}

module.exports = {
    setToLocalStorage: setToLocalStorage,
    getFromLocalStorage: getFromLocalStorage,
    clearLocalStorage: clearLocalStorage
}