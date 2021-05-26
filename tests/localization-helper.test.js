class MockFile {
    constructor(name, content) {
        this.content = content;
        this.name = name;
    }

    async read() {
        return this.content;
    }

    async getEntry() {
        throw 'Not a folder';
    }

    async getEntries() {
        throw 'Not a folder';
    }

    get isFile() {
        return true;
    }

    get isFolder() {
        return false;
    }
}

const locationHelperLocation = '../src/localization-helper';

class MockFolder {
    constructor(name, files) {
        this.files = files;
        this.name = name;
    }

    async getEntry(name) {
        if (this.files[name])
            return this.files[name];
        else
            throw 'No such entry';
    }

    async getEntries() {
        let returnArray = [];
        for (let key in this.files)
            if (Object.prototype.hasOwnProperty.call(this.files, key))
                returnArray.push(this.files[key]);
        return returnArray;
    }

    async read() {
        throw 'Not a file';
    }

    get isFile() {
        return false;
    }

    get isFolder() {
        return true;
    }
}


let mockPluginFolder = new MockFolder('plugins', {
    lang: new MockFolder('lang', {
        'default.json': new MockFile('default.json', '{"a":"Hello World"}'),
        'de.json': new MockFile('de.json', '{"a":"Hallo Welt"}'),
    })
});
jest.mock('uxp', () => {
    return {
        storage: {
            formats: {
                utf8: 'utf8'
            },
            localFileSystem: {
                getPluginFolder: () => {
                    return mockPluginFolder;
                }
            }
        }
    };
}, {virtual: true});

let mockApp = {
    appLanguage: 'de'
};

jest.mock('application', () => {
    return mockApp;
}, {virtual: true});


describe('Initializing', () => {
    test('be successful with a correct setup', async () => {
        const loc = require(locationHelperLocation);
        await expect(loc.load()).resolves.toBeTruthy();
    });

    test('be successful without correct translations', async () => {
        mockApp.appLanguage = 'fr';
        const loc = require(locationHelperLocation);
        await expect(loc.load()).resolves.toBeTruthy();
    });

    test('throw with a wrong translations folder name', async () => {
        const loc = require(locationHelperLocation);
        await expect(loc.load('langsTypo')).rejects.toMatch('translationFolderLocation \'langsTypo\' doesn\'t exist');
    });

    test('throw if there\'s no default.json', async () => {
        mockPluginFolder = new MockFolder('plugins', {
            lang: new MockFolder('lang', {
                'de.json': new MockFile('de.json', '{"a":"Hallo Welt"}'),
            })
        });

        const loc = require(locationHelperLocation);
        await expect(loc.load())
            .rejects
            .toMatch('required default.json file not available in the translation folder...');
    });

    test('throw if the lang folder is actually a file', async () => {
        mockPluginFolder = new MockFolder('plugins', {
            lang: new MockFile('lang', 'some stuff')
        });

        const loc = require(locationHelperLocation);
        await expect(loc.load()).rejects.toMatch('translationFolderLocation is not a folder');
    });
});

describe('get()', () => {
    beforeEach(() => {
        mockPluginFolder = new MockFolder('plugins', {
            lang: new MockFolder('lang', {
                'default.json': new MockFile('default.json', '{"a":"Hello World"}'),
                'de.json': new MockFile('de.json', '{"a":"Hallo Welt"}'),
            })
        });
        mockApp.appLanguage = 'de';
    });

    test('Correct key, translated language => translated string', async () => {
        const loc = require(locationHelperLocation);
        await loc.load();
        expect(loc.lang).toBe('de');
        expect(loc.get('a')).toBe('Hallo Welt');
    });

    test('Correct key, forced translated language => translated string', async () => {
        mockApp.appLanguage = 'fr';
        const loc = require(locationHelperLocation);
        await loc.load('lang', {overrideLanguage: 'de'});
        expect(loc.lang).toBe('de');
        expect(loc.get('a')).toBe('Hallo Welt');
        expect(loc.hasTranslation).toBe(true);
    });

    test('Correct key, forced non-translated language => default string', async () => {
        mockApp.appLanguage = 'fr';
        const loc = require(locationHelperLocation);
        await loc.load('lang', {overrideLanguage: 'aa'});
        expect(loc.lang).toBe('aa');
        expect(loc.get('a')).toBe('Hello World');
    });

    test('Correct key, non-translated language => default string', async () => {
        mockApp.appLanguage = 'fr';
        const loc = require(locationHelperLocation);
        await loc.load();
        expect(loc.lang).toBe('fr');
        expect(loc.get('a')).toBe('Hello World');
        expect(loc.hasTranslation).toBe(false);
    });

    test('Not initialized => throw error', () => {
        const loc = require(locationHelperLocation);
        loc.unload();
        expect(() => loc.get('a')).toThrow('Localization helper: The library wasn\'t initialized. Please use ' +
            '\'await LocalizationHelper.load()\' before getting a string.');
    });

    test('Incorrect key => throw error', async () => {
        const loc = require(locationHelperLocation);
        await loc.load();
        expect(() => loc.get('b')).toThrow('Localization helper: String was not found, key: \'b\'');
    });
});

describe('Namespacing inside the JSON file', () => {
    beforeEach(() => {
        mockPluginFolder = new MockFolder('plugins', {
            lang: new MockFolder('lang', {
                'default.json': new MockFile('default.json', '{"a.b":"String 1", ' +
                    '"a": {"c": "String 2", "d": {"e":"String 3"}}}')
            })
        });
        mockApp.appLanguage = 'de';
    });

    test('Flat namespace', async () => {
        const loc = require(locationHelperLocation);
        await loc.load();
        expect(loc.lang).toBe('de');
        expect(loc.get('a.b')).toBe('String 1');
    });

    test('Indented namespace level 1', async () => {
        const loc = require(locationHelperLocation);
        await loc.load();
        expect(loc.lang).toBe('de');
        expect(loc.get('a.c')).toBe('String 2');
    });

    test('Indented namespace level 2', async () => {
        const loc = require(locationHelperLocation);
        await loc.load();
        expect(loc.lang).toBe('de');
        expect(loc.get('a.d.e')).toBe('String 3');
        expect(() => loc.get('a.c.d.e')).toThrow('Localization helper: String was not found, key: \'a.c.d.e\'');
    });
});
