const Xray = require("x-ray");
const x = Xray();

function get(pageNumber, limit) {
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

module.exports = {
    get: get
}