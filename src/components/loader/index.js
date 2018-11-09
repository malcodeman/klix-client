import { h } from "preact";
import style from "./style.css";

export default function Loader(props) {
  return (
    <div class={style.wrapper}>
      <div class={style.loader} />
      {props.message && <span class={style.message}>{props.message}</span>}
    </div>
  );
}
