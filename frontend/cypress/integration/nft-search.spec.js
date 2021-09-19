/// <reference types="cypress" />

import { DEVELOPER_DAO_CONTRACT } from '../../src/utils/DeveloperDaoConstants';

describe('NFT Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Loads first token by default', () => {
    cy.findByText(/Loading/).should('exist');
    cy.findByRole('textbox', { name: /Search/ }).should('have.value', '1');

    cy.findByText(/Loading/).should('not.exist');
    cy.findByRole('img', {
      name: 'macOS, Brackets, White Tanktop, Scala, Government, Kisumu, Divergent, JonGold',
    });
    cy.findByRole('link', { name: 'View NFT on OpenSea' }).should(
      'have.attr',
      'href',
      `https://opensea.io/assets/${DEVELOPER_DAO_CONTRACT}/1`,
    );
    cy.findByRole('link', { name: 'View owner on Etherscan' })
      .should('have.attr', 'href')
      .and('match', /^https:\/\/etherscan.io\/address\/0x\w+$/);
  });
});
