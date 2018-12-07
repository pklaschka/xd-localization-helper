## Modules

<dl>
<dt><a href="#module_xd-localization-helper">xd-localization-helper</a></dt>
<dd><p>The xd-localization-helper module</p>
</dd>
</dl>

<a name="module_xd-localization-helper"></a>

## xd-localization-helper
The xd-localization-helper module

<a name="LocalizationHelper"></a>

## .LocalizationHelper
**Kind**: static class  

* [.LocalizationHelper](#LocalizationHelper)
    * [new LocalizationHelper()](#new_LocalizationHelper_new)
    * [.lang](#LocalizationHelper.lang) ⇒ <code>string</code>
    * [.hasTranslation](#LocalizationHelper.hasTranslation) ⇒ <code>boolean</code>
    * [.load([translationFolderLocation], [config])](#LocalizationHelper.load) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.get(key)](#LocalizationHelper.get) ⇒ <code>string</code>

<a name="new_LocalizationHelper_new"></a>

### new LocalizationHelper()
The main LocalizationHelper class

<a name="LocalizationHelper.lang"></a>

### LocalizationHelper.lang ⇒ <code>string</code>
The currently used language

**Kind**: static property of [<code>LocalizationHelper</code>](#LocalizationHelper)  
**Returns**: <code>string</code> - The language code  
<a name="LocalizationHelper.hasTranslation"></a>

### LocalizationHelper.hasTranslation ⇒ <code>boolean</code>
Determines if the current language has a translation (in general, not for a specific key)

**Kind**: static property of [<code>LocalizationHelper</code>](#LocalizationHelper)  
**Returns**: <code>boolean</code> - Translation exists for the current language  
<a name="LocalizationHelper.load"></a>

### LocalizationHelper.load([translationFolderLocation], [config]) ⇒ <code>Promise.&lt;boolean&gt;</code>
Initializes the helper. Must be completed before calling [get](#LocalizationHelper.get)

**Kind**: static method of [<code>LocalizationHelper</code>](#LocalizationHelper)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Promise that resolves when the translations loaded successfully (resolves to true if it was successful)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [translationFolderLocation] | <code>string</code> | <code>&quot;&#x27;lang&#x27;&quot;</code> | The translation folder name (in the plugin folder) |
| [config] | <code>Object</code> |  | Further configuration |
| [config.overrideLanguage] | <code>string</code> | <code>null</code> | Overrides the language (to use another translation instead of the app's UI language) |

<a name="LocalizationHelper.get"></a>

### LocalizationHelper.get(key) ⇒ <code>string</code>
Gets the correct string for a key

**Kind**: static method of [<code>LocalizationHelper</code>](#LocalizationHelper)  
**Returns**: <code>string</code> - The correct translation or the default value for the key  
**Throws**:

- An error if neither a translation nor a default value for the key are specified


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the string |

