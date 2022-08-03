const { APPLICATION_COLLECTION_TYPE_UIDS } = require('./constants');
const { statSync } = require('fs');

/**
 * @param {Strapi} strapi
 */
const ensureSQLite = (strapi) => {
  console.log('verifying db as local SQLite')
  if (strapi.db.config.connection.client !== 'sqlite') {
    throw new Error('strapi is NOT using local SQLite! Please, verify usage of SQLite before clearing data')
  }
}

const randomBoolean = () => Math.random() < 0.5

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const clearData = async (strapi) => {
  ensureSQLite(strapi)

  const collectionTypeUids = [...APPLICATION_COLLECTION_TYPE_UIDS, 'plugin::users-permissions.user']
  const bulkClears = []

  for (const collectionTypeUid of collectionTypeUids) {
    const collectionClear = strapi.query(collectionTypeUid).deleteMany({
      where: {
        id: {
          $notNull: true,
        },
      },
    });

    bulkClears.push(collectionClear)
  }

  await Promise.all(bulkClears)
}

const sampleSize = (arr, num = Math.floor(Math.random() * arr.length)) => {
  if (!arr || arr.length === 0) {
    throw new Error('[sampleSize] valid arr is mandatory!')
  }

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

/**
 * @param {Strapi} strapi
 * @param {Object} data
 * @param {Object} file
 * @returns {Promise<{ id }>}
 */
const uploadFile = async (strapi, {
  data,
  file,
}) => {
  const { refId, ref, field } = data
  const { name, path, type } = file

  const fileStat = statSync(path);

  const [uploadedFile] = await strapi.plugins.upload.services.upload.upload({
    data: {
      refId,
      ref,
      field
    },
    files: {
      path,
      name,
      type,
      size: fileStat.size,
    },
  });

  return uploadedFile
}

module.exports = {
  ensureSQLite,
  randomBoolean,
  clearData,
  sampleSize,
  uploadFile,
}
