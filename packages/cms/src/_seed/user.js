const { SEED_USERNAME } = require('./constants');
/**
 * Using Users collection as main indicator if we have generated seed data before
 * @param {Strapi} strapi
 * @returns {Promise<boolean>}
 */
const seedUserExists = async (strapi) => {
  const [seedUser] = await strapi.entityService.findMany('plugin::users-permissions.user', {
    filters: {
      username: SEED_USERNAME,
    },
  });
  return !!seedUser;
};

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const createSeedUser = async (strapi) => {
  // TODO: needs update - cannot login with this API-created user
  // checkout how [user-permissions] plugin registers user via REST - jwt issuing required
  // https://github.com/strapi/strapi/blob/master/packages/plugins/users-permissions/server/controllers/auth.js#L239

  const now = Date.now();

  await strapi.entityService.create('plugin::users-permissions.user', {
    data: {
      username: SEED_USERNAME,
      password: `${SEED_USERNAME}-${now}`,
      email: `${SEED_USERNAME}+${now}@developerdao.cms`,
      confirmed: true,
    },
  });
};

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
// const createDefaultUser = async (strapi) => {
//   await strapi.entityService.create('plugin::users-permissions.user', {
//     data: {
//       username: 'username',
//       password: 'password',
//       email: 'default@developerdao.cms',
//       confirmed: true
//     }
//   });
// };

// possible user types to create
// const createAdminUser = () => {};
// const createEditorUser = () => {};

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const generateUserData = async (strapi) => {
  await createSeedUser(strapi);
  // in case we want to have some default end-users we can use `create*` functions above
};

module.exports = {
  seedUserExists,
  createSeedUser,
  generateUserData,
};
