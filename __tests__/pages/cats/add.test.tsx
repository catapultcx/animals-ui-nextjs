import AddCat from "@/pages/cats/add";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Router from "next/router";
import { testCats } from "__tests__/data";
jest.mock("next/router", () => ({ push: jest.fn() }));

describe("should render without any issues", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should render without errors", () => {
    render(<AddCat cat={testCats[0]} />);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("Add your cat");
  });

  it("should redirect to cats list page on close", async () => {
    render(<AddCat cat={testCats[0]} />);

    await act(() => fireEvent.click(screen.getByLabelText("Close")));
    expect(Router.push).toHaveBeenCalledWith("/cats");
  });
});
