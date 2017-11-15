import fs from 'fs'
import babel from 'rollup-plugin-babel'

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
    input: 'src/index.js',
    external: ['react', 'prop-types', "lodash/isEqual"],
    exports: 'named',
    globals: {
        react: 'React',
        'prop-types': 'PropTypes',
        'lodash/isEqual': 'isEqual',
    },
    strict: false,
    sourcemap: true,
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({
            jsnext: false,
            main: true,
            browser: true
        }),
        commonjs({
            ignoreGlobal: true,
            include: 'node_modules/**'
        })
    ],
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        },
        {
            file: pkg['umd:main'],
            format: 'umd',
            name: pkg.name,
        },
    ]
}