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
