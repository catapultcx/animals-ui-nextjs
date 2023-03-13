import SearchBar from "@/components/cats/SearchBar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));

describe("SearchBar component", () => {
  it("should render without crashing", () => {
    render(<SearchBar onSearch={jest.fn()} />);

    const button = screen.getByRole("button", { name: "Search" });

    expect(button).toBeInTheDocument();
  });
});
