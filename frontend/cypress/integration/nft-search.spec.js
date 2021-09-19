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

  it('Loads token id from the url', () => {
    cy.visit('/?id=200');
    cy.findByRole('textbox', { name: /Search/ }).should('have.value', '200');

    cy.findByText(/Loading/).should('not.exist');
    cy.findByRole('img', {
      name: 'Linux Mint, Coda, Bubble Gum Wrapper, Whitespace, Farming, Kisumu, Analytical, Kind',
    });
    cy.findByRole('link', { name: 'View NFT on OpenSea' }).should(
      'have.attr',
      'href',
      `https://opensea.io/assets/${DEVELOPER_DAO_CONTRACT}/200`,
    );
  });

  it('Loads token with ampersand character fixed', () => {
    cy.visit('/?id=404');
    cy.findByRole('textbox', { name: /Search/ }).should('have.value', '404');

    cy.findByText(/Loading/).should('not.exist');
    cy.findByRole('img', {
      name: 'DOS, Pen & Paper, Pink Hoodie, Java, Environmental, Shenzhen, Critical, Hater',
    });
  });

  it('Updates url when searching for another token id', () => {
    cy.findByRole('textbox', { name: /Search/ })
      .clear()
      .type('5555');
    cy.findByRole('textbox', { name: /Search/ }).should('have.value', '5555');
    cy.location('search').should('eq', '?id=5555');
  });
});
