$(document).ready(function() {

  // Tabs
  $('.tab-nav').on('click', 'li:not(.tab-current)', function(e) {
    e.preventDefault();
    $(this)
      .addClass('tab-current').siblings().removeClass('tab-current')
      .closest('.tabs').find('.tab-content').removeClass('current').eq($(this).index()).addClass('current');
  });

  // Expand table row
  $('.expand').on('click' , function(e){
    e.preventDefault();
    $(this).toggleClass('expanded');
    $(this).closest('.table-row').toggleClass('current-row');
    $(this).closest('.table-row').next('.expand-table').toggleClass('open');
  });

  // Menu button
  $('.menu-button , .app-button').on('click' , function(){
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).next('div').removeClass('open');
    } else {
      $('.menu-button , .app-button , .menu-dropdown , .menu-apps').removeClass('open');
      $(this).addClass('open');
      $(this).next('div').addClass('open');
    }
  });

  // Login form
  $('#login-form').submit(function(){
    $(this).find('button[type="submit"]').text('One moment please...')
  })

})
