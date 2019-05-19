// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        rep_log: './web/assets/js/rep_log.js',
        login: './web/assets/js/login.js',
        layout: './web/assets/js/layout.js',
    },
    output: {
        path: path.join( __dirname, 'web','build'),
        filename: '[name].js',
    },
    watchOptions: {
        poll: true
    },
};