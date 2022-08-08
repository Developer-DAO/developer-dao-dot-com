const { seedUserExists, generateUserData } = require('./user');
const { clearData, updateStrapiPublicRole } = require('./helpers');
const { generatePartnerData } = require('./partner');
const { generateProjectAndContributorData } = require('./project-and-contributor');
const { fillHomePage } = require('./pages');
const { fillGeneralData } = require('./general');

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const generateSeedData = async (strapi) => {
  const dataExists = await seedUserExists(strapi);
  const forceBootstrap = process.env.FORCE_APP_BOOTSTRAP_ONLY === 'true';

  const skipGeneration = dataExists && !forceBootstrap;

  if (skipGeneration) {
    console.log('skipping seed data generation...');
    return;
  }

  if (forceBootstrap) {
    console.log('forcing seed data re-creation...');
    await clearData(strapi);
    console.log('existing data has been cleaned!');
  }

  console.log('generating seed data...');

  await Promise.all([
    generateProjectAndContributorData(strapi),
    generatePartnerData(strapi),
    generateUserData(strapi),
  ]).catch((e) => {
    console.error('error during generating seed data! Stopping the application...');
    throw new Error(e);
  });

  // Single Types
  await Promise.all([fillHomePage(strapi), fillGeneralData(strapi)]).catch((e) => {
    console.error('error during generating page data! Stopping the application...');
    throw new Error(e);
  });

  console.log('updating Public role to access pages and data');
  await updateStrapiPublicRole(strapi);

  console.log('generating seed data has been finished successfully!');
};

module.exports = {
  generateSeedData,
};
