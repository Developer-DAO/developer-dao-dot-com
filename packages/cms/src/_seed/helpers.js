const { APPLICATION_COLLECTION_TYPE_UIDS, DEFAULT_PUBLIC_ROLE_ID } = require('./constants');
const { statSync } = require('fs');
const merge = require('lodash.merge');

/**
 * @param {Strapi} strapi
 */
const ensureSQLite = (strapi) => {
  console.log('verifying db as local SQLite');
  if (strapi.db.config.connection.client !== 'sqlite') {
    throw new Error(
      'strapi is NOT using local SQLite! Please, verify usage of SQLite before clearing data'
    );
  }
};

const randomBoolean = () => Math.random() < 0.5;

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const clearData = async (strapi) => {
  ensureSQLite(strapi);

  const collectionTypeUids = [
    ...APPLICATION_COLLECTION_TYPE_UIDS,
    'plugin::users-permissions.user',
  ];
  const bulkClears = [];

  for (const collectionTypeUid of collectionTypeUids) {
    const collectionClear = strapi.query(collectionTypeUid).deleteMany({
      where: {
        id: {
          $notNull: true,
        },
      },
    });

    bulkClears.push(collectionClear);
  }

  await Promise.all(bulkClears);
};

const sampleSize = (arr, num = Math.floor(Math.random() * arr.length)) => {
  if (!arr || arr.length === 0) {
    throw new Error('[sampleSize] valid arr is mandatory!');
  }

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

/**
 * @param {Strapi} strapi
 * @param {Object} data
 * @param {Object} file
 * @returns {Promise<{ id }>}
 */
const uploadFile = async (strapi, { data, file }) => {
  const { refId, ref, field } = data;
  const { name, path, type } = file;

  const fileStat = statSync(path);

  const [uploadedFile] = await strapi.plugins.upload.services.upload.upload({
    data: {
      refId,
      ref,
      field,
    },
    files: {
      path,
      name,
      type,
      size: fileStat.size,
    },
  });

  return uploadedFile;
};

/**
 * @param {Strapi} strapi
 */
const updateStrapiPublicRole = async (strapi) => {
  const roleService = strapi.plugin('users-permissions').service('role');

  const publicRoleSettings = await roleService.findOne(DEFAULT_PUBLIC_ROLE_ID);
  const overridePermissions = {
    'api::contributor': {
      controllers: {
        contributor: {
          find: {
            enabled: true,
          },
          findOne: {
            enabled: true,
          },
        },
      },
    },
    'api::general': {
      controllers: {
        general: {
          find: {
            enabled: true,
          },
        },
      },
    },
    'api::home-page': {
      controllers: {
        'home-page': {
          find: {
            enabled: true,
          },
        },
      },
    },
    'api::partner': {
      controllers: {
        partner: {
          find: {
            enabled: true,
          },
          findOne: {
            enabled: true,
          },
        },
      },
    },
    'api::project': {
      controllers: {
        project: {
          find: {
            enabled: true,
          },
          findOne: {
            enabled: true,
          },
        },
      },
    },
  };

  await roleService.updateRole(
    DEFAULT_PUBLIC_ROLE_ID,
    merge({ ...publicRoleSettings }, { permissions: overridePermissions })
  );
};

module.exports = {
  ensureSQLite,
  randomBoolean,
  clearData,
  sampleSize,
  uploadFile,
  updateStrapiPublicRole,
};
