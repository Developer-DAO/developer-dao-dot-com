const { faker } = require('@faker-js/faker');
const { randomBoolean } = require('./helpers');

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const generatePartnerData = async (strapi) => {
  console.log('generating partners')

  const { DEV_SEED_DATA_PARTNERS } = process.env
  const partnersSize = DEV_SEED_DATA_PARTNERS ? parseInt(DEV_SEED_DATA_PARTNERS) : 5

  const bulkPartnerPromises = []
  const randomPartnersData = new Array(partnersSize).fill(null).map(_randomPartner)

  for (const randomPartnerData of randomPartnersData) {
    const randomPartnerPromise = strapi.entityService.create('api::partner.partner', { data: randomPartnerData })
    bulkPartnerPromises.push(randomPartnerPromise)
  }

  await Promise.all(bulkPartnerPromises)
}

const _randomPartner = () => ({
  name: faker.company.companyName(),
  website: faker.internet.url(),
  twitter_handle: faker.internet.userName().toLowerCase(),
  publishedAt: randomBoolean() ? new Date().toISOString() : null
  /**
   * "Media Library Upload" is only working via RestAPI, but when we generate seed data, no server is running
   * Skipping logos generation so far
   */
  // logo_dark
  // logo_light
})

module.exports = {
  generatePartnerData
}
