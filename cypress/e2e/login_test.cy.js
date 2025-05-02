describe("W3Schools Profile Login", () => {
  it("logs in with valid credentials", () => {
    cy.intercept("POST", "/api/user/session").as("login");

    // visit the login page
    cy.visit("https://profile.w3schools.com/login");

    cy.get('input[name="email"]')
      .should("be.visible")
      .type("techgeek2825@gmail.com");
    cy.get('input[name="password"]').type("2002WAgonR@$");

    cy.get('button[type="submit"]').click();
    cy.wait("@login");

    cy.contains("Track your progress", { timeout: 10_000 }).should(
      "be.visible"
    );
  });
});
