const { faker } = require('@faker-js/faker');
const { randomBoolean, uploadFile } = require('./helpers');
const { join } = require('path');

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const generatePartnerData = async (strapi) => {
  console.log('generating partners');

  const { DEV_SEED_DATA_PARTNERS } = process.env;
  const partnersSize = DEV_SEED_DATA_PARTNERS ? parseInt(DEV_SEED_DATA_PARTNERS) : 5;

  const logoLight = await uploadFile(strapi, {
    data: {
      refId: Date.now(),
      ref: 'api::partner.partner',
      field: 'logo_light',
    },
    file: {
      path: join(__dirname, './media/d_d-light.jpeg'),
      name: 'd_d-light.jpeg',
      type: 'image/jpeg',
    },
  });
  const logoDark = await uploadFile(strapi, {
    data: {
      refId: Date.now(),
      ref: 'api::partner.partner',
      field: 'logo_dark',
    },
    file: {
      path: join(__dirname, './media/d_d-dark.jpeg'),
      name: 'd_d-dark.jpeg',
      type: 'image/jpeg',
    },
  });

  const bulkPartnerPromises = [];
  const randomPartnersData = new Array(partnersSize).fill(null).map(_randomPartner);

  for (const randomPartnerData of randomPartnersData) {
    const randomPartnerPromise = strapi.entityService.create('api::partner.partner', {
      data: {
        ...randomPartnerData,
        logo_light: logoLight.id,
        logo_dark: logoDark.id,
      },
    });
    bulkPartnerPromises.push(randomPartnerPromise);
  }

  await Promise.all(bulkPartnerPromises);
};

const _randomPartner = () => {
  const name = faker.company.companyName();

  return {
    name,
    website: faker.internet.url(),
    twitter_handle: faker.internet.userName(name).toLowerCase(),
    publishedAt: randomBoolean() ? new Date().toISOString() : null,
  };
};

module.exports = {
  generatePartnerData,
};
