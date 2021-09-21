/// <reference types="cypress" />

import {
  DEVELOPER_DAO_CONTRACT,
  SITE_URL,
} from '../../src/utils/DeveloperDaoConstants';

describe('NFT Search', () => {
  it('Loads first token by default', () => {
    cy.visit('/');
    cy.findByText(/loading/i).should('exist');
    cy.findByRole('textbox', { name: /search/i })
      .should('exist')
      .should('have.value', '1');

    cy.findByText(/loading/i).should('not.exist');
    cy.findByRole('img', {
      name: 'macOS, Brackets, White Tanktop, Scala, Government, Kisumu, Divergent, JonGold',
    });
    cy.findByRole('link', { name: /view .+ opensea/i }).should(
      'have.attr',
      'href',
      `https://opensea.io/assets/${DEVELOPER_DAO_CONTRACT}/1`,
    );
    cy.findByRole('link', { name: /view .+ etherscan/i })
      .should('have.attr', 'href')
      .and('match', /^https:\/\/etherscan.io\/address\/0x\w+$/);
  });

  it('Loads token id from the url', () => {
    cy.visit('/?id=200');
    cy.findByRole('textbox', { name: /search/i }).should('have.value', '200');

    cy.findByText(/loading/i).should('not.exist');
    cy.findByRole('img', {
      name: 'Linux Mint, Coda, Bubble Gum Wrapper, Whitespace, Farming, Kisumu, Analytical, Kind',
    });
    cy.findByRole('link', { name: /view .+ opensea/i }).should(
      'have.attr',
      'href',
      `https://opensea.io/assets/${DEVELOPER_DAO_CONTRACT}/200`,
    );
  });

  it('Loads token with ampersand character fixed', () => {
    cy.visit('/?id=404');
    cy.findByRole('textbox', { name: /search/i }).should('have.value', '404');

    cy.findByText(/loading/i).should('not.exist');
    cy.findByRole('img', {
      name: 'DOS, Pen & Paper, Pink Hoodie, Java, Environmental, Shenzhen, Critical, Hater',
    });
  });

  it('Updates url when searching for another token id', () => {
    cy.visit('/');
    cy.findByRole('textbox', { name: /search/i })
      .clear()
      .realType('5555');
    cy.findByRole('textbox', { name: /search/i }).should('have.value', '5555');
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
