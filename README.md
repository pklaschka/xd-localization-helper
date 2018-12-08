# :earth_africa: xd-loacalization-helper

[![Build Status](https://travis-ci.com/pklaschka/xd-localization-helper.svg?branch=master)](https://travis-ci.com/pklaschka/xd-localization-helper)
[![npm version](https://badge.fury.io/js/xd-localization-helper.svg)](https://badge.fury.io/js/xd-localization-helper)
[![GitHub Release Date](https://img.shields.io/github/release-date/pklaschka/xd-localization-helper.svg)](https://github.com/pklaschka/xd-localization-helper/releases)
[![GitHub](https://img.shields.io/github/license/pklaschka/xd-localization-helper.svg)](https://github.com/pklaschka/xd-localization-helper/blob/master/LICENSE)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/xd-localization-helper.svg)](https://www.npmjs.com/package/xd-localization-helper)



[![NPM](https://nodei.co/npm/xd-localization-helper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/xd-localization-helper/)


---

A helper library making localization or internationalization of plugins for Adobe XD CC much easier.

### Usage

#### Including the library

First, you'll need to include the library. This can be done in two ways:
1. If you use a bundler like webpack and a package manager like npm, you can simply run `npm i xd-localization-helper` and get a reference to the helper by using `const loc = require('xd-localization-helper');` in your JS.
2. If you don't use webpack and npm, you can also include the `localization-helper.js` file from the latest [release](https://github.com/pklaschka/xd-localization-helper/releases) in your project and get a reference to the helper by using `const loc = require('./localization-helper')`.

#### Folder structure (the translations)

In your translations folder (which must be a direct subfolder of your plugin folder) specified when initializing the helper, defaults to `lang/`, you need at least a `default.json` file for the library to work (if it's not there, `LocalizationHelper.load()` will reject). This should include all the default strings in case no translation is provided for the actual language. This could look something like this:

```json
{
    "mainDialog.title": "My dialog",
    "mainDialog.okBtnText": "Insert",
    "mainDialog.cancelBtnText": "Cancel"
}
```

Additionally, you can provide translations for different languages by adding files corresponding to that language. Their file names should match `[language-code].json`, where `[language-code]` is the language code according to [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

To provide an example, we'll use German translations here (since German is the only other language I know and therefore can demonstrate :wink:), which means we have to create a `de.json` file in our tranlations folder which looks something like this:

```json
{
    "mainDialog.title": "Mein Dialog",
    "mainDialog.okBtnText": "Einfügen",
    "mainDialog.cancelBtnText": "Abbrechen"
}
```
Likewise, a french translation would be a file called `fr.json` etc.:

```json
{
    "mainDialog.title": "Mon pop-up",
    "mainDialog.okBtnText": "Insérez",
    "mainDialog.cancelBtnText": "Annuler"
}
```

#### JavaScript

In your JavaScript code, you first have to initialize the helper. Since we've put our JSON files into the default folder `lang` in this example, we simply achieve this by calling the asynchronous function `LocalizationHelper.load()`:

```javascript
const loc = require('xd-localization-helper');

async function initialize() {
    await loc.load();    
}
```

This `load()` function returns a Promise which resolves when it loaded successfully and rejects with a message informing you about what you did wrong in case something isn't correct (e.g., if there's no folder for the translations or no `default.json` exists).

After that, you can simply get the correct translation by using `loc.get(key)`. For example, `loc.get('mainDialog.okBtnText')` would return `'Einfügen'` in a German environment, `'Insérez'` on a french OS and `'Insert'` on every other environment. Of course, you can specify as many translations as you'd like.

### Further information

You can find further information (like usage examples, a full reference of the available functions and configuration options etc.) in the [repo's wiki](https://github.com/pklaschka/xd-localization-helper/wiki).
