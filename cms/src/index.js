'use strict';

const { isDevelopment } = require('./helpers');
const { generateSeedData } = require('./_seed');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   * @param {Strapi} strapi
   * @returns {Promise<void>}
   */
  async bootstrap({ strapi }) {
    console.log('///---===[bootstrap.js]===---')
    if (isDevelopment()) {
      console.log('the application is in the development mode!')
      console.log('running the development bootstrap...')

      await generateSeedData(strapi)
      // other DEVELOPMENT bootstrap functions
    }

    // general bootstrap functions

    console.log('bootstrap function has finished successfully!')
    console.log('---===[bootstrap.js]===---///')

    if (process.env.FORCE_APP_BOOTSTRAP_ONLY === 'true') {
      console.log('FORCE_APP_BOOTSTRAP_ONLY mode has been activated - exiting process prematurely.')
      process.exit(0)
    }
  },
};
