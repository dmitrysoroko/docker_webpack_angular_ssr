const { resolve } = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const webpack = require('webpack');
const html = require('html-webpack-plugin');

const COMMAND = process.env.COMMAND;

function root(path) {
    return resolve(__dirname, path);
}

client = {
    entry: { app: root('src/main.ts') },
    module: {
        rules: [
            { test: /\.html$/, loader: 'html-loader' },
            { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, loader: '@ngtools/webpack!angular-router-loader' },
            { test: /\.scss$/, loader: 'raw-loader!sass-loader' },
            { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=images/[name].[ext]' }
        ],
    },
    output: {
        path: '/app/build/browser',
        filename: 'js/[name].js',
        chunkFilename: '[name]-chunk.js'
    },
    plugins: [
        new html({
            template: root('src/index.html'),
            output: '/app/build/browser',
        }),
        new webpack.DefinePlugin({
            COMMAND: JSON.stringify(COMMAND)
        }),
        new AngularCompilerPlugin({
            tsConfigPath: root('src/tsconfig.json'),
            entryModule: root('src/app/app.module#AppModule'),
            platform: 0
        }),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         screw_ie8: true,
        //         conditionals: true,
        //         unused: true,
        //         comparisons: true,
        //         sequences: true,
        //         dead_code: true,
        //         evaluate: true,
        //         if_return: true,
        //         join_vars: true
        //     },
        //     output: {
        //         comments: false
        //     }
        // }),
    ],
    devServer: {
        historyApiFallback: true,
        port: 8080,
        host: '0.0.0.0',
        inline: true,
        hot: true,
        public:'0.0.0.0:80',
        watchOptions: { poll: 1000 },
    }
};

ssr = {
    entry: root('src/main.server.ts'),
    target: 'node',
    output: {
        path: '/app/build',
        filename: 'server.js'
    },
    module: {
        rules: [
            { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, loader: '@ngtools/webpack' },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.scss$/, loader: 'raw-loader!sass-loader' },
        ]
    },
    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: root('src/tsconfig.json'),
            entryModule: root('src/app/app.server.module#AppServerModule'),
            platform: 1
        }),
        new webpack.DefinePlugin({
            COMMAND: JSON.stringify(COMMAND)
        }),
        new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, root('src'), {}),
        new webpack.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, root('src'), {})
    ]
};

module.exports = function (env) {
    if (env.client) return client;
    if (env.ssr) return ssr;
};