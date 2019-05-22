const $ = require('jquery');
require('bootstrap-sass');

// expose $ globally so I can use it in the template
// ... event though I should put all my code here!
global.$ = $;

const RepLogApp = require('./Components/RepLogApp');

$(document).ready(function() {
    var $wrapper = $('.js-rep-log-table');
    var repLogApp = new RepLogApp($wrapper);
});