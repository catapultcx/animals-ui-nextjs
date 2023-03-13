import CatComp from "@/components/cats/CatComp";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));

describe("Cat component", () => {
  it("should render without crashing", () => {
    render(<CatComp />);

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
  });
});
