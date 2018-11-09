import { render, Component } from "preact";

import Loader from "../loader";
import style from "./style";

class Pagination extends Component {
  renderButtons = () => {
    const { handleNextPage, handlePreviousPage, currentPage } = this.props;

    if (currentPage > 1) {
      return (
        <div class={style.buttons}>
          <button onClick={handlePreviousPage} class={style.btn}>
            Previous
          </button>
          <button onClick={handleNextPage} class={style.btn}>
            Next
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={handleNextPage} class={style.btn}>
          Next
        </button>
      );
    }
  };
  render() {
    const { fetching } = this.props;

    return fetching ? <Loader message={"Fetching"} /> : this.renderButtons();
  }
}

export default Pagination;
