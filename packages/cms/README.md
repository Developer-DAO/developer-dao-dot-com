# DeveloperDAO.com CMS

## Development

### Prerequisites

create `.env` from `.env.example` and remove `JWT_SECRET` such as it would be generated and added to `.env` file by Strapi

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
yarn develop
```

### `seed`

By default, on the first application _DEVELOPMENT_ start(with `yarn develop`), **seed data** would be generated. In case you need to re-create it, run

```
yarn seed
```

> ⚠️ This will **clear all data** from all available collections
 
> ⚠️ If something happens during seeding and data starts to grow rapidly - **clear User collection** manually

#### How it works?

Strapi runs **bootstrap** function from `/src/index.js` [every time on server start](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.html#bootstrap).

On the initial run, we check if the current mode is _development_ to run `generateSeedData` function. Only if we previously haven't run seeding - we run it.

When manual seeding happens with `FORCE_APP_BOOTSTRAP_ONLY` in _development_ mode, we run `strapi start` and exit right after **bootstrap** is finished.
In this case, we could have our main app running and not worry about the "port is used" error.

There are default values of how much data we want to generate - feel free to increase or make them 0.
```
DEV_SEED_DATA_PROJECTS=8
DEV_SEED_DATA_CONTRIBUTORS=15
DEV_SEED_DATA_PARTNERS=5
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
yarn build
```

---

# Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.
