module.exports = {
    entry: './src/localization-helper.js',
    output: {
        path: __dirname,
        filename: 'localization-helper.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        uxp: 'uxp',
        application: 'application'
    }
};
