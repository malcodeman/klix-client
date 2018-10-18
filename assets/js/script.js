const windowControls = require("./assets/js/windowControls");

const Article = ({ id, url, lead, shares, comments }) => `
<a class="article" href="${url}">
    <div>
        <span class="article-id">${id}</span>
        <span class="article-title">${lead}</span>
    </div>
    <div>
        <span class="article-shares">${shares} shares</span>
        <span class="article-comments">${comments} comments</span>
    </div>
</a>
`;

function getLatest() {
  const url = "https://micro-klix.herokuapp.com/latest";
  return fetch(url)
    .then(response => response.json())
    .then(articles => {
      return articles;
    })
    .catch(error => {
      console.log(error);
    });
}

async function main() {
  const main = document.getElementById("main");
  const articles = await getLatest();
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
}

main();
