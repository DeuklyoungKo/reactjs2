const $ = require('jquery');
require('bootstrap-sass');

// expose $ globally so I can use it in the template
// ... event though I should put all my code here!
global.$ = $;

/*
const logs = [
    {
        "links": {"_self": "\/reps\/78"},
        "id": 78,
        "reps": 1,
        "itemLabel": "Big Fat Cat",
        "totalWeightLifted": 18
    },
    {
        "links": {"_self": "\/reps\/79"},
        "id": 79,
        "reps": 2,
        "itemLabel": "Big Fat Cat",
        "totalWeightLifted": 36
    }
];
*/


const RepLogApp = require('./Components/RepLogApp');

$(document).ready(function() {
    var $wrapper = $('.js-rep-log-table');
    var repLogApp = new RepLogApp($wrapper, $wrapper.data('rep-logs'));
});