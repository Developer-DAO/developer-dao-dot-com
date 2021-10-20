# Translation Guide

This document exists to describe the translation system used in this project and
how you can become involved as a translator.

## System

This project uses the [`i18next`][i18next] framework for managing translations.
This framework provides a number of tools out of the box that greatly reduce the
amount of effort required to create and maintain translations for each locale.

We also use [`next-i18next`][next-i18next] which integrates `i18next` with
Next.js and supports translations in SSR pages.

### Structure & Configuration

Translations for each locale are located in individual directories in
[`public/locales`][locales]. Each locale directory e.g.
[`public/locales/en`][en] contains one or more `.json` files which contain the
actual translations e.g. [`public/locales/en/common.json`][en/common] contains
English language translations.

Configuration for `i18next` is located in [`next-18next.config.js`][config].
This file defines the default locale (`i18n.defaultLocale`, currently `en`) used
if a user's locale doesn't have translations yet and the list of currently
available translation locales (`18n.locales`).

## How-tos

This section describes how to accomplish common translation tasks.

### Determining if a language has existing translations

Check the `i18n.locales` list in [`next-18next.config.js`][config]. If the
locale is not listed there, it doesn't exist yet.

### Adding a new locale

1. Add the locale to the `i18n.locales` list in
   [`next-18next.config.js`][config].
2. Create a directory for the locale in [`public/locales`][locales] using the
   locale code e.g. `en` for English as the directory's name.
3. Copy the translation files from [`public/locales/en`][en] into the locale's
   directory. We're currently only using `common.json`, so you would just copy
   [`public/locales/en/common.json`][en/common] into the new directory.
4. Translate the strings in the copied file to that locale's language.

### Adding translations to an existing locale

1. Locate the locale's directory (e.g. [`public/locales/en`][en] for English).
2. Add translations for missing keys in the locale's translation `.json`
   file(s).

### Finding missing translations for a locale

We're working on creating an automated reporting process to make it easy to find
missing translations for a given locale. Until that's automated, check for
missing translations for your locale that have been reported in "Missing
Translation(s)" issues under the [`translation` label][translations].

You can also find missing translations yourself by comparing the default locale
([`public/locales/en/common.json`][en/common]) with the `common.json` file for
your locale. Since `en/common.json` will always have all existing translations,
finding missing translations becomes a process of finding what exists in
`en/common.json` but is missing in your locale's `common.json`.

### Reporting missing translations for a locale

We have a ["Missing Translations" issue form][missing-translations-form] for
manually reporting missing translations. This is typically created after a PR is
merged, as the creator of the PR is the person who best knows the translations
they've added.

### Viewing the site with a specific locale

`next-18next` creates locale-specific routes for each locale. This means you can
view the site with a specific locale by prefixing the URL path with the locale
code.

As an example, visiting https://developerdao.com/fr/projects shows the projects
page using the French locale. This also works with `localhost`:
http://localhost:3000/fr/projects

[i18next]: https://www.i18next.com/
[next-i18next]: https://github.com/isaachinman/next-i18next
[config]: ./next-i18next.config.js
[locales]: ./public/locales
[en]: ./public/locales/en
[en/common]: ./public/locales/en/common.json
[translations]:
  https://github.com/Developer-DAO/developerdao.com/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Atranslation
[missing-translations-form]:
  https://github.com/Developer-DAO/developerdao.com/issues/new?assignees=&labels=translation&template=missing-translations.yml&title=Missing+Translation%28s%29
