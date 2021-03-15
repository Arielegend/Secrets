import ReactDom from "react-dom";
import { Dashboard } from "../components/Dashboard/Dashboard";

describe("Testing dashboard", () => {
  test("test 1", () => {
    const div = document.createElement("div");
    ReactDom.render(<Dashboard />, div);
  });
});
