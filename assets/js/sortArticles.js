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

module.exports = {
    sortByComments: sortByComments,
    sortByShares: sortByShares
}