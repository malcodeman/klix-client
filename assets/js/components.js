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

const Next = () => `
<button id="next" class="pagination-btn">Next</button>
`;

const Pagination = () => `
<button id="previous" class="pagination-btn">Previous</button>
<button id="next" class="pagination-btn">Next</button>
`;

module.exports = {
  Article: Article,
  Error: Error,
  Loader: Loader,
  Next: Next,
  Pagination: Pagination
};
