import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CatForm } from "../../src/components/CatForm";
import { testCat1 } from "../data";
import mockRouter from "next-router-mock";
import { setUpFetchSuccessMock } from "../utils";

jest.mock("next/router", () => require("next-router-mock"));

describe("CatForm", () => {
  it("should render without crashing with the Textfields and submit button", () => {
    render(<CatForm label={"Add"} id={""} name={""} description={""} />);

    const inputName = screen.getByLabelText("Cat Name");
    const inputDesc = screen.getByLabelText("Description");
    const btnSubmit = screen.getByRole("button", { name: "Add Cat" });
    expect(inputName).toBeInTheDocument();
    expect(inputDesc).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
  });

  it("should Add a new Cat and return to All Cats page", () => {
    setUpFetchSuccessMock([testCat1]);

    render(<CatForm label={"Add"} id={""} name={""} description={""} />);

    const inputName = screen.getByLabelText("Cat Name");
    const inputDesc = screen.getByLabelText("Description");
    const btnSubmit = screen.getByRole("button", { name: "Add Cat" });
    expect(inputName).toBeInTheDocument();
    expect(inputDesc).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: "Smelly" } });
    fireEvent.change(inputDesc, { target: { value: "Smelly cat" } });
    fireEvent.click(btnSubmit);

    waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/cats",
      })
    );
  });

  it("should render fields with given values to modify", () => {
    setUpFetchSuccessMock([testCat1]);
    render(
      <CatForm
        label={"Modify"}
        id={testCat1.id}
        name={testCat1.name}
        description={testCat1.description}
      />
    );

    const inputName = screen.getByLabelText("Cat Name");
    const inputDesc = screen.getByLabelText("Description");
    const btnSubmit = screen.getByRole("button", { name: "Modify Cat" });
    expect(inputName).toBeInTheDocument();
    expect(inputDesc).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
  });

  it("should modify the cat with updated Name and Description", () => {
    setUpFetchSuccessMock([testCat1]);
    render(
      <CatForm
        label={"Modify"}
        id={testCat1.id}
        name={testCat1.name}
        description={testCat1.description}
      />
    );

    const inputName = screen.getByLabelText("Cat Name");
    const inputDesc = screen.getByLabelText("Description");
    const btnSubmit = screen.getByRole("button", { name: "Modify Cat" });
    expect(inputName).toBeInTheDocument();
    expect(inputDesc).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: "Smelly" } });
    fireEvent.change(inputDesc, { target: { value: "Smelly cat" } });
    fireEvent.click(btnSubmit);

    waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/cats",
      })
    );
  });
});
