import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cat } from "../../src/domain/cat";
import Filter from "../../src/components/Filter";

describe("Filter", () => {
  it("should render without crashing", () => {
    render(<Filter onFilter={jest.fn()} />);

    const inputText = screen.getByPlaceholderText(
      "Enter text to filter cat by name or description"
    );
    const btnFilter = screen.getByText("Filter");
    expect(inputText).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  });

  const newCat: Cat = { id: "1", name: "", description: "", group: "Tabby" };
  it("should allow user to enter input and submit", () => {
    const onFilter = jest.fn();

    render(<Filter onFilter={onFilter} />);

    const inputText = screen.getByPlaceholderText(
      "Enter text to filter cat by name or description"
    );
    const btnFilter = screen.getByText("Filter");

    fireEvent.change(inputText, { target: { value: "cat" } });
    fireEvent.click(btnFilter);
    expect(onFilter).toBeCalledWith("cat");
  });
});
