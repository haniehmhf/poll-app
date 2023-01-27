import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("App component should not be empty", () => {
  const { container } = render(<App />);
  expect(container).not.toBeEmptyDOMElement();
});
