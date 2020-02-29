import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import FrontPage from "../components/frontpage/Frontpage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path={["/", "/:page"]}>
        <FrontPage />
      </Route>
    </BrowserRouter>
  );
}

export default App;
