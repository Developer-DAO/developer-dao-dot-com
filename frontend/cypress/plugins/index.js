/// <reference types="cypress" />

const clipboardy = require('clipboardy');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    getClipboard: () => clipboardy.readSync(),
  });
};
