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
  render() {
    const { articles, fetching } = this.props;

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
