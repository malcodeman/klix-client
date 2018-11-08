import { render, Component } from "preact";
import { Link } from "preact-router/match";

import style from "./style";

const Article = props => {
  const { id, lead, shares, comments } = props;
  return (
    <article class={style.article}>
      <div>
        <span class={style.id}>{id}</span>
        <span class={style.lead}>{lead}</span>
      </div>
      <div>
        <span class={style.shares}>{shares} shares</span>
        <span>{comments} comments</span>
      </div>
    </article>
  );
};

class Articles extends Component {
  state = {
    articles: null
  };
  componentDidMount() {
    this.getPage(1)
  }
  async getPage = page => {
    const url = `https://micro-klix.herokuapp.com/pages/${page}`;
    const articles = await fetch(url).then(response => response.json());
    this.setState({ articles });
  }
  render() {
    const { articles } = this.state;

    return (
      <div>
        {articles &&
          articles.articles.map(article => {
            return (
              <Article
                id={article.id}
                lead={article.lead}
                shares={article.shares}
                comments={article.comments}
              />
            );
          })}
      </div>
    );
  }
}

export default Articles;
