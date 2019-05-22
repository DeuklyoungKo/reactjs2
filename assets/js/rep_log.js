import $ from 'jquery';
import 'bootstrap-sass';
import RepLogApp from './Components/RepLogApp';

// expose $ globally so I can use it in the template
// ... event though I should put all my code here!
global.$ = $;

$(document).ready(function() {
    var $wrapper = $('.js-rep-log-table');
    var repLogApp = new RepLogApp($wrapper, $wrapper.data('rep-logs'));
});