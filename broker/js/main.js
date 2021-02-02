$(document).ready(function() {

  // Tabs
  $('.tab-nav').on('click', 'li:not(.tab-current)', function(e) {
    e.preventDefault();
    $(this)
      .addClass('tab-current').siblings().removeClass('tab-current')
      .closest('.tabs').find('.tab-content').removeClass('current').eq($(this).index()).addClass('current');
  });

  // Popup
  $('.password-popup').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

})
