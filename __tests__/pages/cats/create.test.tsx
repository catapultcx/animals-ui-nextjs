import CreateCatPage from "@/pages/cats/create";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "__tests__/utils";
import { testCat1 } from "__tests__/data";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));

describe("Create Cat Page", () => {
  it("should render without crashing", () => {
    render(<CreateCatPage />);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("Create a new Cat");
  });

  it("should display error message for each required fields", () => {
    render(<CreateCatPage />);

    const button = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(button);

    const text1 = screen.getByText("Please provide a name.");
    const text2 = screen.getByText("Please provide a description.");

    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it("should navigate cats page after a successful form submission", async () => {
    mockRouter.push("/cats/create");
    setUpFetchSuccessMock(testCat1);

    render(<CreateCatPage />);

    const input1 = screen.getByLabelText("cat-name");
    const input2 = screen.getByLabelText("cat-description");
    const button = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(input1, { target: { value: "Tom" } });
    fireEvent.change(input2, { target: { value: "Good boy" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/cats"
      })
    );
  });

  it("should not navigate cats page after a failed form submission", async () => {
    mockRouter.push("/cats/create");
    setUpFetchErrorMock("some error");

    render(<CreateCatPage />);

    const input1 = screen.getByLabelText("cat-name");
    const input2 = screen.getByLabelText("cat-description");
    const button = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(input1, { target: { value: "Tom" } });
    fireEvent.change(input2, { target: { value: "Good boy" } });
    fireEvent.click(button);

    expect(mockRouter).toMatchObject({
      pathname: "/cats/create"
    });
  });
});
