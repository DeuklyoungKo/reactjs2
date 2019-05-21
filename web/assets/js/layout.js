'use strict';

const $ = require('jquery');
// window.jQuery = $;
require('bootstrap');

require('babel-polyfill');

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});