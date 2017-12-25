var Xray = require('x-ray');
var x = Xray();

function getArticles() {
    x("https://www.klix.ba/najnovije/str1", "article", [{
            headline: 'a h1',
            link: "a@href",
            category: ".above .kategorija",
            shares: ".above .shareovi",
            comments: ".below .comments"
        }])
        .paginate('.sljedeca@href')
        .limit(1)
        (function (err, res) {
            for (let i = 0; i < res.length; ++i) {
                renderArticle(i + 1, res[i].headline, res[i].shares, res[i].comments);
            }
        })
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

function main(){
    getArticles();
}

main();