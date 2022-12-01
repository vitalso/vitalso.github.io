$(function () {

    // Mobile menu button toggle
    $('.navbar-toggler').on('click' , function(){
      $(this).toggleClass('open');
    });

    // How it work vertical progress bar
    $(window).scroll(function(){
      var scrollAmount = $(window).scrollTop();
      var progressBar = $('#how-it-work');
      var progressItem = $('.progress-list .progress-list-item');
      var progressItemHeight = progressItem.outerHeight(true);
      
      if ( progressBar.length ) {
        var offsetTop = progressBar.offset().top - 300;
      }

      // calculate the percentage the user has scrolled down the page
      var scrollPercent = scrollAmount - offsetTop;

      $('.vertical-progress-bar').css({
          height: scrollPercent + 'px'
      });

      if ( scrollPercent > 0 ) {
        progressItem.eq(0).addClass('active');
      } else {
        progressItem.eq(0).removeClass('active');
      }

      if ( scrollPercent > progressItemHeight ) {
        progressItem.eq(1).addClass('active');
      } else {
        progressItem.eq(1).removeClass('active');
      }

      if ( scrollPercent > progressItemHeight*2 ) {
        progressItem.eq(2).addClass('active');
      } else {
        progressItem.eq(2).removeClass('active');
      }

      if ( scrollPercent > progressItemHeight*3 ) {
        progressItem.eq(3).addClass('active');
      } else {
        progressItem.eq(3).removeClass('active');
      }
    
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

    // Validate Email
    var validate_email = function(email){
      var pattern = /^([a-zA-A0-9_.-])+@([a-zA-Z0-9_.-])+([a-zA-Z])+/;
      var is_email_valid = false;
      if(email.match(pattern) != null){
        is_email_valid = true;
      }
      return is_email_valid;
    }
    
    $('#validate-email').on('focusout' , function(){
      var input_val = $(this).val();
      var is_success = validate_email(input_val); 

      if ( !is_success ) {
        $(this).focus();
        $('button[data-step-action="next"]').addClass('disabled');
      } else {
        $('button[data-step-action="next"]').removeClass('disabled');
      }
    });

    // Additional input(radio button)
    $('.additional-radio-btn input[type="radio"]').on('change' , function(){
      var value = $(this).filter(':checked').val();

      if ( value == 'ja' ) {
        $(this).closest('.additional-radio-btn').next('.additional-input').removeClass('d-none');
      } else {
        $(this).closest('.additional-radio-btn').next('.additional-input').addClass('d-none');
      }

    });

    // Checked terms and condition
    $('input[name="terms-and-privacy"]').on('change' , function(){

      if ( $('input[name="terms-and-privacy"]:checked').length >= 2 ) {
        $('button[data-bs-target="#successAppModal"]').removeClass('disabled');
      }

    });

    // Init jQuery steps
    var steps = $('#app-form').steps({
      onFinish: function () { 
        //alert('complete');
        $('#app-form').addClass('d-none'); // Hide section with steps
        $('#review-application').removeClass('d-none'); // Show order summary for application
      }
    });

    // Form for new traveler step
    $('#demo').steps();

    steps_api = steps.data('plugin_Steps');

    $('.app-nav button').on('click', function (e) {
      var idx = steps_api.getStepIndex()+1;

      // Mobile title of step
      var mobileStepTitle = $('#mobile-step-title');
      mobileStepTitle.find('span').text($('#app-form .step-steps li.active div').text());

      if ( idx >= 2 ) {
        mobileStepTitle.find('span').addClass('gradient-text'); // .gradient-text just add primary color to title of step
      }

      // Show Email validate modal
      if ( $(this).data('step-action') == 'next' && idx <= 2 ) {
        e.preventDefault();
        $('#validationModal').modal('show');
      }

      // Show previous button
      if ( idx == 3 ) {
        $('.app-nav button[data-step-action="prev"]').removeClass('d-none');
        $('.app-nav button[data-step-action="next"]').addClass('disabled');
      }

		});

    $('#newTravelerModal').on('hidden.bs.modal', function (e) {
      $('.traveler-wrap').removeClass('d-none');
      $('.app-nav button[data-step-action="next"]').removeClass('disabled');
    })

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
