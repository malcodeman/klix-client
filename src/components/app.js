import { h, Component } from "preact";
import { Router } from "preact-router";

import Articles from "../routes/articles";
import ArticleDetails from "../routes/articleDetails";
import style from "./style";

export default class App extends Component {
  render() {
    return (
      <div class={style.app}>
        <aside class={style.sidebar}>
          <header class={style.header}>
            <button class={style.close} />
            <button class={style.minimize} />
            <button class={style.zoom} />
          </header>
        </aside>
        <main class={style.main}>
          <Router>
            <Articles path="/" />
            <ArticleDetails path="/articles/:article" />
          </Router>
        </main>
      </div>
    );
  }
}
