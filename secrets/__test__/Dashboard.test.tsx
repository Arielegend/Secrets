import ReactDom from "react-dom";
import { Dashboard } from "../components/Dashboard/Dashboard";

describe("Testing dashboard", () => {
  test("also should equal 4", () => {
    const div = document.createElement("div");
    ReactDom.render(<Dashboard />, div);
  });
});
