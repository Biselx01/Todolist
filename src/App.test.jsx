import App from "./App";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { HashRouter } from "react-router-dom";

test("renders App component", () => {
  render(
  <HashRouter>
    <App />
  </HashRouter>
  );
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});