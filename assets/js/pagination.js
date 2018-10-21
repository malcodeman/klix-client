const components = require("./components");
const api = require("./api");
const articlesHelper = require("./articles");
const dom = require("./dom");

function setInitial(page) {
  localStorage.setItem("currentPage", "1");
}

function getCurrent() {
  return Number(localStorage.getItem("currentPage"));
}

function incrementPageNumber() {
  const currentPage = getCurrent() + 1;

  localStorage.setItem("currentPage", String(currentPage));
}

async function getPage(page) {
  const currentPage = getCurrent();
  const main = document.getElementById("articles");

  dom.clear(main);
  dom.insert(
    main,
    components.Loader({
      message: "Fetching posts"
    })
  );
  try {
    const articles = await api.getPage(page);
    articlesHelper.map(articles.articles);
    incrementPageNumber();
    if (page >= 1) {
      showNext();
    }
  } catch (error) {
    dom.clear(main);
    dom.insert(
      main,
      components.Error({
        text: error
      })
    );
  }
}

function nextPage() {
  const currentPage = getCurrent();

  getPage(currentPage + 1);
}

function previousPage() {
  const currentPage = getCurrent();

  getPage(currentPage - 1);
}

function getLatest() {
  getPage(1);
}

function showNext() {
  const footer = document.getElementById("pagination");

  dom.clear(footer);
  dom.insert(footer, components.Next());
  document.getElementById("next").addEventListener("click", nextPage);
}

function showPagination() {
  const footer = document.getElementById("pagination");

  dom.clear(footer);
  dom.insert(footer, components.Pagination());
  document.getElementById("next").addEventListener("click", nextPage);
  document.getElementById("previous").addEventListener("click", previousPage);
}

module.exports = {
  setInitial: setInitial,
  getCurrent: getCurrent,
  getLatest: getLatest
};
