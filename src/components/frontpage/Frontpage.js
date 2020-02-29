import React from "react";
import { useParams, useHistory } from "react-router-dom";

import style from "../../containers/App.module.css";
import Post from "../post/Post";
import Loader from "../loader/Loader";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const history = useHistory();
  const params = useParams();
  const page = params.page || 1;
  const [posts, setPosts] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getPage(page);
  }, [page]);

  async function getPage(pageNum) {
    try {
      setFetching(true);

      const data = await fetch(`${API_URL}/pages/${pageNum}`);
      const json = await data.json();

      setPosts(json.articles);
    } catch {
      setError(true);
    } finally {
      setFetching(false);
    }
  }

  function handleNext() {
    const nextPage = parseInt(page) + 1;

    history.push(`/${nextPage}`);
    window.scrollTo({
      top: 0
    });
  }

  return (
    <div className={style.app}>
      <header className={style.header}>
        <div className={style.headerContent}>Latest</div>
      </header>
      <main className={style.main}>
        <div className={style.mainContent}>
          {fetching && <Loader message={"Fetching posts..."} />}
          {error && <span>Error</span>}
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
      <footer className={style.footer}>
        <div className={style.footerContent}>
          <button onClick={handleNext} className={style.btn}>
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
