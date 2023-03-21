import CatsPage, { getServerSideProps } from "@/pages/cats/index";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "__tests__/utils";
import { testCats } from "__tests__/data";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const validContext = {
  req: {},
  res: {},
};

const contextMissingParams = {
  req: {},
  res: {},
};

describe("Cats Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("getServerSideProps should return account property for valid context", async () => {
    setUpFetchSuccessMock([testCats]);

    const response = await getServerSideProps(validContext as any);

    expect(response).toEqual({
      props: {
        cats: testCats,
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("getServerSideProps should return not found for any fetch error", async () => {
    setUpFetchErrorMock("Not found");

    const response = await getServerSideProps(contextMissingParams as any);

    expect(response).toEqual({ notFound: true });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should render without crashing", () => {
    render(<CatsPage allCats={testCats} />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const btnFilter = screen.getByRole("button", { name: "Filter" });
    const btnRegister = screen.getByRole("button", { name: "Register Cat" });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("View your cats");
    expect(btnFilter).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it("should navigate to Registeration page on click of register button", () => {
    render(<CatsPage allCats={testCats} />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const btnFilter = screen.getByRole("button", { name: "Filter" });
    const btnRegister = screen.getByRole("button", { name: "Register Cat" });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("View your cats");
    expect(btnFilter).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();

    fireEvent.click(btnRegister);

    waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/submitForm",
      })
    );
  });

  it("should navigate to Modify Cat details page", () => {
    render(<CatsPage allCats={testCats} />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const btnFilter = screen.getByRole("button", { name: "Filter" });
    const btnRegister = screen.getByRole("button", { name: "Register Cat" });
    const btnDelete = screen.getByRole("columnheader", { name: "Delete" });
    const btnView = screen.getByRole("columnheader", { name: "View" });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("View your cats");
    expect(btnFilter).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();

    fireEvent.click(btnView);

    waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/submitForm",
      })
    );
  });

  it("should delete the selected Cat from Cats Page", () => {
    render(<CatsPage allCats={testCats} />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const btnFilter = screen.getByRole("button", { name: "Filter" });
    const btnRegister = screen.getByRole("button", { name: "Register Cat" });
    const btnDelete = screen.getByRole("columnheader", { name: "Delete" });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("View your cats");
    expect(btnFilter).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();

    fireEvent.click(btnDelete);

    waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/cats",
      })
    );
  });

  it("should filter cats", () => {
    setUpFetchSuccessMock([testCats]);
    render(<CatsPage allCats={testCats} />);
    const inputText = screen.getByPlaceholderText(
      "Enter text to filter cat by name or description"
    );
    const btnFilter = screen.getByText("Filter");

    fireEvent.change(inputText, { target: { value: "Smelly" } });
    fireEvent.click(btnFilter);

    waitFor(() => {
      expect(screen.findByText("Smelly cat")).toBeDefined();
    });
  });

  it("should fail to filter cats", () => {
    setUpFetchErrorMock("Failed to filter");
    render(<CatsPage allCats={testCats} />);
    const inputText = screen.getByPlaceholderText(
      "Enter text to filter cat by name or description"
    );
    const btnFilter = screen.getByText("Filter");

    fireEvent.change(inputText, { target: { value: "Smelly" } });
    fireEvent.click(btnFilter);
  });
});
