const { shell } = require("electron");

const windowControls = require("./assets/js/windowControls");

const Article = ({ id, url, lead, shares, comments }) => `
<article class="article" data-url="${url}">
    <div>
        <span class="article-id">${id}</span>
        <span class="article-title">${lead}</span>
    </div>
    <div>
        <span class="article-shares">${shares} shares</span>
        <span class="article-comments">${comments} comments</span>
    </div>
</article>
`;

const Error = ({ text }) => `
<div class="error-message">${text}</div>
`;

const Loader = ({ message }) => `
<div class="loader-wrapper">
  <div class="loader"></div>
  <span class="loader-message">${message}</span>
</div>
`;

function getLatest() {
  const url = "https://micro-klix.herokuapp.com/latest";
  return fetch(url)
    .then(response => response.json())
    .then(articles => {
      return articles;
    })
    .catch(error => {
      const main = document.getElementById("main");
      main.insertAdjacentHTML(
        "beforeend",
        Error({
          text: "There was an error fetching articles"
        })
      );
    });
}

function openExternalUrl() {
  const url = this.getAttribute("data-url");
  shell.openExternal(url);
}

async function main() {
  const main = document.getElementById("main");
  main.insertAdjacentHTML(
    "beforeend",
    Loader({
      message: "Fetching posts"
    })
  );
  const articles = await getLatest();
  if (articles && Array.isArray(articles.articles)) {
    main.innerHTML = "";
    articles.articles.map((article, index) => {
      main.insertAdjacentHTML(
        "beforeend",
        Article({
          id: index,
          url: article.url,
          lead: article.lead,
          shares: article.shares,
          comments: article.comments
        })
      );
    });
    Array.from(document.getElementsByClassName("article")).forEach(element => {
      element.addEventListener("click", openExternalUrl);
    });
  }
}

main();

document
  .getElementById("close")
  .addEventListener("click", windowControls.close);
document
  .getElementById("minimize")
  .addEventListener("click", windowControls.minimize);
document
  .getElementById("zoom")
  .addEventListener("click", windowControls.maximize);
