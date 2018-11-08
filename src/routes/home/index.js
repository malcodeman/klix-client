import { h } from "preact";
import { Link } from "preact-router/match";

import style from "./style";

const Home = () => (
  <div class={style.home}>
    <h1>Home</h1>
    <p>This is the Home component.</p>
    <Link href="/articles/test">Article test</Link>
  </div>
);

export default Home;
