module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: "DO004M8VR6Y63M4TBZVW", // env("SCALEWAY_ACCESS_KEY_ID"),
        secretAccessKey: "lvnAQwamgpmuhkULWnCsjjl3HtEnj6uGcCTkgxGov9M", // env("SCALEWAY_ACCESS_SECRET"),
        endpoint: "ams3.digitaloceanspaces.com", // env("SCALEWAY_ENDPOINT"), // e.g. "s3.fr-par.scw.cloud"
        params: {
          Bucket: "sitemedia", //env("SCALEWAY_BUCKET"),
        },
      },
    },
  },
  // ...
});
