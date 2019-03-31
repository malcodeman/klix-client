import React from "react";

import style from "./Loader.module.css";

const Loader = props => {
  return (
    <div className={style.wrapper}>
      <div className={style.loader} />
      {props.message && <span className={style.message}>{props.message}</span>}
    </div>
  );
};

export default Loader;
