/// <reference types="cypress" />

const clipboardy = require('clipboardy');

/**
 * @type {Cypress.PluginConfig}
 *
 * @param on is used to hook into various events Cypress emits
 * @param config is the resolved Cypress config
 */
module.exports = (on, config) => {
  on('task', {
    getClipboard: () => clipboardy.readSync(),
  });
};
