import CatPage, { getServerSideProps } from "@/pages/cats/[catId]/index";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { testCat1 } from "__tests__/data";
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "__tests__/utils";
import mockRouter from "next-router-mock";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));

const validContext = {
  params: { catId: "1" },
  req: {},
  res: {}
};

const contextMissingParams = {
  req: {},
  res: {}
};

describe("Cat Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("getServerSideProps should return account property for valid context", async () => {
    setUpFetchSuccessMock([testCat1]);

    const response = await getServerSideProps(validContext as any);

    expect(response).toEqual({
      props: {
        cat: testCat1
      }
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("getServerSideProps should return not found for invalid id", async () => {
    setUpFetchErrorMock("Not found");

    const response = await getServerSideProps(contextMissingParams as any);

    expect(response).toEqual({ notFound: true });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should render without crashing", () => {
    render(<CatPage cat={testCat1} />);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("Your cat Smelly");
  });

  it("should navigate cats page after a successful delete operation", async () => {
    mockRouter.push("/cats/create");
    setUpFetchSuccessMock(testCat1);

    render(<CatPage cat={testCat1} />);

    const button = screen.getByRole("button", { name: "Delete" });

    fireEvent.click(button);

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/cats"
      })
    );
  });

  it("should not navigate cats page after a failed delete operation", async () => {
    mockRouter.push("/cats/create");
    setUpFetchErrorMock("some error");

    render(<CatPage cat={testCat1} />);

    const button = screen.getByRole("button", { name: "Delete" });

    fireEvent.click(button);

    expect(mockRouter).toMatchObject({
      pathname: "/cats/create"
    });
  });
});
