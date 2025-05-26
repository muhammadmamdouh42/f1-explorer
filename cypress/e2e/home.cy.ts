describe("Seasons page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("seasonsPage"));
  });

  it("loads 12 seasons & paginates", () => {
    cy.get("a[href^='/season/']").should("have.length", 12);

    cy.contains("button", "Next").click();
    cy.get("a[href^='/season/']").first().should("contain", "2012");
  });

  it("toggles list / grid view", () => {
    cy.contains("button", /list view/i).click();
    cy.get("li").first().should("contain.text", "Season");

    cy.contains("button", /grid view/i).click();
    cy.get("a[href^='/season/']").first().should("have.attr", "href");
  });
});
