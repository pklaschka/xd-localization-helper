/*
 * Copyright (c) 2018 by Pablo Klaschka
 */

declare module 'xd-localization-helper' {
    class LocalizationHelper {
        /**
         * The currently used language
         */
        static readonly lang;


        /**
         * Determines if the current language has a translation (in general, not for a specific key)
         */
        static readonly hasTranslation;

        /**
         * @private
         * "Unloads" the library (with all translations)
         */
        static unload();

        /**
         * Initializes the helper. Must be completed before calling {@link LocalizationHelper.get}
         * @param [translationFolderLocation='lang'] The translation folder name (in the plugin folder)
         * @param [config] Further configuration
         * @param [config.overrideLanguage=null] Overrides the language (to use another translation instead of the app's UI language)
         * @return {Promise<boolean>} Promise that resolves when the translations loaded successfully (resolves to true if it was successful)
         */
        static load(translationFolderLocation, config);

        /**
         * Gets the correct string for a key
         * @param key The key of the string
         * @return {string} The correct translation or the default value for the key
         * @throws An error if neither a translation nor a default value for the key are specified
         */
        static get(key);
    }

    export = LocalizationHelper;
}