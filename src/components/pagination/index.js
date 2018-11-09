import { render, Component } from "preact";

import Loader from "../loader";
import style from "./style";

class Pagination extends Component {
  render() {
    const { fetching, handleNextPage } = this.props;

    return fetching ? (
      <Loader message={"Fetching"} />
    ) : (
      <button onClick={handleNextPage} class={style.next}>
        Next
      </button>
    );
  }
}

export default Pagination;
