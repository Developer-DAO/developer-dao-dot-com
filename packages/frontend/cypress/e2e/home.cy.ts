describe('Homepage Test', () => {
  it('Check for Image', () => {
    cy.visit('/');

    cy.get('[alt="main"]').should('be.visible');
  });
});
export {};
