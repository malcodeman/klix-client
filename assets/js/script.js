const Xray = require("x-ray");
const x = Xray();
const fs = require("fs");
const {
    remote
} = require("electron");

function getArticles(pageNumber) {
    x("https://www.klix.ba/najnovije/str" + pageNumber, "article", [{
            headline: "a h1",
            link: "a@href",
            category: ".above .kategorija",
            shares: ".above .shareovi",
            comments: ".below .comments"
        }])
        .paginate(".sljedeca@href")
        .limit(5)
        .write("response.json")
}

function renderArticle(id, headline, shares, comments) {
    let article = document.createElement("article");
    article.classList.add("article");

    let article_id = document.createElement("span");
    article_id.classList.add("article-id");
    article_id.textContent = id;

    let article_title = document.createElement("span");
    article_title.classList.add("article-title");
    article_title.textContent = headline;

    let div1 = document.createElement("div");

    div1.appendChild(article_id);
    div1.appendChild(article_title);

    let article_shares = document.createElement("span");
    article_shares.classList.add("article-shares");
    if (shares == 1) {
        shares += " share"
    } else {
        shares += " shares"
    }
    article_shares.textContent = shares;

    let article_comments = document.createElement("span");
    article_comments.classList.add("article-comments");
    if (comments == 1) {
        comments += " comment"
    } else {
        comments += " comments"
    }
    article_comments.textContent = comments;

    let div2 = document.createElement("div");

    div2.appendChild(article_shares);
    div2.appendChild(article_comments);

    article.appendChild(div1);
    article.appendChild(div2);

    document.getElementById("main").appendChild(article);
}

function loadArticles() {
    return JSON.parse(fs.readFileSync("response.json", "utf8"));
}

function renderArticles(articles) {
    for (let i = 0; i < articles.length; ++i) {
        renderArticle(i + 1, articles[i].headline, articles[i].shares, articles[i].comments);
    }
}

// Sortings

function sortByComments(articles, reverse = false) {
    articles.sort(function (a, b) {
        return parseInt(a.comments) - parseInt(b.comments);
    });
    if (reverse) {
        return articles.reverse();
    }
    return articles;
}

function sortByShares(articles, reverse = false) {
    articles.sort(function (a, b) {
        return parseInt(a.shares) - parseInt(b.shares);
    });
    if (reverse) {
        return articles.reverse();
    }
    return articles;
}

function changeSort(articles) {
    clearMain();
    let sort = getSort();
    if (sort === "date") {
        renderArticles(sortByComments(articles, true));
        document.getElementById("sort_label").textContent = "Comments";
        setSort("comments");
    } else if (sort === "comments") {
        renderArticles(sortByShares(articles, true));
        document.getElementById("sort_label").textContent = "Shares";
        setSort("shares");
    } else if (sort === "shares") {
        renderArticles(loadArticles());
        document.getElementById("sort_label").textContent = "Date";
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
    const articles = loadArticles();
    console.log(articles);
    clearMain();
    renderArticles(articles);
    localStorage.setItem("sort", "date");
    /*document.getElementById("new").addEventListener("click", () => {
        clearMain();
        getArticles(1);
    });*/
    document.getElementById("x").addEventListener("click", () => {
        remote.BrowserWindow.getFocusedWindow().close();
    });
    document.getElementById("sort").addEventListener("click", () => {
        changeSort(articles);
    });
}

main();