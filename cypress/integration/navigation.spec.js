describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get('ul > :nth-child(2)')
      .click();
  });

});