module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){const r=n(1).storage,o=r.localFileSystem,a=n(2).appLanguage;let i={},u={};t.exports=class{static async load(t,e){t||(t="lang");let n={overrideLanguage:null};n=Object.assign(n,e||{});try{const e=await o.getPluginFolder();if(!(await e.getEntries()).find(e=>e.name===t))throw"translationFolderLocation '"+t+"' doesn't exist";const s=await e.getEntry(t);if(s.isFolder){const t=await s.getEntries();if(!t.find(t=>"default.json"===t.name))throw"no default.json file was found...";{const t=await s.getEntry("default.json");i=JSON.parse((await t.read({format:r.formats.utf8})).toString())}const e=n.overrideLanguage?n.overrideLanguage:a;if(t.find(t=>t.name===e+".json")){const t=await s.getEntry(e+".json");u=JSON.parse((await t.read({format:r.formats.utf8})).toString())}return!0}throw"translationFolderLocation '"+t+"' is not a folder"}catch(t){throw"Localization helper: Translations didn't load successfully: "+t}}static get(t){if(u.hasOwnProperty(t))return u[t];if(i.hasOwnProperty(t))return i[t];throw"Localization helper: Unspecified string key: "+t}}},function(t,e){t.exports=require("uxp")},function(t,e){t.exports=require("application")}]);