import React from "react";

import style from "./Post.module.css";

const Post = props => {
  return (
    <a href={props.url} target="blank" rel="noopener">
      <article className={style.post}>
        <div className={style.leadWrapper}>
          <span className={style.index}>{props.index}</span>
          <span className={style.lead}>{props.lead}</span>
        </div>
        <div>
          <span className={style.shares}>{props.shares} shares</span>
          <span>{props.comments} comments</span>
        </div>
      </article>
    </a>
  );
};

export default Post;
