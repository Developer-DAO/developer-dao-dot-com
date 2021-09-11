Thanks for showing interest in contributing to the Developer DAO!

This document will guide you through all the things you might need to know to
start contributing to the project.

# Development

## Internationalization (i18n)

This project uses [`i18next`][i18next] to handle translation of text on the
site. The user's language is automatically detected from their browser settings
and loaded (thanks to
[`i18next-browser-languageDetector`][i18next-browser-languagedetector]).

New blocks of text should be defined in the translation files and then
referenced using the `useTranslation` hook from `i18next`.

Here's an example:

```jsx
// src/Text.js
import { useTranslation } from "i18next";

const Text = () => {
  const { t } = useTranslation();

  return <p>{t("text")}</p>;
};

// src/locales/en/translations.js
export default {
  text: 'text',
}

// src/locales/es/translations.js
export default {
  text: 'texto',
}
```

[i18next]: https://www.i18next.com/
[i18next-browser-languagedetector]:
  https://github.com/i18next/i18next-browser-languageDetector
[i18n-example]: https://github.com/Developer-DAO/developer-dao/pull/17/files
