import React from "react";
import ReactDom from "react-dom";
import { SimpleAccordion } from "../components/Dashboard/Card/Acordion";
import { AcordionRow } from "../components/Dashboard/Card/AcordionSingleRow";
import { dummySecret } from "../components/Types";

describe("Testing SimpleAccordion", () => {
  test("test 1", () => {
    const div = document.createElement("div");
    ReactDom.render(<SimpleAccordion secrets={[]} masterKey={""} />, div);
  });

  test("test 2", () => {
    const div = document.createElement("div");
    ReactDom.render(<AcordionRow secret={dummySecret} masterKey={""} />, div);
  });
});
