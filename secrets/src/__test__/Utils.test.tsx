import { checkMasterKey } from "../components/Utils";

describe("Testing checkMasterKey", () => {
  test("test 1", () => {
    expect(checkMasterKey("42")).toBeTruthy();
  });
});
