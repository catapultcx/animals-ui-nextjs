import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CatForm from "@/components/CatForm";
import { testCats } from "__tests__/data";

describe("CatForm", () => {
  it("should render without crashing", () => {
    render(
      <CatForm
        cat={{
          id: "1",
          name: "Smelly",
          description: "Smelly cat",
          group: "Tabby",
        }}
        mode={2}
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Smelly" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Smelly cat" },
    });
  });
});
