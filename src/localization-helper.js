/*!
 * xd-localization-helper
 *
 * MIT License
 *
 * Copyright (c) 2018 Pablo Klaschka
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const application = require('application');
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
        translationFolderLocation = this.prepareLoad(translationFolderLocation, config);

        // Actual logic
        const pluginFolder = await lfs.getPluginFolder();

        if (!(await pluginFolder.getEntries()).find(entry => entry.name === translationFolderLocation))
            throw 'translationFolderLocation \'' + translationFolderLocation + '\' doesn\'t exist';

        const translationFolder = await pluginFolder.getEntry(translationFolderLocation);
        return await this.loadTranslations(translationFolder);
    }

    /**
     * Loads the translations from the specified translationFolder.
     * @protected
     * @param {fs.Entry} translationFolder - the translation folder
     * @return {Promise<boolean>} resolves with `true` on success and rejects on error.
     */
    static async loadTranslations(translationFolder) {
        if (translationFolder.isFolder) {
            const translationFolderFiles = await translationFolder.getEntries();

            if (translationFolderFiles.find(entry => entry.name === 'default.json')) {
                await this.loadFile(translationFolder, 'default.json', true);
            } else {
                throw 'required default.json file not available in the translation folder...';
            }

            const languageFileName = lang + '.json';

            if (translationFolderFiles.find(entry => {
                return entry.name === languageFileName;
            })) {
                await this.loadFile(translationFolder, languageFileName, false);
            }

            return true;
        } else {
            throw 'translationFolderLocation is not a folder';
        }
    }

    static prepareLoad(translationFolderLocation, config) {
        LocalizationHelper.unload();

        lang = application.appLanguage;

        // Dealing with parameters
        translationFolderLocation = translationFolderLocation || 'lang';

        const options = Object.assign({
            overrideLanguage: null,
        }, config || {});

        lang = options.overrideLanguage ? options.overrideLanguage : lang;
        return translationFolderLocation;
    }

    /**
     * Loads a specific translation file from the translation folder
     *
     * Sets either `defaultEntries` or `languageEntries` to the result, if `isDefault` is `true` or `false`,
     * respectively.
     * @protected
     * @param {fs.Folder} translationFolder - the folder with the translation files
     * @param {string} fileName - the file name of the translation file
     * @param {boolean} isDefault - whether the file should serve as "default entry"
     * @return {Promise<void>} A promise that resolves if the file gets loaded or rejects on error.
     */
    static async loadFile(translationFolder, fileName, isDefault) {
        const defaultFile = await translationFolder.getEntry(fileName);
        let result = JSON.parse((await defaultFile.read({format: fs.formats.utf8})).toString());
        if (isDefault)
            defaultEntries = result;
        else
            languageEntries = result;
    }

    /**
     * @private
     * Fetches a string from a parsed JSON object, may it be namespaced or flat
     * @param {Object} object The parsed JSON object
     * @param {string} key The key of the string
     * @return {boolean | string} The value or false if it's not defined
     */
    static getNamespaced(object, key) {
        if (Object.prototype.hasOwnProperty.call(object, key))
            return object[key];
        else {
            for (let i = 1; i <= key.split('.').length + 1; i++) {
                let newKey = key.split('.', i).join('.');
                if (Object.prototype.hasOwnProperty.call(object, newKey))
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
