Thanks for showing interest in contributing to the Developer DAO!

This document will guide you through all the things you might need to know to
start contributing to the project.

# Development

This project uses [yarn][yarn] to manage its dependencies. After checking out
the project, be sure to run `yarn` to install the project's dependencies.

## Internationalization (i18n)

This project uses [`next-i18next`][next-i18next] to handle translation of text
on the site. The user's language is automatically detected from their browser
settings and loaded.

New blocks of text should be defined in the translation files and then
referenced using the `useTranslation` hook from `next-i18next`[next-i18next].

Here's an example:

```jsx
// src/Text.js
import { useTranslation } from "next-i18next";

const Text = () => {
  const { t } = useTranslation();

  return <p>{t("text")}</p>;
};

// src/locales/en/common.json
{
  "text": "text"
}

// src/locales/es/common.json
{
  "text": "texto"
}
```

[i18n-example]: https://github.com/Developer-DAO/developer-dao/pull/17/files
[next-i18next]: https://www.npmjs.com/package/next-i18next

[yarn]: [https://yarnpkg.com/]
