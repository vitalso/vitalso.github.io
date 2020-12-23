jQuery(document).ready(checkContainer);

function checkContainer () {
  if($('.random-section').is(':visible')){ //if the container is visible on the page
    $('.loading-data > li').each(function (i, element) {
        setTimeout(function () {
            $(element).addClass('loading');
        }, i * 1500);
    })
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}

$(function () {

    $('.loading-data > li').each(function (i, element) {
        setTimeout(function () {
            $(element).addClass('loading');
        }, i * 2000);
    })


  // Toogle class button menu
  $('.menu').on('click' , function(){
    $(this).toggleClass('open');
    $('.mobile-nav').toggleClass('open');
  });

  // Popup
  $('.whatsapp-header , .btn-grey').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
  });

  // Play video
  $('.play-video').on('click', function(e) {

    $("#video")[0].src += "&autoplay=1";
    $(this).hide();
    $('#video').show();
    e.preventDefault();

  });

});

// Vue script
var app = new Vue({
  el: '#app',
  data: {
    step: 1,
    checked: 0,
    load: false,
    vorname: '',
    nachname: '',
    email: '',
    phone: '',
    currentWidth: 5,
    secondMethod: '',
    otherMethod: '',
    versicherung: '',
    schaft: '',
    nummer: '',
    snehmer: ''
    /*
    load: 0,
    message: '',
    status: 'Start'*/
  },

  mounted() {

  },

  methods: {
    prev() {
      if (this.secondMethod == 'done') {
        this.step = 10;
        this.secondMethod = '';
      } else if (this.step == 12) {
        this.step = 10;
      } else {
        this.step--;
        this.checked++;
      }
    },
    showLoading() {
      this.load = true;
    },
    next() {
      if (this.step == 9) {
        setTimeout(() => { this.step = 11 }, 7000)
      }
      setTimeout(
        () =>  {
          if (this.secondMethod == 'Hochladen (Per Foto oder Upload)') {
            this.step = 13;
            this.secondMethod = '';
          } else if (this.secondMethod == 'Per Whats übersenden') {
            this.step = 18;
            this.secondMethod = '';
          } else if (this.secondMethod == 'Keine Unterlagen vorhanden') {
            this.step = 19;
            this.secondMethod = '';
          } else {
            this.step++;
          }
          this.checked = 0;
          this.phone = '';
          this.snehmer = '';
          this.currentWidth = 100 / 10 * this.step; // 10 - it's count of question in form

          this.load = false } , 0);
    }
  }

})
