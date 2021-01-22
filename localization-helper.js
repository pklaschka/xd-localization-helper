module.exports=function(t){var e={};function a(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){
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
const n=a(1),r=a(2).storage,o=r.localFileSystem;let i,l=void 0,s=void 0;class u{static get lang(){return i}static get hasTranslation(){return void 0!==s}static unload(){i=void 0,l=void 0,s=void 0}static async load(t,e){t=this.prepareLoad(t,e);const a=await o.getPluginFolder();if(!(await a.getEntries()).find(e=>e.name===t))throw"translationFolderLocation '"+t+"' doesn't exist";const n=await a.getEntry(t);return await this.loadTranslations(n)}static async loadTranslations(t){if(t.isFolder){const e=await t.getEntries();if(!e.find(t=>"default.json"===t.name))throw"required default.json file not available in the translation folder...";await this.loadFile(t,"default.json",!0);const a=i+".json";return e.find(t=>t.name===a)&&await this.loadFile(t,a,!1),!0}throw"translationFolderLocation is not a folder"}static prepareLoad(t,e){u.unload(),i=n.appLanguage,t=t||"lang";const a=Object.assign({overrideLanguage:null},e||{});return i=a.overrideLanguage?a.overrideLanguage:i,t}static async loadFile(t,e,a){const n=await t.getEntry(e);let o=JSON.parse((await n.read({format:r.formats.utf8})).toString());a?l=o:s=o}static getNamespaced(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e];for(let a=1;a<=e.split(".").length+1;a++){let n=e.split(".",a).join(".");if(Object.prototype.hasOwnProperty.call(t,n))return this.getNamespaced(t[n],e.substring(n.length+1,e.length))}return!1}static get(t){if(s&&this.getNamespaced(s,t))return this.getNamespaced(s,t);if(l){if(this.getNamespaced(l,t))return this.getNamespaced(l,t);throw"Localization helper: String was not found, key: '"+t+"'"}throw"Localization helper: The library wasn't initialized. Please use 'await LocalizationHelper.load()' before getting a string."}}t.exports=u},function(t,e){t.exports=require("application")},function(t,e){t.exports=require("uxp")}]);