describe('Homepage Test', () => {
  it('Check for Image', () => {
    cy.visit('/');

    cy.get('[alt="main"]').should('be.visible');
  });

  it('Check For Heading', () => {
    cy.get('h2').should('include.text', 'Build web3 with friends');
  });
});
export {};
