import { h } from "preact";
import { Link } from "preact-router/match";

import style from "./style";

const Articles = () => (
  <div>
    <h1>Home</h1>
    <p>This is the Home component.</p>
    <Link href="/articles/test">Article test</Link>
  </div>
);

export default Articles;
