/*
 * Copyright (c) 2018 by Pablo Klaschka
 */

/**
 * The xd-localization-helper module
 * @module xd-localization-helper
 */
declare module 'xd-localization-helper' {
    /**
     * The currently used language
     */
    const lang: string;


    /**
     * Determines if the current language has a translation (in general, not for a specific key)
     */
    const hasTranslation: boolean;

    /**
     * @private
     * "Unloads" the library (with all translations)
     */
    function unload(): void;

    /**
     * Initializes the helper. Must be completed before calling {@link get}
     * @param {?string} [translationFolderLocation='lang'] The translation folder name (in the plugin folder)
     * @param config Additional configuration options
     * @return {Promise<boolean>} Promise that resolves when the translations loaded successfully (resolves to true if it was successful)
     */
    function load(translationFolderLocation?: string, config?: {
        /**
         * Overrides the language (to use another translation instead of the app's UI language)
         */
        overrideLanguage?: string;
    }): Promise<boolean>;

    /**
     * Gets the correct string for a key
     * @param key The key of the string
     * @return {string} The correct translation or the default value for the key
     * @throws An error if neither a translation nor a default value for the key are specified
     */
    function get(key: string): string;
}
