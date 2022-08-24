// deploy to DO as part of CI
const axios = require('axios').default;
require('dotenv').config();

async function main() {
  try {
    const { data } = await axios.post(
      'https://api.digitalocean.com/v2/apps/21030157-a72b-40d2-afa6-0b498c63144d/deployments',
      {
        // force_build: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CMS_DEPLOY_KEY}`,
        },
      }
    );

    const deployId = data.deployment.id;

    console.log('\n');
    console.log('🚨🚨 CMS Deploy In Progress 🚨🚨');
    console.log('\n');

    const waitForDeploy = setInterval(async () => {
      try {
        const deployData = await axios(
          `https://api.digitalocean.com/v2/apps/21030157-a72b-40d2-afa6-0b498c63144d/deployments/${deployId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.CMS_DEPLOY_KEY}`,
            },
          }
        );
        if (deployData.data.deployment.phase === 'ACTIVE') {
          clearInterval(waitForDeploy);
          console.log('CMS DEPLOY COMPLETE 🐐🎉🚀');
          console.log('\n');
        }
      } catch (error) {
        throw new Error('CMS BUILD FAILED 🚨');
      }
    }, 1500);
  } catch (error) {
    throw new Error('CMS BUILD FAILED 🚨');
  }
}

main()
  .then()
  .catch(() => process.exit(1));
