describe("W3Schools Profile Login", () => {
  it("logs in with valid credentials", () => {
    cy.intercept("POST", "/api/user/session").as("login");

    // visit the login page
    cy.visit("https://profile.w3schools.com/login");

    // enter valid email and password
    cy.get('input[name="email"]')
      .should("be.visible")
      .type("techgeek2825@gmail.com");
    cy.get('input[name="password"]').type("2002WAgonR@$");

    // click login
    cy.get('button[type="submit"]').click();
    cy.wait("@login");

    // assert that the user is redirected to the dashboard
    cy.contains("Track your progress", { timeout: 10_000 }).should(
      "be.visible"
    );
  });

  it("fails to log in with invalid password", () => {
    // Intercept Cognito request used by W3Schools for login auth
    cy.intercept("POST", "**cognito-idp.us-east-1.amazonaws.com/**").as("login");

    // Visit the login page
    cy.visit("https://profile.w3schools.com/login");

    // Enter valid email
    cy.get('input[name="email"]')
      .should("be.visible")
      .type("techgeek2825@gmail.com");

    // Enter invalid password
    cy.get('input[name="password"]').type("WrongPassword123");

    // Click login
    cy.get('button[type="submit"]').click();

    // Wait for intercepted request to confirm it's triggered
    cy.wait("@login");

    // Assert that an error message appears or login does not proceed
    cy.contains("Invalid").should("be.visible"); 
  });
});
