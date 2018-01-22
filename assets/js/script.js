const fs = require("fs");

const renderArticles = require("./assets/js/renderArticles");
const sortArticles = require("./assets/js/sortArticles");
const ls = require("./assets/js/localStorage");
const getArticles = require("./assets/js/getArticles");
const windowControls = require("./assets/js/windowControls");

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

function formatArticles(articles) {
    articles.forEach(article => {
        if (article.shares.includes("k")) {
            article.shares = article.shares.replace("k", "");
            article.shares *= 1000;
        }
    });
    return articles;
}

function main() {
    //getArticles.get(1,5);
    ls.clearLocalStorage();
    let art = loadArticles();
    console.log(art);
    let art2 = formatArticles(art);
    clearElement("main");
    renderArticles.renderArticles(art2);
    ls.setToLocalStorage("sort", "date");
    /*document.getElementById("new").addEventListener("click", () => {
        clearMain();
        getArticles(1);
    });*/
    document.getElementById("x").addEventListener("click", () => {
        windowControls.close();
    });
    document.getElementById("sort").addEventListener("click", () => {
        changeSort(art);
    });
}

main();