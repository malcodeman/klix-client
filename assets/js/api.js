function getPage(page) {
  const url = `https://micro-klix.herokuapp.com/pages/${page}`;
  return fetch(url)
    .then(response => response.json())
    .then(articles => {
      return articles;
    })
    .catch(error => {
      throw error;
    });
}

module.exports = {
  getPage: getPage
};
