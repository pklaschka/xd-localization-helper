/*
 * Copyright (c) 2018 by Pablo Klaschka
 */

/**
 * The xd-localization-helper module
 * @module xd-localization-helper
 */
declare module 'xd-localization-helper' {
    /**
     * @class LocalizationHelper
     * The main LocalizationHelper class
     * @alias module:xd-localization-helper
     * @static
     * @hideconstructor
     */
    export default class LocalizationHelper {
        /**
         * The currently used language
         */
        static readonly lang: string;


        /**
         * Determines if the current language has a translation (in general, not for a specific key)
         */
        static readonly hasTranslation: boolean;

        /**
         * @private
         * "Unloads" the library (with all translations)
         */
        private static unload(): void;

        /**
         * Initializes the helper. Must be completed before calling {@link LocalizationHelper.get}
         * @param {?string} [translationFolderLocation='lang'] The translation folder name (in the plugin folder)
         * @param {?object} [config] Further configuration
         * @param {?string} [config.overrideLanguage=null] Overrides the language (to use another translation instead of the app's UI language)
         * @return {Promise<boolean>} Promise that resolves when the translations loaded successfully (resolves to true if it was successful)
         */
        public static load(translationFolderLocation?: string, config?: object): Promise<boolean>;

        /**
         * Gets the correct string for a key
         * @param key The key of the string
         * @return {string} The correct translation or the default value for the key
         * @throws An error if neither a translation nor a default value for the key are specified
         */
        static get(key:string):string;
    }
}