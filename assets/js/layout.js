'use strict';

import $ from 'jquery';
import 'bootstrap-sass';

// require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
// require('font-awesome/css/font-awesome.css');
import '../css/main.scss';

// include this on every page to make sure Promise exists
import 'babel-polyfill';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});