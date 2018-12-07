# :earth_africa: xd-loacalization-helper


[![Build Status](https://travis-ci.com/pklaschka/xd-localization-helper.svg?branch=master)](https://travis-ci.com/pklaschka/xd-localization-helper)
[![npm version](https://badge.fury.io/js/xd-localization-helper.svg)](https://badge.fury.io/js/xd-localization-helper)
![David](https://img.shields.io/david/pklaschka/xd-localization-helper.svg)


[![NPM](https://nodei.co/npm/xd-storage-helper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/xd-localization-helper/)


---

WIP

In your translations folder (specified when initializing the helper, defaults to `[your-plugin-folder]/lang/`), you need at least a `default.json` file for the library to work. This should include all the default strings in case no translation is provided for the actual language. This could look something like this:

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

In your JavaScript code, you first have to initialize the helper. Since we've chose the default folder `lang` here, we simply achieve this by calling the asynchronous function `load()`:

```javascript
const loc = require('xd-localization-helper');

async function initialize() {
    await loc.load();    
}
```

After that, we can simply get the correct translation by using `loc.get(key)`. For example, `loc.get('mainDialog.okBtnText')` would return `'Einfügen'` in a German environment, `'Insérez'` on a french OS and `'Insert'` on every other environment. Of course, you can specify as many translations as you'd like.