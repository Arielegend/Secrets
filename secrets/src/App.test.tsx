import React from "react";
import ReactDom from "react-dom";

import { App } from "./App";

test("Testing App", () => {
  const div = document.createElement("div");
  ReactDom.render(<App />, div);
});
