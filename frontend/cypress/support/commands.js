import {
  ETHER_SCAN_LINK_PREFIX,
  OPENSEA_DIRECT_LINK_PREFIX,
} from '../../src/utils/DeveloperDaoConstants';

Cypress.Commands.add('findDeveloperNft', (traits = '') => {
  cy.findByRole('img', {
    name: new RegExp(`developer traits: ${traits}`, 'i'),
  });
});

Cypress.Commands.add('findOpenSeaLink', (token) => {
  cy.findByRole('link', { name: /view .+ opensea/i })
    .should('have.attr', 'href')
    .should('eq', `${OPENSEA_DIRECT_LINK_PREFIX}/${token}`);
});

Cypress.Commands.add('findEtherscanLink', () => {
  cy.findByRole('link', { name: /view .+ etherscan/i })
    .should('have.attr', 'href')
    .should('contain', ETHER_SCAN_LINK_PREFIX);
});
