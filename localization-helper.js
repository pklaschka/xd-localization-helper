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
const t=require("application"),a=require("uxp").storage,e=a.localFileSystem;let i,n,o;class LocalizationHelper{static get lang(){return i}static get hasTranslation(){return void 0!==o}static unload(){i=void 0,n=void 0,o=void 0}static async load(t,a){t=this.prepareLoad(t,a);const i=await e.getPluginFolder();if(!(await i.getEntries()).find((a=>a.name===t)))throw"translationFolderLocation '"+t+"' doesn't exist";const n=await i.getEntry(t);return await this.loadTranslations(n)}static async loadTranslations(t){if(t.isFolder){const a=await t.getEntries();return await this.loadDefaultTranslations(a,t),await this.loadLanguageTranslations(a,t),!0}throw"translationFolderLocation is not a folder"}static async loadLanguageTranslations(t,a){const e=i+".json";t.find((t=>t.name===e))&&await this.loadFile(a,e,!1)}static async loadDefaultTranslations(t,a){if(!t.find((t=>"default.json"===t.name)))throw"required default.json file not available in the translation folder...";await this.loadFile(a,"default.json",!0)}static prepareLoad(a,e){LocalizationHelper.unload(),i=t.appLanguage,a=a||"lang";const n=Object.assign({overrideLanguage:null},e||{});return i=n.overrideLanguage?n.overrideLanguage:i,a}static async loadFile(t,e,i){const s=await t.getEntry(e);let r=JSON.parse((await s.read({format:a.formats.utf8})).toString());i?n=r:o=r}static getNamespaced(t,a){return Object.prototype.hasOwnProperty.call(t,a)?t[a]:this.getNamespacedSplitByDots(t,a)}static getNamespacedSplitByDots(t,a){for(let e=1;e<=a.split(".").length+1;e++){let i=a.split(".",e).join(".");if(Object.prototype.hasOwnProperty.call(t,i))return this.getNamespaced(t[i],a.substring(i.length+1,a.length))}return!1}static get(t){if(o&&this.getNamespaced(o,t))return this.getNamespaced(o,t);if(n){if(this.getNamespaced(n,t))return this.getNamespaced(n,t);throw"Localization helper: String was not found, key: '"+t+"'"}throw"Localization helper: The library wasn't initialized. Please use 'await LocalizationHelper.load()' before getting a string."}}module.exports=LocalizationHelper;
