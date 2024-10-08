import App from "./App";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from "react-router-dom";

test("renders App component", () => {
  render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});