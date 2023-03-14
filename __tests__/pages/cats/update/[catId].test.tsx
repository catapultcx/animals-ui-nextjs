import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "__tests__/utils";
import { testCat1 } from "__tests__/data";
import UpdateCatPage, { getServerSideProps } from "@/pages/cats/update/[catId]";
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

describe("Update Cat Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("getServerSideProps should return account property for valid context", async () => {
    setUpFetchSuccessMock(testCat1);

    const response = await getServerSideProps(validContext as any);

    expect(response).toEqual({
      props: {
        cat: testCat1
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
    render(<UpdateCatPage cat={testCat1} />);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("Update your Cat info");
  });

  it("should navigate cats page after a successful update operation", async () => {
    mockRouter.push("/cats/update/1");
    setUpFetchSuccessMock(testCat1);

    render(<UpdateCatPage cat={testCat1} />);

    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/cats"
      })
    );
  });

  it("should not navigate cats page after a failed update operation", async () => {
    mockRouter.push("/cats/update/1");
    setUpFetchErrorMock("some error");

    render(<UpdateCatPage cat={testCat1} />);

    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);

    expect(mockRouter).toMatchObject({
      pathname: "/cats/update/1"
    });
  });
});
