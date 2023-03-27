/* eslint-disable */

describe("Cats", () => {
	it("should naviage to cats from main menu", () => {
		cy.visit("http://localhost:3000/");

		cy.get("a.nav-link:nth-child(2)").click();

		cy.url().should("include", "/cats");
		cy.get("h1").contains("View your cats");
	});

	it("should be able to register a cat", () => {
		cy.visit("http://localhost:3000/cats/create");

		cy.get("input#formName").type("Jon");
		cy.get("textarea#formDescription").type("Jones Cat");
		cy.contains("button", "Create Cat").click();

		cy.get("a.nav-link:nth-child(2)").click();

		cy.get("table").contains("tr", "Jon").should("exist");
	});

	it("should be able to view a cat", () => {
		cy.visit("http://localhost:3000/cats");

		cy.contains("table tr", "Jon").find("td:nth-child(4) a").click();

		cy.get("h1").contains("Your cat Jon");
	});

	it("should be able to delete a cat", () => {
		cy.visit("http://localhost:3000/cats");

		cy.contains("table tr", "Jon").find("td:nth-child(5) button").click();

		cy.contains("table tr", "Jon").should("not.exist");
	});

	it("should be able to update a cat", () => {
		cy.visit("http://localhost:3000/cats");

		cy.contains("table tr", "Bili").find("td:nth-child(6) a").click();

		cy.url().should("include", "/update");

		cy.get("input#formName").type("Bili");
		cy.get("textarea#formDescription").type("Bili Cool cat");
		cy.get("button[type='submit']").click();

		cy.get("a.nav-link:nth-child(2)").click();
		cy.get("table").contains("tr", "Bili Cool cat").should("exist");
	});

	it("should be able to search for a cat by name", () => {
		cy.visit("http://localhost:3000/cats");

		cy.get("input#formBasicName").type("Smelly");
		cy.contains("button", "Search by Name").click();

		cy.get("table tr:first-child").contains("td", "Smelly").should("exist");
	});

	it("should be able to search for a cat by description", () => {
		cy.visit("http://localhost:3000/cats");

		cy.get("input#formBasicDescription").type("Large cat");
		cy.contains("button", "Search by Description").click();

		cy.get("table tr:first-child").contains("td", "Large cat").should("exist");
	});
});

export {};
