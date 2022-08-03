const { isDevelopment } = require('../src/helpers');

const getDevPlugins = (env) => ({})
const getProductionPlugins = (env) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("STORAGE_ACCESS_KEY_ID"), // env("SCALEWAY_ACCESS_KEY_ID"),
        secretAccessKey: env("STORAGE_SECRET_KEY"), // env("SCALEWAY_ACCESS_SECRET"),
        endpoint: "ams3.digitaloceanspaces.com", // env("SCALEWAY_ENDPOINT"), // e.g. "s3.fr-par.scw.cloud"
        params: {
          Bucket: "sitemedia", //env("SCALEWAY_BUCKET"),
        },
      },
    },
  },
})

module.exports = ({ env }) => ({
  ...(isDevelopment() ? getDevPlugins(env) : getProductionPlugins(env))
});
