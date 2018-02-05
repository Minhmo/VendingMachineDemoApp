let packageJSON = require('./package.json');
let path = require('path');
let webpack = require('webpack');

const PATHS = {
    build: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'webjars',
        packageJSON.name, packageJSON.version)
};

let ENV = process.env.npm_lifecycle_event;
let isTest = ENV === 'test' || ENV === 'test-watch';

module.exports = function makeWebpackConfig() {
    let config = {};

    config.entry = isTest ? void 0 : './app/index.js';

    config.output = isTest ? {} : {
        path: PATHS.build,
        publicPath: '/assets/',
        filename: 'app-bundle.js'
    };

    config.module = {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        presets: [
                            'babel-preset-es2015'
                        ].map(require.resolve)
                    }
                }
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: isTest ? 'null-loader' : 'style-loader', // inject CSS to page
                }, {
                    loader: isTest ? 'null-loader' : 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: isTest ? 'null-loader' : 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: isTest ? 'null-loader' : 'sass-loader' // compiles Sass to CSS
                }]
            },

            {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                loader: 'raw-loader'
            },
        ]
    };

    if (isTest) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'istanbul-instrumenter-loader',
            query: {
                esModules: true
            }
        })
    }

    return config;
};