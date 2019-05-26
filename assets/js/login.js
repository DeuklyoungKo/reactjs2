'use strict';

import $ from 'jquery';
import '../css/login.css';
// import username_validation_error from './Components/username_validation_error';

$(document).ready(function() {
    $('.js-recommended-login').on('click', '.js-show-login', function(e) {
        e.preventDefault();

        $('.js-recommended-login-details').toggle();
    });

    $('.js-login-field-username').on('keydown', function(e) {
        const $usernameInput = $(e.currentTarget);
        // remove any existing warnings
        $('.login-long-username-warning').remove();

        if ($usernameInput.val().length >= 20) {
            // const $warning = $('<div class="login-long-username-warning">This is a really long username - are you sure that is right?</div>');
            // $usernameInput.before($warning);

            import('./Components/username_validation_error').then(username_validation_error => {
                console.log(username_validation_error);
                username_validation_error.default($(this));
            });

        }
    });
});