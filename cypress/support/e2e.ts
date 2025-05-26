import "@testing-library/cypress/add-commands";

cy.intercept("GET", "**/seasons.json*", { fixture: "seasons-2024.json" }).as(
  "getSeasons"
);
cy.intercept("GET", "**/2024/races.json*", {
  fixture: "2024-races.json",
}).as("getRaces");
cy.intercept("GET", "**/2024/1/results.json*", {
  fixture: "2024-round1-results.json",
}).as("getResults");

beforeEach(() => {
  cy.viewport(1440, 900);
});
