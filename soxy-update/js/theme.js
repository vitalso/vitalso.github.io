//
// variations.scss
//
'use strict';

(function () {
  var $toggle = $('[data-toggle="card-collapse"]');
  var $collapse = $('.card-collapse');
  $toggle.on({
    'mouseenter': function mouseenter() {
      var $this = $(this);
      var $collapse = $this.find('.card-collapse');
      $collapse.collapse('show');
    },
    'mouseleave': function mouseleave() {
      var $this = $(this);
      var $collapse = $this.find('.card-collapse');
      var isCollapsing = $collapse.hasClass('collapsing');

      if (isCollapsing) {
        setTimeout(function () {
          $collapse.collapse('hide');
        }, 350);
      } else {
        $collapse.collapse('hide');
      }
    }
  });
  $collapse.on({
    'show.bs.collapse': function showBsCollapse() {
      var $this = $(this);
      var $parent = $this.closest('.card-collapse-parent');
      var collapseHeight = $this.outerHeight(true);
      $parent.css({
        '-webkit-transform': 'translateY(-' + collapseHeight + 'px)',
        'transform': 'translateY(-' + collapseHeight + 'px)'
      });
    },
    'hide.bs.collapse': function hideBsCollapse() {
      var $this = $(this);
      var $parent = $this.closest('.card-collapse-parent');
      $parent.css({
        '-webkit-transform': '',
        'transform': ''
      });
    }
  });
})(); //
// collapse.js
//


'use strict';

(function () {
  var $toggle = $('[data-toggle="collapse"][data-action]');
  $toggle.on('click', function (e) {
    e.stopPropagation();
    var $this = $(this);
    var action = $this.data('action');
    var target = $this.data('target');
    var $target = $(target);
    $target.collapse(action);
  });
})(); //
// counter.js
//


'use strict';

(function () {
  var countdown = document.querySelectorAll('[data-countdown]');

  function count(countDownDate, el) {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    days = days < 10 ? '0' + days : days;
    var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = Math.floor(distance % (1000 * 60) / 1000);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    el.querySelector('[data-days]').innerHTML = days;
    el.querySelector('[data-hours]').innerHTML = hours;
    el.querySelector('[data-minutes]').innerHTML = minutes;
    el.querySelector('[data-seconds]').innerHTML = seconds;
  }

  function init(el) {
    var date = el.dataset.date;
    var countDownDate = new Date(date).getTime();
    count(countDownDate, el);
    setInterval(function () {
      count(countDownDate, el);
    }, 1000);
  }

  if (countdown.length) {
    [].forEach.call(countdown, function (el) {
      init(el);
    });
  }
})(); //
// dropdown.scss
//


'use strict';

(function () {
  var $dropright = $('.dropright');
  var $dropdownMenu = $('.dropdown-menu');
  var $collapseToggle = $('[data-toggle="collapse"]');
  var $navbarCollapse = $('.navbar-collapse');
  var $navbarDropdown = $('.navbar .dropdown');
  var $navbarSmoothToggle = $('.navbar .nav-link[data-toggle="smooth-scroll"]');
  var $navbarDroprightToggle = $('.navbar .dropdown-menu .dropright [data-toggle="dropdown"]');
  $navbarDroprightToggle.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    var $currentMenu = $this.closest($dropright).find($dropdownMenu);
    var $siblingMenus = $this.closest($dropdownMenu).find($dropdownMenu).not($currentMenu);
    $currentMenu.toggleClass('show');
    $siblingMenus.removeClass('show');
  });
  $navbarDropdown.on('hide.bs.dropdown', function () {
    var $this = $(this);
    var $droprightMenus = $this.find($dropright).find($dropdownMenu);
    var $collapseToggles = $this.find($collapseToggle);
    $droprightMenus.removeClass('show');
    $collapseToggles.each(function () {
      var $this = $(this);
      var $collapse = $($this.attr('href')) || $($this.data('target'));
      $collapse.collapse('hide');
    });
  });
  $navbarSmoothToggle.on('click', function (e) {
    var $this = $(this);
    var $collapse = $this.closest($navbarCollapse);
    $collapse.collapse('hide');
  });
})();
/* global Flickity */
//
// flickity.js
//


'use strict';

(function () {
  // Flickity defaults
  Flickity.defaults.pageDots = false;
  Flickity.defaults.prevNextButtons = false;
  Flickity.defaults.imagesLoaded = true;
  Flickity.defaults.initialIndex = 0;
  Flickity.defaults.wrapAround = true;
  Flickity.defaults.cellAlign = 'left'; // Toggle

  var $toggle = $('[data-toggle="flickity"]');
  $toggle.on('click', function () {
    var $this = $(this);
    var slide = $this.data('slide');
    var target = $this.data('target');
    var $target = $(target);
    $target.flickity('select', slide, true, true);
  });
})(); // iOS temporary fix fix


(function () {
  var touchingCarousel = false,
      touchStartCoords;
  document.body.addEventListener('touchstart', function (e) {
    if (e.target.closest('.flickity-slider')) {
      touchingCarousel = true;
    } else {
      touchingCarousel = false;
      return;
    }

    touchStartCoords = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  });
  document.body.addEventListener('touchmove', function (e) {
    if (!(touchingCarousel && e.cancelable)) {
      return;
    }

    var moveVector = {
      x: e.touches[0].pageX - touchStartCoords.x,
      y: e.touches[0].pageY - touchStartCoords.y
    };
    if (Math.abs(moveVector.x) > 7) e.preventDefault();
  }, {
    passive: false
  });
})(); //
// form.js
//


'use strict';

(function () {
  var toggle = document.querySelectorAll('[data-toggle="form-caption"]');
  [].forEach.call(toggle, function (el) {
    el.addEventListener('change', function () {
      var target = document.querySelector(el.dataset.target);
      var value = el.value;
      target.innerHTML = value;
    });
  });
})();
/* global hljs */
//
// highlight.js
//


'use strict';

(function () {
  var toggle = document.querySelectorAll('.highlight');

  if (typeof hljs !== 'undefined' && toggle) {
    [].forEach.call(toggle, function (el) {
      hljs.highlightBlock(el);
    });
  }
})(); //
// img-comp.js
//


'use strict';

(function () {
  var input = document.querySelectorAll('.img-comp-input');

  function comp(el) {
    var front = el.parentElement.querySelector('.img-comp-front');
    var handle = el.parentElement.querySelector('.img-comp-handle');
    front.style.maxWidth = el.value + '%';
    handle.style.left = el.value + '%';
  }

  [].forEach.call(input, function (el) {
    'input change'.split(' ').forEach(function (event) {
      el.addEventListener(event, function () {
        comp(el);
      });
    });
  });
})();
/* global List */
//
// list.js
//


'use strict';

(function () {
  var $toggle = $('[data-toggle="lists"]');
  $toggle.each(function () {
    var $this = $(this);
    var options = $this.data('options');

    if (typeof List !== 'undefined') {
      new List($this.get(0), options);
    }
  });
})();
/* global google */
//
// map.js
// Theme module
//


'use strict';

(function () {
  var maps = document.querySelectorAll('[data-toggle="map"]');

  if (maps) {
    [].forEach.call(maps, function (el) {
      // Get map data
      var zoom = parseInt(el.getAttribute('data-zoom'));
      var markers = JSON.parse(el.getAttribute('data-markers'));
      var center = {
        lat: markers[0].position[0],
        lng: markers[0].position[1]
      }; // Init map

      var map = new google.maps.Map(el, {
        center: center,
        zoom: zoom,
        disableDefaultUI: true
      }); // Get bounds

      var bounds = new google.maps.LatLngBounds(); // Create markers

      markers.forEach(function (item, i) {
        var position = {
          lat: item.position[0],
          lng: item.position[1]
        };
        var infowindow = new google.maps.InfoWindow({
          content: item.info
        });
        var marker = new google.maps.Marker({
          position: position,
          map: map
        });
        marker.addListener('click', function () {
          infowindow.open(map, marker);
        }); // Extend bounds

        bounds.extend(position);
      }); // Fit markers into bounds

      if (!zoom) {
        map.fitBounds(bounds);
      }
    });
  }
})(); //
// navbar.js
//


'use strict';

(function () {
  var $navbarCollapse = $('.navbar-collapse');
  var $navbarDropdown = $('.navbar-nav .dropdown, .navbar-nav .dropright');
  $navbarDropdown.on('mouseenter mouseleave', function (e) {
    if (!$navbarCollapse.hasClass('show')) {
      var $this = $(this);
      var $toggle = $this.find('[data-toggle="dropdown"]');

      if (e.type === 'mouseenter') {
        $this.addClass('hovered');
        $toggle.dropdown('show');
      } else {
        $toggle.dropdown('hide');
        $toggle.blur();
      }
    }
  });
})(); //
// popover.js
//


'use strict';

$(function () {
  $('[data-toggle="popover"]').popover();
}); //
// rating.js
//

'use strict';

(function () {
  var $rating = $('.rating');
  var $ratingForm = $('.rating-form');
  var $ratingInput = $('.rating-input');
  $ratingInput.on('change input', function () {
    var $this = $(this);
    var $ratingCurrent = $this.closest($ratingForm).find($rating);
    var value = $this.val();
    $ratingCurrent.attr('data-value', value);
  });
})();
/* global SimpleBar */
//
// simplebar.js
//


'use strict';

(function () {
  var $toggle = $('.collapse[data-toggle="simplebar"]');
  $toggle.on({
    'shown.bs.collapse': function shownBsCollapse() {
      var $this = $(this);
      var $target = $($this.data('target'));

      if (typeof SimpleBar !== 'undefined') {
        new SimpleBar($target.get(0));
      }
    },
    'hidden.bs.collapse': function hiddenBsCollapse() {
      var $this = $(this);
      var $target = $($this.data('target'));

      if (typeof SimpleBar !== 'undefined') {
        SimpleBar.instances.get($target.get(0)).unMount();
      }
    }
  });
  var $toggleShown = $('.collapse.show[data-toggle="simplebar"]');
  $toggleShown.each(function () {
    var $this = $(this);
    var $target = $($this.data('target'));

    if (typeof SimpleBar !== 'undefined') {
      new SimpleBar($target.get(0));
    }
  });
})();
/* global SmoothScroll */
//
// smooth-scroll.js
//


'use strict';

(function () {
  var toggle = '[data-toggle="smooth-scroll"]';
  var _offset = 0;

  function init(toggle) {
    var options = {
      header: '.navbar.fixed-top',
      offset: function offset(anchor, toggle) {
        return toggle.dataset.offset ? toggle.dataset.offset : _offset;
      }
    };
    new SmoothScroll(toggle, options);
  }

  if (typeof SmoothScroll !== 'undefined' && toggle) {
    init(toggle);
  }
})(); //
// theme.js
// Theme JavaScript
//


'use strict'; //
// tooltip.js
//


'use strict';

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
}); //
// vote.js
//

'use strict';

(function () {
  var $toggle = $('[data-toggle="vote"]');
  $toggle.on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var count = $this.attr('data-count');
    $this.attr('data-count', ++count);
  });
})();


