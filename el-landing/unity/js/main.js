$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  // Parallax effect for inner intro section
  $(window).on('scroll' , function() {

    // Change position of image intro
    $('.hero-person').css('top' , - $(window).scrollTop()*0.3);
    //$('.hero-bg').css('top' , - $(window).scrollTop()*0.2);

  });

  var movementStrength = 25;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();
  $(".intro").mousemove(function(e){
            var pageX = e.pageX - ($(window).width() / 2);
            var pageY = e.pageY - ($(window).height() / 2);
            var newvalueX = width * pageX * -1;
            var newvalueY = height * pageY * -1;
            $('.hero-person').css("top", newvalueX+"px");
            $('.hero-person').css("left", newvalueY+"px");

            //$('.hero-bg').css("bottom", newvalueX*0.2+"px");
            $('.hero-bg').css("right", newvalueY*1.2+"px");

            $('.hero-figure').css("top", newvalueX*1.7+"px");
            $('.hero-figure').css("right", newvalueY*1.7+"px");
  });

  // Expert slider
  /*$('.experts-slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });*/

  // Example of works slider
  $('.example-slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // FAQ
  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
    $(this).find('p').slideToggle();
  });

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
          $('.success').show();
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
          $('.success').show();
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
