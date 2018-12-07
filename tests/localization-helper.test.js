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
            if (this.files.hasOwnProperty(key))
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
        "default.json": new MockFile('default.json', '{"a":"Hello World"}'),
        "de.json": new MockFile('de.json', '{"a":"Hallo Welt"}'),
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
    }
}, {virtual: true});

let mockApp = {
    appLanguage: 'de'
};

jest.mock('application', () => {
    return mockApp;
}, {virtual: true});


describe('Initializing', () => {
    test('be successful with a correct setup', async done => {
        const loc = require('../localization-helper');
        await expect(loc.load()).resolves.toBeTruthy();
        done();
    });

    test('be successful without correct translations', async done => {
        mockApp.appLanguage = 'fr';
        const loc = require('../localization-helper');
        await expect(loc.load()).resolves.toBeTruthy();
        done();
    });

    test('throw with a wrong translations folder name', async done => {
        const loc = require('../localization-helper');
        await expect(loc.load('langsTypo')).rejects.toMatch('Localization helper: Translations didn\'t load successfully: translationFolderLocation \'langsTypo\' doesn\'t exist');
        done();
    });

    test('throw if there\'s no default.json', async done => {
        mockPluginFolder = new MockFolder('plugins', {
            lang: new MockFolder('lang', {
                "de.json": new MockFile('de.json', '{"a":"Hallo Welt"}'),
            })
        });

        const loc = require('../localization-helper');
        await expect(loc.load()).rejects.toMatch('Localization helper: Translations didn\'t load successfully: no default.json file was found...');
        done();
    });

    test('throw if the lang folder is actually a file', async done => {
        mockPluginFolder = new MockFolder('plugins', {
            lang: new MockFile('lang', 'some stuff')
        });

        const loc = require('../localization-helper');
        await expect(loc.load()).rejects.toMatch('Localization helper: Translations didn\'t load successfully: translationFolderLocation \'lang\' is not a folder');
        done();
    });
});

describe('get()', () => {
    beforeEach(() => {
        mockPluginFolder = new MockFolder('plugins', {
            lang: new MockFolder('lang', {
                "default.json": new MockFile('default.json', '{"a":"Hello World"}'),
                "de.json": new MockFile('de.json', '{"a":"Hallo Welt"}'),
            })
        });
        mockApp.appLanguage = 'de';
    });

    test('Correct key, translated language => translated string', async done => {
        const loc = require('../localization-helper');
        await loc.load();
        expect(loc.lang).toBe('de');
        expect(loc.get('a')).toBe('Hallo Welt');
        done();
    });

    test('Correct key, non-translated language => default string', async done => {
        mockApp.appLanguage = 'fr';
        const loc = require('../localization-helper');
        await loc.load();
        expect(loc.lang).toBe('fr');
        expect(loc.get('a')).toBe('Hello World');
        done();
    });

    test('Not initialized => throw error', () => {
        const loc = require('../localization-helper');
        loc.unload();
        expect(() => loc.get('a')).toThrow('Localization helper: The library wasn\'t initialized. Please use \'LocalizationHelper.load()\' before getting a string.');
    });

    test('Incorrect key => throw error', async done => {
        const loc = require('../localization-helper');
        await loc.load();
        expect(() => loc.get('b')).toThrow('Localization helper: Unspecified string key: \'b\'');
        done();
    });
});