$(document).ready(function(){

    $('.js-nav__toggle').on('click', function(e) {
      $('.drawer').toggleClass('is-visible');
    });

    $('.js-drawer__close').on('click', function(e) {
      $('.drawer').toggleClass('is-visible');
    });

});
