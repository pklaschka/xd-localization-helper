/*
 * Copyright (c) 2018 by Pablo Klaschka
 */

const fs = require('uxp').storage;
const lfs = fs.localFileSystem;

let lang;

let defaultEntries = undefined;
let languageEntries = undefined;

// eslint-disable-next-line valid-jsdoc
/**
 * @class LocalizationHelper
 * The main LocalizationHelper class
 * @alias module:xd-localization-helper
 * @static
 * @hideconstructor
 */
class LocalizationHelper {
    /**
     * The currently used language
     * @return {string} The language code
     */
    static get lang() {
        return lang;
    }

    /**
     * Determines if the current language has a translation (in general, not for a specific key)
     * @return {boolean} Translation exists for the current language
     */
    static get hasTranslation() {
        return languageEntries !== undefined;
    }

    /**
     * @private
     * "Unloads" the library (with all translations)
     * @return {void}
     */
    static unload() {
        lang = undefined;
        defaultEntries = undefined;
        languageEntries = undefined;
    }

    /**
     * Initializes the helper. Must be completed before calling {@link LocalizationHelper.get}
     * @param {?string} [translationFolderLocation='lang'] The translation folder name (in the plugin folder)
     * @param {?Object} [config] Further configuration
     * @param {?string} [config.overrideLanguage=null] Overrides the language (to use another translation
     * instead of the app's UI language)
     * @return {Promise<boolean>} Promise that resolves when the translations loaded successfully
     * (resolves to true if it was successful)
     */
    static async load(translationFolderLocation, config) {
        LocalizationHelper.unload();

        lang = require('application').appLanguage;

        // Dealing with parameters
        translationFolderLocation = translationFolderLocation || 'lang';

        let options = Object.assign({
            overrideLanguage: null,
        }, config || {});

        lang = options.overrideLanguage ? options.overrideLanguage : lang;

        // Actual logic
        try {
            const pluginFolder = await lfs.getPluginFolder();

            if (!(await pluginFolder.getEntries()).find(entry => entry.name === translationFolderLocation))
                throw 'translationFolderLocation \'' + translationFolderLocation + '\' doesn\'t exist';

            const translationFolder = await pluginFolder.getEntry(translationFolderLocation);

            if (translationFolder.isFolder) {
                const entries = await translationFolder.getEntries();

                if (entries.find(entry => entry.name === 'default.json')) {
                    const defaultFile = await translationFolder.getEntry('default.json');
                    defaultEntries = JSON.parse((await defaultFile.read({format: fs.formats.utf8})).toString());
                } else {
                    throw 'required default.json file not available in the ' +
                    'translation folder \''+translationFolderLocation+'\'...';
                }

                if (entries.find(entry => entry.name === lang + '.json')) {
                    const defaultFile = await translationFolder.getEntry(lang + '.json');
                    languageEntries = JSON.parse((await defaultFile.read({format: fs.formats.utf8})).toString());
                }

                return true;
            } else {
                throw 'translationFolderLocation \'' + translationFolderLocation + '\' is not a folder';
            }
        } catch (e) {
            throw 'Localization helper: Translations didn\'t load successfully: ' + e;
        }
    }

    /**
     * @private
     * Fetches a string from a parsed JSON object, may it be namespaced or flat
     * @param {Object} object The parsed JSON object
     * @param {string} key The key of the string
     * @return {boolean | string} The value or false if it's not defined
     */
    static getNamespaced(object, key) {
        if (object.hasOwnProperty(key))
            return object[key];
        else {
            for (let i = 1; i <= key.split('.').length + 1; i++) {
                let newKey = key.split('.', i).join('.');
                if (object.hasOwnProperty(newKey))
                    return this.getNamespaced(object[newKey], key.substring(newKey.length + 1, key.length));
            }
            return false;
        }
    }

    /**
     * Gets the correct string for a key
     * @param {!string} key The key of the string
     * @return {string} The correct translation or the default value for the key
     * @throws An error if neither a translation nor a default value for the key are specified
     */
    static get(key) {
        if (languageEntries && this.getNamespaced(languageEntries, key)) {
            return this.getNamespaced(languageEntries, key);
        } else if (!defaultEntries)
            throw 'Localization helper: The library wasn\'t initialized. Please use \'await ' +
            'LocalizationHelper.load()\' before getting a string.';
        else if (this.getNamespaced(defaultEntries, key)) {
            return this.getNamespaced(defaultEntries, key);
        } else {
            throw 'Localization helper: String was not found, key: \'' + key + '\'';
        }
    }
}

/**
 * The xd-localization-helper module
 * @module xd-localization-helper
 */
module.exports = LocalizationHelper;
