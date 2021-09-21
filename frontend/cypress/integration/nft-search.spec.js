/// <reference types="cypress" />

import { SITE_URL } from '../../src/utils/DeveloperDaoConstants';

describe('NFT Search', () => {
  it('Loads first token by default', () => {
    cy.visit('/');
    cy.findByText(/loading/i).should('exist');

    cy.checkSearchTerm('1');
    cy.findDeveloperNft(
      'macOS, Brackets, White Tanktop, Scala, Government, Kisumu, Divergent, JonGold',
    ).should('exist');
    cy.findOpenSeaLink(1).should('exist');
    cy.findEtherscanLink().should('exist');
  });

  it('Loads token id from the url', () => {
    cy.visit('/?id=200');
    cy.findByText(/loading/i).should('not.exist');

    cy.checkSearchTerm('200');
    cy.findDeveloperNft(
      'Linux Mint, Coda, Bubble Gum Wrapper, Whitespace, Farming, Kisumu, Analytical, Kind',
    ).should('exist');
    cy.findOpenSeaLink(200).should('exist');
    cy.findEtherscanLink().should('exist');
  });

  it('Loads token with ampersand character fixed', () => {
    cy.visit('/?id=404');
    cy.findByText(/loading/i).should('not.exist');

    cy.checkSearchTerm('404');
    cy.findDeveloperNft(
      'DOS, Pen & Paper, Pink Hoodie, Java, Environmental, Shenzhen, Critical, Hater',
    ).should('exist');
  });

  it('Shows error message for invalid token', () => {
    cy.visit('?id=bad');
    cy.findByText(/loading/i).should('not.exist');

    cy.checkSearchTerm('bad');
    cy.findByText(/error/i).should('exist');
    cy.findDeveloperNft().should('not.exist');
  });

  it('Updates url when searching for another token id', () => {
    cy.visit('/');
    cy.findByRole('textbox', { name: /search/i })
      .clear()
      .realType('5555');

    cy.checkSearchTerm('5555');
    cy.location('search').should('eq', '?id=5555');
  });

  it('Copies NFT link to clipboard', () => {
    cy.visit('/?id=1234');

    cy.findByRole('button', { name: 'Copy link to NFT' })
      .scrollIntoView()
      .realClick();

    cy.findAllByRole('alert')
      .contains('Link copied to clipboard')
      .should('exist');

    cy.findByRole('button', { name: 'Close' }).realClick();
    cy.findAllByRole('alert')
      .contains('Link copied to clipboard')
      .should('not.exist');

    cy.task('getClipboard').should('eq', `${SITE_URL}/?id=1234`);
  });
});
