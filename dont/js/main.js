//var logEl = document.querySelector('.smile-1');
//var logEl = document.getElementsByClassName('smile-left');

// Add scrollmagic controller
var controller = new ScrollMagic.Controller();

/*anime({
    targets: '.smiles-left .smile',
    rotate: function() { return anime.random(-360,360); },
});*/

// Smile bubble animation
var timeline1 = anime.timeline({
    autoplay: false,
    easing: 'linear',
    direction: 'alternate',
});

timeline1
.add({
    targets: '.fadeUpOut',
    translateY: [0, -1000],
    opacity: [1 , 0],
    duration: 500,
}, 0)
.add({
    targets: '.smiles-left .smile-1',
    translateX: [0, -1000],
    opacity: [1 , 0],
    rotate: {
        value: -360,
        duration: 800,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-left .smile-2',
    translateX: [0, -1000],
    opacity: [1 , 0],
    rotate: {
        value: [-35 , -360],
        duration: 700,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-left .smile-3',
    translateX: [0, -1000],
    opacity: [1 , 0],
    rotate: {
        value: [65 , -360],
        duration: 700,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-left .smile-4',
    translateX: [0, -1000],
    opacity: [1 , 0],
    rotate: {
        value: [-115 , -360],
        duration: 700,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-left .smile-5',
    translateX: [0, -1000],
    opacity: [1 , 0],
    rotate: {
        value: -360,
        duration: 700,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-right .smile-1',
    translateX: [0, 1000],
    opacity: [1 , 0],
    rotate: {
        value: 360,
        duration: 800,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-right .smile-2',
    translateX: [0, 1000],
    opacity: [1 , 0],
    rotate: {
        value: [-35 , 360],
        duration: 800,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-right .smile-3',
    translateX: [0, 1000],
    opacity: [1 , 0],
    rotate: {
        value: 360,
        duration: 800,
        easing: 'easeInOutSine'
    }
}, 0)
.add({
    targets: '.smiles-right .smile-4',
    translateX: [0, 1000],
    opacity: [1 , 0],
    rotate: {
        value: [-105 , 360],
        duration: 800,
        easing: 'easeInOutSine'
    }
}, 0)

var scene1 = new ScrollMagic.Scene({
    triggerElement: ".one",
    offset: -400,
    duration: 1000
})
/*.on("enter", function (event) {
    tl1.play();
})*/
.on("progress", function (event) {
    timeline1.seek(timeline1.duration * event.progress);
})
.addTo(controller);

// Description section animation
//var topPosition = document.querySelector('.dayli-section').offsetTop;
var timeline2 = anime.timeline({
    autoplay: false,
    easing: 'linear',
    direction: 'alternate',
    opacity: [1 , 0]
});

timeline2
.add({
    targets: '#section-description .section-title',
    keyframes: [
        {translateY: 0 },
        {translateY: -500 , delay: 200},
        {translateY: -500},
    ],
    opacity: [
        { value: 1 , delay: 100 },
        { value: 0 },
    ],
    duration: 1000,
}, 0)
.add({
    targets: '#section-description .section-text',
    translateY: [150, -1000],
    opacity: [
        { value: 1 , delay: 100 },
        { value: 0 },
    ],
    duration: 1000,
}, 0)

var scene2 = new ScrollMagic.Scene({
    triggerElement: "#section-description",
    offset: 400,
    duration: 500
})
.on("progress", function (event) {
    timeline2.seek(timeline2.duration * event.progress);

    // Toggle class for active text
    if ( event.progress >= 0.150 && event.progress <= 0.300 ) {
        document.querySelector('.section-text .text-lg:nth-child(1)').classList.add('opacity-30');
        document.querySelector('.section-text .text-lg:nth-child(2)').classList.remove('opacity-30');
    } else if (event.progress >= 0.300) {
        document.querySelector('.section-text .text-lg:nth-child(2)').classList.add('opacity-30');
        document.querySelector('.section-text .text-lg:nth-child(3)').classList.remove('opacity-30');
    } else {
        document.querySelector('.section-text .text-lg:nth-child(1)').classList.remove('opacity-30');
        document.querySelector('.section-text .text-lg:nth-child(2)').classList.add('opacity-30');
        document.querySelector('.section-text .text-lg:nth-child(3)').classList.add('opacity-30');
    }
})
.setPin("#section-description .section-title")
.addTo(controller);

// Circle animation
var timeline3 = anime.timeline({
    autoplay: false,
    easing: 'linear',
    direction: 'alternate',
    duration: 700,
});

timeline3
.add({
    targets: '.dayli-item.item-1',
    rotate: {
        value: [0 , 14],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [700, 70]
}, 300)
.add({
    targets: '.dayli-item.item-2',
    rotate: {
        value: [0 , -14],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [700, -10]
}, 0)
.add({
    targets: '.dayli-item.item-3',
    rotate: {
        value: [0 , -6],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [700, 70]
}, 600)
.add({
    targets: '.dayli-item.item-4',
    rotate: {
        value: [0 , 14],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [400, -50],
    translateX: [0, -70]
}, 900)
.add({
    targets: '.dayli-item.item-5',
    rotate: {
        value: [0 , -14],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [400, 0],
    translateX: [0, 100]
}, 1200)
.add({
    targets: '.dayli-item.item-6',
    rotate: {
        value: [0 , -6],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [400, 0],
    translateX: [0, 150]
}, 1500)
.add({
    targets: '.dayli-item.item-7',
    rotate: {
        value: [0 , 14],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [400, -150],
    translateX: [0, 250]
}, 1800)
.add({
    targets: '.dayli-item.item-8',
    rotate: {
        value: [0 , -14],
        duration: 800,
        easing: 'easeInOutSine'
    },
    translateY: [400, -120],
    translateX: [0, '-425%']
}, 2100)

var scene3 = new ScrollMagic.Scene({
    triggerElement: ".dayli-section",
    offset: 400,
    duration: 700,
})
.on("progress", function (event) {
    timeline3.seek(timeline3.duration * event.progress);
})
.setPin(".dayli-section")
.addTo(controller);