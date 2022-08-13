const { isDevelopment } = require('../src/helpers');

const getDevPlugins = () => ({});
const getProductionPlugins = (env) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('STORAGE_ACCESS_KEY_ID'),
        secretAccessKey: env('STORAGE_SECRET_KEY'),
        endpoint: 'ams3.digitaloceanspaces.com',
        params: {
          Bucket: 'sitemedia',
        },
      },
    },
    cdn: '',
  },
});

module.exports = ({ env }) => ({
  ...(isDevelopment() ? getDevPlugins(env) : getProductionPlugins(env)),
});
