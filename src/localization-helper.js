/*
 * Copyright (c) 2018 by Pablo Klaschka
 */

const fs = require('uxp').storage;
const lfs = fs.localFileSystem;

const lang = require('application').appLanguage;

let defaultEntries = {};
let languageEntries = {};

class LocalizationHelper {
    /**
     * Initializes the helper. Must be completed before calling {@link LocalizationHelper.get}
     * @param [translationFolderLocation='lang'] The translation folder location (relative to the plugin folder)
     * @param [config] Further configuration
     * @param [config.overrideLanguage=null] Overrides the language (to use another translation instead of the app's UI language)
     * @return {Promise<void>} Promise that resolves when the translations loaded successfully
     */
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

                if (entries.find(entry => entry.name === usedLanguage + '.json')) {
                    const defaultFile = await translationFolder.getEntry(usedLanguage + '.json');
                    languageEntries = JSON.parse((await defaultFile.read({format: fs.formats.utf8})).toString());
                }
            } else {
                throw 'Localization helper: translationFolderLocation is not a folder';
            }
        } catch (e) {
            throw 'Localization helper: Translations didn\'t load successfully: ' + e;
        }
    }

    /**
     * Gets the correct string for a key
     * @param key The key of the string
     * @return {string} The correct translation or the default value for the key
     * @throws An error if neither a translation nor a default value for the key are specified
     */
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