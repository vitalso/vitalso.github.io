$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Example of works slider
  $('.example-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  });

  // Fixed header at top
  var top_position = $('.intro').outerHeight();
  var top_position_2 = $('.how-study').offset().top - $('.how-study').height()*3-300;

  $(window).on('scroll' , function() {

      if ($(window).scrollTop() >= top_position) {
        $('header').addClass('fixed');
      } else {
        $('header').removeClass('fixed');
      }

      if ( $(window).scrollTop() >=  top_position_2) {
        $('.how-study').addClass('transition');
      }

  });

  // FAQ
  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
    $(this).find('p').slideToggle();
  });

  // Scroll to section
  $('.scroll-down').on('click' , function(e){
    e.preventDefault();
    var hash = $(this).attr('href');

    $('html, body').animate({scrollTop: $(hash).offset().top}, 1000);
  })

  // Popup with video
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true
  });

  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
  });

  // Popup form text field effect
  $('.popup-form input').on('blur' , function(){
    if ($(this).val().length != 0) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  /**
   *
   * Работа с формами отправки данных пользователя в АМО
   * Парсим адресную строку на наличие UTM меток
   * Если метки utm_source в адресной строке нет, используем Referer
   * Создаем JSON из данных в скрытых полях формы и utm меток
   * Отправляем форму в АМО
   */


  function getParameterByName(paramName) {
    var name = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


  var utm_source = getParameterByName('utm_source') || document.referrer;
  var utm_content = getParameterByName('utm_content');
  var utm_medium = getParameterByName('utm_medium');
  var utm_campaign = getParameterByName('utm_campaign');
  var utm_term = getParameterByName('utm_term');

  var getFormFieldVal = function ($form, filed) {
    var el = $form.find( $('[name='+filed+' ]'));
     return el.val();
  }

  var createAMOJSON = function  (form) {
    var data = {
      "name": getFormFieldVal(form, "name"),
      "phone": getFormFieldVal(form, "phone"),
      "email": getFormFieldVal(form, "email"),
      "customFields": {
        "lead": [
          {
            "field_id": 1052883,
            "values": [
              {
                "value": utm_source
              }
            ]
          },
          {
            "field_id": 1052889,
            "values": [
              {
                "value": utm_content
              }
            ]
          },
          {
            "field_id": 1052891,
            "values": [
              {
                "value": utm_campaign
              }
            ]
          },
          {
            "field_id": 1052893,
            "values": [
              {
                "value": utm_medium
              }
            ]
          },
          {
            "field_id": 1052895,
            "values": [
              {
                "value": utm_term
              }
            ]
          },
          {
            "field_id": 1052887,
            "values": [
              {
                "value": getFormFieldVal(form, "page")
              }
            ]
          },
          {
            "field_id": 1046103,
            "values": [
              {
                "enum_id": parseInt(getFormFieldVal(form, "source"))
              }
            ]
          },
          /*{
            "field_id": 307293,
            "values": [
              {
                "enum_id": parseInt(getFormFieldVal(form, "profession"))
              }
            ]
          },*/
          {
            "field_id": 307395,
            "values": [
              {
                "enum_id": parseInt(getFormFieldVal(form, "course"))
              }
            ]
          }
        ]
      }
    }

    return JSON.stringify(data)
  }

  $('form input[name="phone"]').keypress(function (e) {
    keys = ['0','1','2','3','4','5','6','7','8','9','+']
    return keys.indexOf(event.key) > -1
  });

  var $getCorseForm = $('form[name="getCourse"]');
  var $getCorseFormPopup = $('form[name="getCourse-popup"]');

  if ($getCorseForm.length) {
    $getCorseForm.each(function () {
      var $this = $(this);

      $this.submit(function(e) {

        $this.find('button[type="submit"]').attr('disabled' , 'disabled');

        e.preventDefault();

        $.ajax({
          contentType: "application/json",
          type: $this.attr('method'),
          url: $this.attr('action'),
          data: createAMOJSON($this)
        }).done(function() {
          console.log('success');
          $('.sign-to-course').find('.success').show();
          $getCorseForm.trigger('reset');
          $getCorseForm.find('button[type="submit"]').removeAttr('disabled');
          $getCorseForm.hide();
          $getCorseForm.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

  if ($getCorseFormPopup.length) {
    $getCorseFormPopup.each(function () {
      var $this = $(this);

      $this.submit(function(e) {

        $this.find('button[type="submit"]').attr('disabled' , 'disabled');

        e.preventDefault();

        $.ajax({
          contentType: "application/json",
          type: $this.attr('method'),
          url: $this.attr('action'),
          data: createAMOJSON($this)
        }).done(function() {
          console.log('success');
          $('.white-popup-block').find('.success').show();
          $getCorseFormPopup.trigger('reset');
          $getCorseFormPopup.find('button[type="submit"]').removeAttr('disabled');
          $getCorseFormPopup.find('input').removeClass('active');
          $getCorseFormPopup.hide();
          $getCorseFormPopup.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

});
