$(function () {

    // Mobile menu button toggle
    $('.navbar-toggler').on('click' , function(){
      $(this).toggleClass('open');
    });

    // Dropdown behavior like a <select>
    $('.dropdown-select .dropdown-menu a').on('click' , function(e){
      e.preventDefault();

      let currentOption = $(this).text();
      let currentFlag = $(this).attr('href');
      $(this).closest('.dropdown-select').find('button[data-bs-toggle] span').text(currentOption);
      $(this).closest('.dropdown-select').find('button[data-bs-toggle] img').attr('src' , currentFlag);

    });

    // News slider
    $('.reviews-slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 3,
        //centerMode: true,
        //centerPadding: '60px',
        //variableWidth: true,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  vertical: true,
                  dots: false,
                  swipe: false
                }
              }
          ]
    });

    // Show password
    $('.show-password').on('click' , function(){
      let inputPasword = $(this).closest('div').find('input');
      let inputType = inputPasword.attr('type');
      if ( inputType == 'password' ) {
        inputPasword.attr('type' , 'text');
      } else {
        inputPasword.attr('type' , 'password');
      }
    });

    // Init jQuery steps
    var steps = $('.step-app').steps({
      onFinish: function () { 
        //alert('complete');
        $('#app-form').addClass('d-none'); // Hide section with steps
        $('#review-application').removeClass('d-none'); // Show order summary for application
      }
    });

    steps_api = steps.data('plugin_Steps');

    $('.step-footer button').on('click', function () {
      var idx = steps_api.getStepIndex()+1;

      // Show sidebar question
      if ( idx == 3 ) {
        $('.question-sidebar').removeClass('d-none');
      }

      // Show previous button
      if ( idx == 4 ) {
        $('.step-footer button[data-step-action="prev"]').removeClass('d-none');
      }

		});

    // Edit Traveler
    $('.edit-traveler').on('click', function (e) {
      e.preventDefault();
      steps_api.setStepIndex(2);
		});

    // Datepicker
    $('.datepicker').datepicker({
      format: 'dd MM yyyy',
      autoclose: true
    });

    // File upload
    $('.files input[type="file"]').change(function() {
      var file = $(this)[0].files[0].name;
      $('.file-upload-list .item-file').removeClass('d-none').find('.file-name').text(file);
      $('.file-upload-list .item-file .progress-bar').css('width' , '100%');
    });

    // Phone number
    $(".phone").intlTelInput({
      autoHideDialCode: false,
      nationalMode: false,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js"
    });      

    // Question sidebar
    $('.question-sidebar .close-sidebar').on('click' , function(){
      $(this).closest('.question-sidebar').addClass('d-none');
    });

    // Attention button
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    });

    // Table
    var $table = $('#table')
    
    $table.bootstrapTable('refreshOptions' , {
      classes: 'table-striped table table-bordered'
    });

});
