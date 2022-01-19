$(document).ready(function(){

  $('.dropdown-menu .dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).parents('div.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

    return false;
  });

  // Filter
  const filters = document.querySelectorAll('.filter');

  filters.forEach(filter => {

    filter.addEventListener('click', function() {

      let selectedFilter = filter.getAttribute('data-filter');
      let itemsToHide = document.querySelectorAll(`.filter-content .filter-item:not([data-filter='${selectedFilter}'])`);
      let itemsToShow = document.querySelectorAll(`.filter-content [data-filter='${selectedFilter}']`);

      if (selectedFilter == 'all') {
        itemsToHide = [];
        itemsToShow = document.querySelectorAll('.filter-content [data-filter]');
      }

      itemsToHide.forEach(el => {
        el.classList.add('hide');
        el.classList.remove('showing');
      });

      itemsToShow.forEach(el => {
        el.classList.remove('hide');
        el.classList.add('showing');
      });

      $('.filter-content .panel-body').each(function(index, element){

        if ( $(this).find('.filter-item.show').length == 0 ) {
          $(this).find('.alert').removeClass('d-none');
        } else {
          $(this).find('.alert').addClass('d-none');
        }

      });

    });
  });

  // Right side nav add .active class to sub-nav
  $('#right-side-nav a.label-link').on('click' , function(){

      $(this).next(".sub-nav").collapse('toggle').prev('a').toggleClass('collapsed');
      $('#right-side-nav').find(".sub-nav.show").collapse('hide');
      $('#right-side-nav a.label-link').not(this).addClass('collapsed');

  });

  // Smooth scroll to the section
  $("#right-side-nav .sub-nav a:not([href^='#third-level'])").on('click' , function(e){
      e.preventDefault();

      $("#right-side-nav .sub-nav a").removeClass('active');
      $(this).addClass('active');
      var target = $(this).attr("href");
      $('html, body').animate({
          scrollTop: $(target).offset().top
      }, 1000);
  });

  // Toogle all button
  $('.toggle-box').on('click' , function(e){
      e.preventDefault();

      $('.panel-body .ibox').toggleClass('open');
      $('.panel-body .ibox .ibox-content').slideToggle(200);

  });

  // Read more function
  $('.read-more-btn').on('click' , function(){
    $(this).closest('div').find('.excerpt-row.collapse').collapse('toggle');
    $(this).toggleClass('not-open');
  });

  $('.expand-table-btn').on('click' , function(e){
    e.preventDefault();

    $(this).closest('div').find('.expanded-table.collapse').collapse('toggle');
    $(this).toggleClass('not-open');
  });

  // Sticky right side nav
  var top_position_nav = $('#right-side-nav').offset().top;

  $(window).on('scroll' , function(){
      if ( $(window).scrollTop() >= top_position_nav ) {
          $('#right-side-nav').closest('.col-lg-2').addClass('sticky');
      } else {
          $('#right-side-nav').closest('.col-lg-2').removeClass('sticky');
      }
  });

})

$(function() {

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{ label: "Some label", value: 12 },
            { label: "+100% to +900%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

    Morris.Donut({
        element: 'morris-donut-chart-2',
        data: [{ label: "Some label", value: 12 },
            { label: "+90%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

    Morris.Donut({
        element: 'morris-donut-chart-3',
        data: [{ label: "Some label", value: 12 },
            { label: "+100% to +900%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

    Morris.Donut({
        element: 'morris-donut-chart-4',
        data: [{ label: "Some label", value: 12 },
            { label: "+90%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

});

