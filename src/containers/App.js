import React from "react";

import style from "./App.module.css";
import Post from "../components/post/Post";
import Loader from "../components/loader/Loader";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [posts, setPosts] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    getLatest();
  }, []);

  async function getLatest() {
    setFetching(true);

    const data = await fetch(`${API_URL}/latest`);
    const json = await data.json();

    setPosts(json.articles);
    setFetching(false);
  }

  return (
    <div className={style.app}>
      <header className={style.header}>
        <div className={style.headerContent}>Latest</div>
      </header>
      <main className={style.main}>
        <div className={style.mainContent}>
          {fetching && <Loader message={"Fetching posts..."} />}
          {posts.map((post, index) => {
            return (
              <Post
                key={post.url}
                index={(index += 1)}
                comments={post.comments}
                headline={post.headline}
                lead={post.lead}
                shares={post.shares}
                url={post.url}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
