const { join } = require('path')
const { uploadFile } = require('../helpers');

/**
 * @param {Strapi} strapi
 * @returns {Promise<void>}
 */
const fillHomePage = async (strapi) => {
  console.log('filling home page...')

  let homePageObject = await strapi.entityService.findMany('api::home-page.home-page', {})

  if (!homePageObject) {
    homePageObject = await strapi.entityService.create('api::home-page.home-page', {
      data: {
        heading: 'tmp_required_value',
        publishedAt: new Date().toISOString()
      }
    })
  }

  const logoPath = join(__dirname, '../media/d_d-dark.jpeg')
  const logo = await uploadFile(strapi, {
    data: {
      refId: homePageObject.id,
      ref: 'api::home-page.home-page',
      field: 'logo',
    },
    file: {
      path: logoPath,
      name: 'd_d-dark.jpeg',
      type: 'image/jpeg'
    },
  })

  console.log('logo for Footer has been created!')

  const partners = (await strapi.entityService.findMany('api::partner.partner', {
    limit: 5
  })).map(partner => partner.id)

  await strapi.entityService.update('api::home-page.home-page', homePageObject.id, {
    data: {
      heading: 'Build web3 with friends.',
      sub_heading: 'Developer DAO is a community of thousand of web3 builders creating a better internet. Join us and create the future.',
      news_ticker: [{
        name: 'membership',
        title: 'MEMBERSHIP_OPEN!',
        description: 'Good luck getting the DAO NFT!'
      }, {
        name: 'status',
        title: 'Current Status: Season 0',
        description: 'GM frens!'
      }],
      values: [{
        name: 'transparency',
        title: 'Transparency',
        description: 'Open Source Everything, Conversations In Public, Document And Share Journey',
      }, {
        name: 'diversity_inclusion',
        title: 'Diversity and Inclusion',
        description: 'Seek To Foster As Diverse A Membership As Possible And Support Everyone To Contribute',
      }, {
        name: 'responsibility',
        title: 'Responsibility',
        description: 'As A Self-governed Community We Rely On Members To Be Personally Responsible For Their Actions And Commitments To The Community',
      }, {
        name: 'kindness_empathy',
        title: 'Kindness and Empathy',
        description: 'We Know That We Are Living In A Complex, Stressful, And Diverse World And Go Out Of Our Way To Make People’s Lives And Days Better Through Our Interactions',
      }],
      mission: 'Developer DAO exists to accelerate the education and impact of a new wave of web3 builders.',
      goals: [{
        name: 'goal_1',
        title: 'goal_1',
        description: 'Onboard, Educate & Support Web3 Developers'
      }, {
        name: 'goal_2',
        title: 'goal_2',
        description: 'Foster & Build Web3 Tools & Public Goods'
      }],
      partners,
      footer: {
        logo: logo.id,
        useful_links: [{
          name: 'developerdao_wiki',
          title: 'Wiki',
          link: 'https://developerdao.notion.site/developerdao/Developer-DAO-Wiki-eff4dcb00bef46fbaa93e9e4cf940e2e',
        }, {
          name: 'developerdao_forum',
          title: 'Forum',
          link: 'https://forum.developerdao.com/',
        }],
        discover: [{
          name: 'developerdao_blog',
          title: 'Blog',
          link: 'https://developerdao.notion.site/Newsletter-d9c971f2bea446338624042ea20547f9'
        }],
        social: [{
          name: 'twitter',
          title: 'Twitter',
          link: 'https://twitter.com/developer_dao',
          type: 'social'
        }]
      },
      meta_og: {
        title: 'The Developer DAO',
        description: 'Building web3 with friends',
        image: 'https://www.developerdao.com/D_D_logo-dark.svg',
        image_media: logo.id
      },
      current_status: {
        statement: {
          name: 'season_0',
          title: 'Current Status: Season 0',
          description: 'We’re forming guilds, creating culture, strengthening our community, teaching & learning, and building cool things together.'
        },
        link: {
          name: 'snapshot',
          title: 'Read our snapshot',
          link: 'https://developerdao.notion.site/How-to-use-Snapshot-32692309faf446ddb2a898f22050fb5f#05f55b4052c044169402a443b36945ff'
        }
      }
    }
  })

  console.log('home page has been filled successfully!')
}

module.exports = {
  fillHomePage,
}
