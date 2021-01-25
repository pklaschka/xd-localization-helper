/*
 * Copyright (c) 2021 by Pablo Klaschka
 */

import {terser} from 'rollup-plugin-terser';

export default {
    input: './src/localization-helper.js',
    output: {
        file: './localization-helper.js',
        format: 'module',
        name: 'xd-localization-helper',
    },
    plugins: [
        terser({
            format: {
                comments: 'some'
            },
            keep_classnames: true,
            keep_fnames: true
        })
    ]
};
