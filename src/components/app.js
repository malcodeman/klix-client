import { h, Component } from "preact";
import { Router } from "preact-router";

import Articles from "../routes/articles";
import ArticleDetails from "../routes/articleDetails";
import Pagination from "./pagination";
import Header from "./header";
import style from "./style";

export default class App extends Component {
  state = {
    articles: null,
    fetching: false,
    currentPage: 1
  };

  componentDidMount() {
    const { currentPage } = this.state;

    this.getPage(currentPage);
  }

  getPageQuery = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageQuery = urlParams.get("page");
    return pageQuery;
  };

  getPage = async page => {
    this.setState({ fetching: true });
    const url = `https://micro-klix.herokuapp.com/pages/${page}`;
    const articles = await fetch(url).then(response => response.json());
    this.setState({ articles, fetching: false });
  };

  handleNextPage = () => {
    const { currentPage } = this.state;

    const nextPage = currentPage + 1;
    this.setState({ currentPage: nextPage });
    this.getPage(nextPage);
  };

  handlePreviousPage = () => {
    const { currentPage } = this.state;

    const nextPage = currentPage - 1;
    this.setState({ currentPage: nextPage });
    this.getPage(nextPage);
  };
  render() {
    const { articles, fetching, currentPage } = this.state;

    return (
      <div class={style.app}>
        <aside class={style.sidebar}>
          <Header />
          <footer class={style.footer}>
            <Pagination
              fetching={fetching}
              handleNextPage={this.handleNextPage}
              handlePreviousPage={this.handlePreviousPage}
              currentPage={currentPage}
            />
          </footer>
        </aside>
        <main class={style.main}>
          <Router>
            <Articles path="/" articles={articles} fetching={fetching} />
            <ArticleDetails path="/articles/:article" />
          </Router>
        </main>
      </div>
    );
  }
}
