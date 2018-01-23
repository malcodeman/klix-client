const osmosis = require("osmosis");
const get = (page) => {
    let url = `https://www.klix.ba/najnovije/str${page}`;
    return new Promise((resolve, reject) => {
        osmosis
            .get(url)
            .set([
                osmosis
                .find('article')
                .set({
                    headline: 'a h1',
                    shares: ".above .shareovi",
                    comments: ".below .comments"
                })
            ])
            .data(page => resolve(page));
    });
};

module.exports = {
    get: get
}