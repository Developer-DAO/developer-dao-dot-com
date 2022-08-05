/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const fillGeneralData = async (strapi) => {
  console.log('filling general data...')

  let generalObject = await strapi.entityService.findMany('api::general.general', {})

  if (!generalObject) {
    generalObject = await strapi.entityService.create('api::general.general', {
      data: {
        publishedAt: new Date().toISOString()
      }
    })
  }

  await strapi.entityService.update('api::general.general', generalObject.id, {
    data: {
      news_ticker: {
        name: 'news_ticker',
        content: '# markdown content'
      }
    }
  })

  console.log('general data has been filled successfully!')
}

module.exports = {
  fillGeneralData,
}
