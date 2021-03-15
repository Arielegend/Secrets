import ReactDom from "react-dom";
import { AddSecret } from "../components/Dashboard/AddSecret";

describe("Testing AddSecret", () => {
  test("test 1", () => {
    const div = document.createElement("div");
    ReactDom.render(<AddSecret masterKey={""} />, div);
  });
});
