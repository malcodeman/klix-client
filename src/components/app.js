import { h, Component } from "preact";
import { Router } from "preact-router";

import Home from "../routes/home";
import Article from "../routes/article";

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Home path="/" />
          <Article path="/articles/:article" />
        </Router>
      </div>
    );
  }
}
