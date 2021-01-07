$(function(){

	// Scroll to section
	$('.mouse-scroll').on('click' , function(e){
		e.preventDefault();
		var hash = $(this).attr('href');

    	$('html, body').animate({scrollTop: $(hash).offset().top}, 800);
	})

	// Scroll to top button
	$(window).on('scroll' , function(){
		if ( $(window).scrollTop() > 1500 ) {
			$('.scroll-top').addClass('show');
		} else {
			$('.scroll-top').removeClass('show');
		}
	});

	$('.scroll-top').on('click' , function(e){
		e.preventDefault();

    $('html, body').animate({scrollTop: 0}, 800);
	})

	// Toogle class button menu
	$('.mobile-nav').on('click' , function(){
		$(this).toggleClass('open');
		$('.nav').toggleClass('open');
	})

	// Select language
	$('.language-label').on('click' , function(e){
		e.preventDefault();
		$(this).closest('div').toggleClass('open');
		//$('.nav').toggleClass('open');
	})

	$('.language-list a').on('click' , function(){
		//e.preventDefault();
		var lang = $(this).text();
		$('.language-label span').text(lang);
		$('.language').removeClass('open');
	})

	// Send data from contact form
  $("#contactForm").submit(function(e) { //set the submit event for the form с id=form
    e.preventDefault();
                var form_data = $(this).serialize(); //collect all data from the form
                $.ajax({
                type: 'POST', //Send method
                url: 'mail/mail.php', //path to the sender php file
                data: form_data,
                        success: function(data){ // event after a successful call to the server and receiving a response
                        //alert('все ок'); // пoкaжeм eё тeкст
                        $('.success-message').fadeIn();
                        $('html, body').animate({scrollTop: $('.success-message').offset().top}, 800);
                        $(this).find('input').val('');
                        $('#contactForm').trigger('reset');
                        }
                });
        });

	// Partners logo slider
	$('.slider').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 1500,
    cssEase: 'linear',
    arrows: false,
    dots: false,
    pauseOnHover: true,
		slidesToShow: 8,
		slidesToScroll: 1,
		responsive: [
	    {
	    	breakpoint: 1440,
	      		settings: {
	        		slidesToShow: 6
	      		}
	    },
	    {
	    	breakpoint: 1280,
	      		settings: {
	        		slidesToShow: 5
	      		}
	    },
	    {
	    	breakpoint: 992,
	      		settings: {
	        		slidesToShow: 4
	      		}
	    },
	    {
	    	breakpoint: 768,
	      		settings: {
	        		slidesToShow: 3
	      		}
	    },
	    {
	    	breakpoint: 480,
	      		settings: {
	        		slidesToShow: 2
	      		}
	    }
	  ]
  	});

});
