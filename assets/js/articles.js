const components = require("./components");
const shell = require("./shell");

function map(articles) {
  if (!articles || !Array.isArray(articles)) {
    throw "Error mapping articles";
  }
  const main = document.getElementById("articles");
  main.innerHTML = "";
  articles.map((article, index) => {
    main.insertAdjacentHTML(
      "beforeend",
      components.Article({
        id: index,
        url: article.url,
        lead: article.lead,
        shares: article.shares,
        comments: article.comments
      })
    );
  });
  Array.from(document.getElementsByClassName("article")).forEach(element => {
    element.addEventListener("click", shell.openExternalUrl);
  });
}

module.exports = {
  map: map
};
