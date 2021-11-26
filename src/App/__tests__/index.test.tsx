import { render, screen } from "@testing-library/react";
import App from "../index";

test("should have initial conditions", () => {
  render(<App />);

  const primaryHeading = screen.getByText(/hello world$/i);
  expect(primaryHeading).toBeInTheDocument();
});
