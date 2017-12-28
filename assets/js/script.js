const Xray = require("x-ray");
const x = Xray();
const fs = require("fs");
const {
    remote
} = require("electron");

const renderArticles = require("./assets/js/renderArticles");
const sortArticles = require("./assets/js/sortArticles");

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

// Sortings

function changeSortLabel(newLabel) {
    document.getElementById("sort_label").textContent = newLabel;
}

function changeSort(art) {
    clearMain();
    let sort = getSort();
    if (sort === "date") {
        renderArticles.renderArticles(sortArticles.sortByComments(art, true));
        changeSortLabel("Comments");
        setSort("comments");
    } else if (sort === "comments") {
        renderArticles.renderArticles(sortArticles.sortByShares(art, true));
        changeSortLabel("Shares");
        setSort("shares");
    } else if (sort === "shares") {
        renderArticles.renderArticles(loadArticles());
        changeSortLabel("Date");
        setSort("date");
    }
}

function clearMain() {
    document.getElementById("main").innerHTML = "";
}

function getSort() {
    return localStorage.getItem("sort");
}

function setSort(newSort) {
    localStorage.setItem("sort", newSort);
}

function main() {
    //getArticles(1, 5);
    const art = loadArticles();
    console.log(art);
    clearMain();
    renderArticles.renderArticles(art);
    localStorage.setItem("sort", "date");
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