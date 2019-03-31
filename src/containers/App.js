import React from "react";

import style from "./App.module.css";
import Post from "../components/post/Post";
import Loader from "../components/loader/Loader";

const API_URL = process.env.REACT_APP_API_URL;

class App extends React.Component {
  state = {
    posts: [],
    fetching: false,
    currentPage: 1
  };

  componentDidMount = () => {
    this.getLatest();
  };

  async getLatest() {
    this.setState({ fetching: true });

    const data = await fetch(`${API_URL}/latest`);
    const json = await data.json();

    this.setState({ posts: json.articles, fetching: false });
  }

  render() {
    const { posts, fetching } = this.state;

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
}

export default App;
