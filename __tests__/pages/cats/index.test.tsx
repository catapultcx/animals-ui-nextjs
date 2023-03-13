import CatsPage, { getServerSideProps } from "@/pages/cats/index";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "__tests__/utils";
import { testCat1, testCat2, testCats } from "__tests__/data";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));

const validContext = {
  req: {},
  res: {}
};

const contextMissingParams = {
  req: {},
  res: {}
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
        cats: testCats
      }
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
    render(<CatsPage cats={testCats} />);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("View your cats");
  });

  it("should display register your cat button", () => {
    render(<CatsPage cats={testCats} />);

    const button = screen.getByRole("link", { name: "Register your Cat" });

    expect(button).toBeInTheDocument();
  });

  it("should navigate to create cat page", async () => {
    mockRouter.push("/cats");

    render(<CatsPage cats={testCats} />, { wrapper: MemoryRouterProvider });

    const link = screen.getByRole("link", { name: "Register your Cat" });
    fireEvent.click(link);

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/cats/create"
      })
    );
  });

  it("should filter data based on the search criteria (1)", async () => {
    render(<CatsPage cats={testCats} />);
    setUpFetchSuccessMock([testCats]);

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.findByText("Smelly cat")).toBeDefined();
      expect(screen.findByText("Lazy cat")).toBeDefined();
    });
  });

  it("should filter data based on the search criteria (2)", async () => {
    render(<CatsPage cats={testCats} />);
    setUpFetchSuccessMock(testCat1);

    const input1 = screen.getByLabelText("cat-name");
    const button = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input1, { target: { value: "Sme" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("Lazy cat")).not.toBeInTheDocument();
    });
  });

  it("should filter data based on the search criteria (3)", async () => {
    render(<CatsPage cats={testCats} />);
    setUpFetchSuccessMock(testCat2);

    const input1 = screen.getByLabelText("cat-name");
    const input2 = screen.getByLabelText("cat-description");
    const button = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input1, { target: { value: "Gar" } });
    fireEvent.change(input2, { target: { value: "Laz" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("Smelly cat")).not.toBeInTheDocument();
    });
  });

  it("should display an error message when search failed", async () => {
    render(<CatsPage cats={testCats} />);
    setUpFetchErrorMock("some error");

    const input1 = screen.getByLabelText("cat-name");
    const input2 = screen.getByLabelText("cat-description");
    const button = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input1, { target: { value: "Gar" } });
    fireEvent.change(input2, { target: { value: "Laz" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("Smelly cat")).toBeInTheDocument();
      expect(screen.queryByText("Lazy cat")).toBeInTheDocument();
    });
  });
});
