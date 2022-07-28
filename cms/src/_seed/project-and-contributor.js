const { faker } = require('@faker-js/faker');
const { randomBoolean, sampleSize } = require('./helpers');
/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const generateProjectAndContributorData = async (strapi) => {
  console.log(`generating projects and contributors`)

  const { DEV_SEED_DATA_PROJECTS, DEV_SEED_DATA_CONTRIBUTORS } = process.env
  const projectsSize = DEV_SEED_DATA_PROJECTS ? parseInt(DEV_SEED_DATA_PROJECTS) : 8
  const contributorsSize = DEV_SEED_DATA_CONTRIBUTORS ? parseInt(DEV_SEED_DATA_CONTRIBUTORS) : 15

  const bulkProjectPromises = []
  const bulkContributorPromises = []

  const randomProjectsData = new Array(projectsSize).fill(null).map(_randomProject)
  const randomContributorsData = new Array(contributorsSize).fill(null).map(_randomContributor)

  for (const randomProjectData of randomProjectsData) {
    const randomProjectPromise = strapi.entityService.create('api::project.project', { data: randomProjectData })
    bulkProjectPromises.push(randomProjectPromise)
  }

  const projects = await Promise.all(bulkProjectPromises)

  for (const randomContributorData of randomContributorsData) {
    const addProject = randomBoolean()

    const randomContributorPromise = strapi.entityService.create('api::contributor.contributor', {
      data: {
        ...randomContributorData,
        ...addProject ? ({ projects: sampleSize(projects).map(project => project.id) }) : {}
      }
    })
    bulkContributorPromises.push(randomContributorPromise)
  }

  await Promise.all(bulkContributorPromises)
}

const _randomProject = () => {
  const username = faker.internet.userName().toLowerCase()

  return {
    name: faker.company.companyName(),
    hero_image: faker.image.avatar(),
    description_short: faker.company.bs(),
    description_long: faker.lorem.paragraph(),
    ens_name: `${ username }.eth`,
    website: faker.internet.url(),
    twitter_handle: username,
    publishedAt: randomBoolean() ? new Date().toISOString() : null
  }
}

const _randomContributor = () => {
  const username = faker.internet.userName().toLowerCase()

  return {
    name: faker.name.findName(),
    ens_name: `${ username }.eth`,
    twitter_handle: username,
    discord_handle: `${ username }#${ faker.random.numeric(4) }`,
    publishedAt: randomBoolean() ? new Date().toISOString() : null
  }
}

module.exports = {
  generateProjectAndContributorData
}
