import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubmitForm from "../../../src/pages/submitForm/index";
import { testCat1 } from "../../data";
import mockRouter from "next-router-mock";
import { setUpFetchSuccessMock } from "../../utils";

jest.mock("next/router", () => require("next-router-mock"));

describe("Submit Form", () => {
  it("should render Submit Form", () => {
    render(<SubmitForm />);

    const h3 = screen.getByRole("heading", { level: 3 });
    const textBoxCatName = screen.getByRole("textbox", { name: "Cat Name" });
    const textBoxDescription = screen.getByRole("textbox", {
      name: "Description",
    });
    const button = screen.getByRole("button", { name: "Add Cat" });

    expect(h3).toBeInTheDocument();
    expect(h3.textContent).toBe("Add  Cat");
    expect(textBoxCatName).toBeInTheDocument();
    expect(textBoxDescription).toBeInTheDocument();
  });
});
