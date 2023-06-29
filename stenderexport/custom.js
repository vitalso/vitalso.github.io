document.addEventListener("DOMContentLoaded", function(){
// make it as accordion for smaller screens
if (window.innerWidth > 992) {

	document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem){

		everyitem.addEventListener('mouseover', function(e){

			let el_link = this.querySelector('a[data-bs-toggle]');

			if(el_link != null){
				let nextEl = el_link.nextElementSibling;
				el_link.classList.add('show');
				nextEl.classList.add('show');
			}

		});
		everyitem.addEventListener('mouseleave', function(e){
			let el_link = this.querySelector('a[data-bs-toggle]');

			if(el_link != null){
				let nextEl = el_link.nextElementSibling;
				el_link.classList.remove('show');
				nextEl.classList.remove('show');
			}


		})
	});

}
// end if innerWidth
});
// DOMContentLoaded  end

$(document).ready(function() {
    $('.selectpicker').multiselect({
        templates: {
            button: '<div type="button" class="multiselect dropdown-toggle form-control" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></div>',
        },
        buttonText: function(options, select) {
            if (options.length === 0) {
                return 'Keine ausgewählt';
            }
            else if (options.length > 3) {
                return options.length + ' ausgewählt';
            }
            else {
                var labels = [];
                options.each(function() {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    }
                    else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        }
    });
    if ($("input[name='ap']").val() == "") {
      $("#apinput").hide();
    }
    if ($("select[name='products[]']").val() == "") {
      $("#productsinput").hide();
    }
});




var swiper = new Swiper(".customersSwiper", {
        slidesPerView: 1,
        allowTouchMove: false,
        loop: true,
        spaceBetween: 30,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        autoplay: {
    		delay: 5000,
  		},
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
      });

// verkaufserden model slider

 var swiper = new Swiper(".verkaufserdenModalSwiper", {
 		autoplay: {
    		delay: 5000,
  		},
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });


$("#mobtoggle").click(function() {
  $(this).toggleClass("on");
  //$("#menu").slideToggle();
});




/*Script functionality*/
$(document).ready(function(){


    var map = $('#world-map').vectorMap({map: 'continents_mill',backgroundColor: 'transparent',
        onRegionClick:function(event, code){
            $('.nav-tabs li').removeClass('active');
            if(code === 'NA') {
                $('#Northamerica-tab').tab('show');
            }
            if(code === 'SA') {
                $('#Southamerica-tab').tab('show');
            }
            if(code === 'AF') {
                $('#Africa-tab').tab('show');
            }
            if(code === 'EU') {
                $('#Europe-tab').tab('show');
            }
            if(code === 'AS') {
                $('#Asia-tab').tab('show');
            }
        },
        regionStyle: {
            selected: {
                fill: '#F29F05'
            }
        },
        series: {
            regions: [{
                values: {
                    'SA': '#013A25',
                    'EU': '#013A25',
                    'NA': '#013A25',
                    'AS': '#013A25',
                    'AF': '#013A25',
                    'OC': '#013A25'
                },
                attribute: 'fill',
                hover: {
                    "fill-opacity": 0.8,
                    cursor: 'pointer',
                },
                selected: {
                    fill: 'yellow'
                },
                selectedHover: {
                    fill: 'black'
                }
            }]
        }});



    //close sub menu
    $('.clickcountry').on('click',function(){
        var cssClass = $(this).data('show');
        $('.country-' + cssClass).toggleClass('d-none');
        $('.start-' + cssClass).toggleClass('d-none');
    });

    $('.closecountry').on('click',function(){
        var cssClass = $(this).data('show');
        $('.' + cssClass).toggleClass('d-none');
    });

    $('.languagepicker-footer').on('change', function () {
        console.log($('.languagepicker-footer').val());
        return;
        window.location.href = $('.languagepicker-footer').val();
    });

  //GLOBALS
  var nav_menu = $('.nav-menu');

  //main menu toggle
  $('.nav-menu-toggle').on('click',function(){
    nav_menu.toggleClass('active');
    calculate_main_menu_height();
  });

   //sub menu toggle
   $('.sub-menu-toggle').on('click',function(){
     var sub_menu =  $(this).siblings('.sub-menu');
     sub_menu.toggleClass('active');
     set_sub_menu_toggles();
     set_sub_menu_height();
  });

  //calculates the overall height of the nav menu
  function calculate_main_menu_height(){
    var menu_height = 0;
    if(nav_menu.hasClass('active')){
      var menu_items = nav_menu.children('li');
      $.each(menu_items, function(){
        menu_height += $(this).outerHeight();
      })
    }

    nav_menu.css('height',menu_height);
  }


  //sets all sub-menus to be as long as the main nav menu
 function set_sub_menu_height(){
   var menu_height = nav_menu.outerHeight();
   var sub_menus = $('.sub-menu');
   $.each(sub_menus, function(){
     $(this).outerHeight(menu_height);
   });
 }


  //close sub menu
  $('.close').on('click',function(){
    $(this).parent('.sub-menu').toggleClass('active');
  });



  //SUB MENU TOGGLE HEIGHT
  //set the height of the sub-menu toggle perfectly
  function set_sub_menu_toggles() {
    var sub_menu_toggles = $('.sub-menu-toggle');
    $.each(sub_menu_toggles, function() {
      $(this).outerHeight($(this).siblings('a').outerHeight());
      $(this).css('line-height', $(this).siblings('a').outerHeight() + 'px');
      //change the class of the toggle (if menu is active or not)
      if($(this).siblings('.sub-menu').hasClass('active')){
       // $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
        $(this).addClass('flip');
      }else{
       // $(this).removeClass('fa-angle-up').addClass('fa-angle-down');
        $(this).removeClass('flip');
      }
    });
  }
  set_sub_menu_toggles();

  });

// sticky header

document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
      if(document.getElementById('main-menu')) {
          if (window.scrollY > 100) {
              document.getElementById('main-menu').classList.add('fixed-top');
              // add padding top to show content behind navbar
              navbar_height = document.querySelector('.navbar').offsetHeight;
              document.body.style.paddingTop = navbar_height + 'px';
          } else {
              document.getElementById('main-menu').classList.remove('fixed-top');
              // remove padding top from body
              document.body.style.paddingTop = '0';
          }
      }
  });
});
// DOMContentLoaded  end


// image-map
// $(document).ready(function(){

//     // set the image-map width and height to match the img size
//     $('#image-map').css({'width':$('#image-map img').width(),
//                       'height':$('#image-map img').height()
//     })

//     //tooltip direction
//     var tooltipDirection;
//     var stylec = '';

//     for (i=0; i<$(".pin").length; i++)
//     {
//     // alert(i);
//         // set tooltip direction type - up or down
//         if ($(".pin").eq(i).hasClass('pin-down')) {
//             tooltipDirection = 'tooltip-down';
//         } else {
//             tooltipDirection = 'tooltip-up';
//             }
//     	var map = $(".pin").eq(i).data('map');

//     	if(map == 'green' && tooltipDirection == 'tooltip-down'){
//     		stylec = "green";
//     	}else if(map == 'blue' && tooltipDirection == 'tooltip-down'){
//     		stylec = "blue";
//     	}
//     	else if(map == 'red' && tooltipDirection == 'tooltip-down'){
//     		stylec = "red";
//     	}
//     	else{
//     		stylec = "red";
//     	}
//         // append the tooltip
//         $("#image-map").append("<div style='left:"+$(".pin").eq(i).data('xpos')+"px;top:"+$(".pin").eq(i).data('ypos')+"px;background:"+stylec+"' class='" + tooltipDirection +"'>\
//                                             <div class='tooltip'>" + $(".pin").eq(i).html() + "</div>\
//                                     </div>");
//     }

//     // show/hide the tooltip
//     $('.tooltip-up, .tooltip-down').mouseenter(function(){
//                 $(this).children('.tooltip').fadeIn(100);
//             }).mouseleave(function(){
//                 $(this).children('.tooltip').fadeOut(100);
//             })
// });

// image-map




// $("#show").click(function(){
//     $(".substrate-flite-mob-section").show();
//   });

$("#substrate-flite-show").click(function(){
    $(".substrate-flite-mob-section").show();
});
$(".flite-mob-head-angle").click(function(){
    $(".substrate-flite-mob-section").hide();
  });


// contact filter start

$('.filters-contact ul li').click(function(){
  $('.filters-contact ul li').removeClass('active');
  $(this).addClass('active');

  var data = $(this).attr('data-filter');
  $grid.isotope({
    filter: data
  })
});

var $grid = $(".grid").isotope({
  itemSelector: ".all",
  percentPosition: true,
  masonry: {
    columnWidth: ".all"
  }
})


// $(window).load(function(){

// })

// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});

// contact filter End



$(document).ready(function(){
  // $(".dropdown-toggle").click(function(){
  // 	$(".potsize-dropdown-box").toggle();
  // });
   $(".potsize-toggle").click(function(){
    $(".potsize-dropdown-box").toggle();
    $(".culture-dropdown-box").hide();
    return false;
  });

   $(".culture-toggle").click(function(){
    $(".culture-dropdown-box").toggle();
    $(".potsize-dropdown-box").hide();
    return false;
  });

});


// $(document).ready(function(){
//   $("button").click(function(){
//     $("p").toggle();
//   });
// });



// rohstoffe slider

var swiper = new Swiper(".rohstoffe-swiper", {
  // Optional parameters
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 30,
  autoplay: {
    		delay: 5000,
  		},
  breakpoints: {
    // when window width is >= 320px
    300: {
      slidesPerView: 1.5
    },
    // when window width is >= 480px
    600: {
      slidesPerView: 2.5
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3.2
    },
    1200: {
      slidesPerView: 3.2
    }
  }
});

// Member modal
$('.member-popup').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
});
$(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});
