const fs = require('uxp').storage;
const lfs = fs.localFileSystem;

const lang = require('application').appLanguage;

let defaultEntries = {};
let languageEntries = {};

class LocalizationHelper {
    static async load(translationFolderLocation, config) {
        if (!translationFolderLocation)
            translationFolderLocation = 'lang';

        let options = {
            overrideLanguage: null,
        };
        Object.assign(options, config);

        try {
            const pluginFolder = await lfs.getPluginFolder();
            const translationFolder = await pluginFolder.getEntry(translationFolderLocation);

            if (translationFolder.isFolder) {
                const entries = await translationFolder.getEntries();

                if (entries.find(entry => entry.name === 'default.json')) {
                    const defaultFile = await translationFolder.getEntry('default.json');
                    defaultEntries = JSON.parse((await defaultFile.read({format: fs.formats.utf8})).toString());
                } else {
                    throw 'Localization helper: NO default.json file was found...';
                }

                const usedLanguage = config.overrideLanguage ? config.overrideLanguage : lang;

                if (entries.find(entry => entry.name === usedLanguage+'.json')) {
                    const defaultFile = await translationFolder.getEntry(usedLanguage+'.json');
                    languageEntries = JSON.parse((await defaultFile.read({format: fs.formats.utf8})).toString());
                }
            } else {
                throw 'Localization helper: translationFolderLocation is not a folder';
            }
        } catch (e) {
            throw 'Localization helper: Translations didn\'t load successfully: ' + e;
        }
    }

    static get(key) {
        if (languageEntries.hasOwnProperty(key)) {
            return languageEntries[key];
        } else if (defaultEntries.hasOwnProperty(key)) {
            return defaultEntries[key];
        } else {
            throw 'Localization helper: Unspecified string key: ' + key;
        }
    }
}

module.exports = LocalizationHelper;