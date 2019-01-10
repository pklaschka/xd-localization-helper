<a name="module_xd-localization-helper"></a>

## xd-localization-helper
The xd-localization-helper module


* [xd-localization-helper](#module_xd-localization-helper)
    * [LocalizationHelper](#exp_module_xd-localization-helper--LocalizationHelper) ⏏
        * [.lang](#module_xd-localization-helper--LocalizationHelper.lang) ⇒ <code>string</code>
        * [.hasTranslation](#module_xd-localization-helper--LocalizationHelper.hasTranslation) ⇒ <code>boolean</code>
        * [.load([translationFolderLocation], [config])](#module_xd-localization-helper--LocalizationHelper.load) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.get(key)](#module_xd-localization-helper--LocalizationHelper.get) ⇒ <code>string</code>

<a name="exp_module_xd-localization-helper--LocalizationHelper"></a>

### LocalizationHelper ⏏
LocalizationHelperThe main LocalizationHelper class

**Kind**: global class of [<code>xd-localization-helper</code>](#module_xd-localization-helper)  
<a name="module_xd-localization-helper--LocalizationHelper.lang"></a>

#### LocalizationHelper.lang ⇒ <code>string</code>
The currently used language

**Kind**: static property of [<code>LocalizationHelper</code>](#exp_module_xd-localization-helper--LocalizationHelper)  
**Returns**: <code>string</code> - The language code  
<a name="module_xd-localization-helper--LocalizationHelper.hasTranslation"></a>

#### LocalizationHelper.hasTranslation ⇒ <code>boolean</code>
Determines if the current language has a translation (in general, not for a specific key)

**Kind**: static property of [<code>LocalizationHelper</code>](#exp_module_xd-localization-helper--LocalizationHelper)  
**Returns**: <code>boolean</code> - Translation exists for the current language  
<a name="module_xd-localization-helper--LocalizationHelper.load"></a>

#### LocalizationHelper.load([translationFolderLocation], [config]) ⇒ <code>Promise.&lt;boolean&gt;</code>
Initializes the helper. Must be completed before calling [LocalizationHelper.get](LocalizationHelper.get)

**Kind**: static method of [<code>LocalizationHelper</code>](#exp_module_xd-localization-helper--LocalizationHelper)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Promise that resolves when the translations loaded successfully(resolves to true if it was successful)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [translationFolderLocation] | <code>string</code> | <code>&quot;&#x27;lang&#x27;&quot;</code> | The translation folder name (in the plugin folder) |
| [config] | <code>Object</code> |  | Further configuration |
| [config.overrideLanguage] | <code>string</code> | <code>null</code> | Overrides the language (to use another translation instead of the app's UI language) |

<a name="module_xd-localization-helper--LocalizationHelper.get"></a>

#### LocalizationHelper.get(key) ⇒ <code>string</code>
Gets the correct string for a key

**Kind**: static method of [<code>LocalizationHelper</code>](#exp_module_xd-localization-helper--LocalizationHelper)  
**Returns**: <code>string</code> - The correct translation or the default value for the key  
**Throws**:

- An error if neither a translation nor a default value for the key are specified


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the string |

