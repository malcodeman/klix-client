const Xray = require("x-ray");
const x = Xray();
const fs = require("fs");
const {
    remote
} = require("electron");

const renderArticles = require("./assets/js/renderArticles");
const sortArticles = require("./assets/js/sortArticles");
const ls = require("./assets/js/localStorage")

function getArticles(pageNumber, limit) {
    x("https://www.klix.ba/najnovije/str" + pageNumber, "article", [{
            headline: "a h1",
            link: "a@href",
            category: ".above .kategorija",
            shares: ".above .shareovi",
            comments: ".below .comments"
        }])
        .paginate(".sljedeca@href")
        .limit(limit)
        .write("response.json")
}

function loadArticles() {
    return JSON.parse(fs.readFileSync("response.json", "utf8"));
}

function changeTextContent(elementId, newText) {
    document.getElementById(elementId).textContent = newText;
}

function changeSort(art) {
    clearElement("main");
    let sort = ls.getFromLocalStorage("sort");
    if (sort === "date") {
        renderArticles.renderArticles(sortArticles.sortByComments(art, true));
        changeTextContent("sort_label", "Comments");
        ls.setToLocalStorage("sort", "comments");
    } else if (sort === "comments") {
        renderArticles.renderArticles(sortArticles.sortByShares(art, true));
        changeTextContent("sort_label", "Shares");
        ls.setToLocalStorage("sort", "shares");
    } else if (sort === "shares") {
        renderArticles.renderArticles(loadArticles());
        changeTextContent("sort_label", "Date");
        ls.setToLocalStorage("sort", "date");
    }
}

function clearElement(elementId) {
    document.getElementById(elementId).innerHTML = "";
}

function main() {
    ls.clearLocalStorage();
    const art = loadArticles();
    console.log(art);
    clearElement("main");
    renderArticles.renderArticles(art);
    ls.setToLocalStorage("sort", "date");
    /*document.getElementById("new").addEventListener("click", () => {
        clearMain();
        getArticles(1);
    });*/
    document.getElementById("x").addEventListener("click", () => {
        remote.BrowserWindow.getFocusedWindow().close();
    });
    document.getElementById("sort").addEventListener("click", () => {
        changeSort(art);
    });
}

main();