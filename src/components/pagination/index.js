import { render, Component } from "preact";

class Pagination extends Component {
  render() {
    const { fetching, handleNextPage } = this.props;

    return fetching ? (
      <span>Loading</span>
    ) : (
      <span onClick={handleNextPage}>Next</span>
    );
  }
}

export default Pagination;
