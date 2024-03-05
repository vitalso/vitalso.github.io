// Add scrollmagic controller
var controller = new ScrollMagic.Controller();

// Contact
var timeline7 = anime.timeline({
    autoplay: false,
    easing: 'linear',
    direction: 'alternate',
    duration: 1000,
    reverse: false,
    loop: false
});

timeline7
.add({
    targets: '.contact',
    keyframes: [
        { opacity: 0 },
        { opacity: 0.3 },
        { opacity: 0.5 },
        { opacity: 1 },
    ],
}, 0)

var scene7 = new ScrollMagic.Scene({
    triggerElement: ".photo-owners",
    offset: -300,
    duration: 1400,
})
.on("progress", function (event) {
    timeline7.seek(timeline7.duration * event.progress);
})
.addTo(controller);

// Contact
var timeline8 = anime.timeline({
    autoplay: false,
    easing: 'linear',
    direction: 'alternate',
    duration: 1000,
    reverse: false,
    loop: false
});

timeline8
.add({
    targets: '.photo-owners',
    scale: 0.94,
    borderRadius: 30
}, 0)

var scene8 = new ScrollMagic.Scene({
    triggerElement: "footer",
    offset: -800,
    duration: 500,
})
.on("progress", function (event) {
    timeline8.seek(timeline8.duration * event.progress);
})
.addTo(controller);

// Turn of on mobile
let myMediaQuery = window.matchMedia('(min-width: 992px)');

function widthChangeCallback(myMediaQuery) {
  if(myMediaQuery.matches) {

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
        duration: 3000
    })
    .on("progress", function (event) {
        timeline1.seek(timeline1.duration * event.progress);
    })
    .addTo(controller);

    // Description section animation
    var timeline2 = anime.timeline({
        autoplay: false,
        easing: 'linear',
        direction: 'alternate',
    });

    timeline2
    .add({
        targets: '#section-description .section-title',
        keyframes: [
            {translateY: -150 },
            {translateY: -150 },
            {translateY: -150 },
            {translateY: -700 , opacity: 0},
        ],
    }, 0)
    .add({
        targets: '#section-description .section-text',
        keyframes: [
            { translateY: -200 , delay: 150 },
            { translateY: -600 },
            { translateY: -1100 },
            { translateY: -1600 , opacity: 0 },
        ],
    }, 0)

    var scene2 = new ScrollMagic.Scene({
        triggerElement: "#section-description",
        offset: 405,
        duration: 2000
    })
    .on("progress", function (event) {
        timeline2.seek(timeline2.duration * event.progress);

        // Toggle class for active text
        if ( event.progress >= 0.250 && event.progress <= 0.600 ) {
            document.querySelector('.section-text .text-lg:nth-child(1)').classList.add('opacity-30');
            document.querySelector('.section-text .text-lg:nth-child(2)').classList.remove('opacity-30');
        } else if (event.progress >= 0.600) {
            document.querySelector('.section-text .text-lg:nth-child(2)').classList.add('opacity-30');
            document.querySelector('.section-text .text-lg:nth-child(3)').classList.remove('opacity-30');
        } else {
            document.querySelector('.section-text .text-lg:nth-child(1)').classList.remove('opacity-30');
            document.querySelector('.section-text .text-lg:nth-child(2)').classList.add('opacity-30');
            document.querySelector('.section-text .text-lg:nth-child(3)').classList.add('opacity-30');
        }
    })
    .setPin("#section-description")
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
        translateY: [900, 70]
    }, 300)
    .add({
        targets: '.dayli-item.item-2',
        rotate: {
            value: [0 , -14],
            duration: 800,
            easing: 'easeInOutSine'
        },
        translateY: [900, -10]
    }, 0)
    .add({
        targets: '.dayli-item.item-3',
        rotate: {
            value: [0 , -6],
            duration: 800,
            easing: 'easeInOutSine'
        },
        translateY: [900, 70]
    }, 600)
    .add({
        targets: '.dayli-item.item-4',
        rotate: {
            value: [0 , 14],
            duration: 800,
            easing: 'easeInOutSine'
        },
        translateY: [600, -60],
        translateX: [0, -70]
    }, 900)
    .add({
        targets: '.dayli-item.item-5',
        rotate: {
            value: [0 , -14],
            duration: 800,
            easing: 'easeInOutSine'
        },
        translateY: [600, -10],
        translateX: [0, 100]
    }, 1200)
    .add({
        targets: '.dayli-item.item-6',
        rotate: {
            value: [0 , -6],
            duration: 800,
            easing: 'easeInOutSine'
        },
        translateY: [600, 0],
        translateX: [0, 150]
    }, 1500)
    .add({
        targets: '.dayli-item.item-7',
        rotate: {
            value: [0 , 14],
            duration: 800,
            easing: 'easeInOutSine'
        },
        translateY: [600, -150],
        translateX: [0, 250]
    }, 1800)
    .add({
        targets: '.dayli-item.item-8',
        rotate: {
            value: [0 , -14],
            duration: 800,
            easing: 'easeInOutSine'
        },
        translateY: [600, -140],
        translateX: [0, '-420%']
    }, 2100)

    var scene3 = new ScrollMagic.Scene({
        triggerElement: ".dayli-section",
        offset: 350,
        duration: 2000,
    })
    .on("progress", function (event) {
        timeline3.seek(timeline3.duration * event.progress);
    })
    .setPin(".dayli-section")
    .addTo(controller);

    // Card animation
    var timeline4 = anime.timeline({
        autoplay: false,
        easing: 'linear',
        direction: 'alternate',
        duration: 1000,
    });

    timeline4
    .add({
        targets: '.card-section .card-1',
        keyframes: [
            {translateX: -300 , translateY: -30 , rotate: -4 },
            {translateX: -500 , translateY: -60 , rotate: -8 },
            {translateX: -1050 , translateY: -90 , rotate: -12 },
            {translateX: -1740 , rotate: -6 },
            {translateX: -2600 , rotate: -3 , delay: 200 },
            {translateX: -3000 , rotate: 0 },
        ],
    }, 0)
    .add({
        targets: '.card-section .card-2',
        keyframes: [
            {translateX: -150 , translateY: -30 , rotate: -1 },
            {translateX: -550 , translateY: -20 , rotate: -3 },
            {translateX: -1150 , translateY: -40 , rotate: -5 },
            {translateX: -1840 , rotate: -3 },
            {translateX: -2800 , rotate: -1 , delay: 200 },
            {translateX: -3400 , rotate: 0 },
        ],
    }, 0)
    .add({
        targets: '.card-section .card-3',
        keyframes: [
            {translateX: -200 , translateY: -30 , rotate: -2 },
            {translateX: -600 , translateY: -60 , rotate: -5 },
            {translateX: -1250 , translateY: -90 , rotate: -8 },
            {translateX: -1940 , rotate: -3 },
            {translateX: -2900 , rotate: -1 , delay: 200 },
            {translateX: -3900 , rotate: 0 },
        ],
    }, 0)
    .add({
        targets: '.card-section .card-4',
        keyframes: [
            {translateX: -400 , translateY: -30 , rotate: 1 },
            {translateX: -900 , translateY: -20 , rotate: 3 },
            {translateX: -1550 , translateY: -40 , rotate: 5 },
            {translateX: -2040 , translateY: -60 , rotate: 4 },
            {translateX: -3000 , translateY: -90 , rotate: 3 , delay: 200 },
            {translateX: -4000 , rotate: 0 },
        ],
    }, 0)
    .add({
        targets: '.card-section .card-5',
        keyframes: [
            {translateX: -500 , translateY: -30 , rotate: -4 },
            {translateX: -1000 , translateY: -60 , rotate: -8 },
            {translateX: -1650 , translateY: -90 , rotate: -15 },
            {translateX: -2190 , translateY: -120 , rotate: -11 },
            {translateX: -3450 , translateY: -150 , rotate: -3 , delay: 200 },
            {translateX: -4500 , rotate: 0 },
        ],
    }, 0)

    var scene4 = new ScrollMagic.Scene({
        triggerElement: ".card-section",
        offset: 390,
        duration: 3000,
    })
    .on("progress", function (event) {
        timeline4.seek(timeline4.duration * event.progress);
    })
    .setPin(".card-section")
    .addTo(controller);

    // Cover animation
    var timeline5 = anime.timeline({
        autoplay: false,
        easing: 'linear',
        direction: 'alternate',
    });

    timeline5
    .add({
        targets: '.cover-section .card-section-cover',
        keyframes: [
            {scale: 0.5},
            {rotate: -90 },
            {delay: 500 , left: 1700},
        ]
    }, 0)
    .add({
        targets: '.cover-section .cover-note-blank',
        keyframes: [
            { width: '450px' },
            { scale: 0 , opacity: 0 },
            { duration: 1, delay: 400, scale: 1 , opacity: 1 , translateX: '-50%' },
            { delay: 1000 , duration: 1000, translateY: 160 , translateX: '-25%' , width: '3950px'},
            { delay: 300 , translateX: '-75%' },
            { delay: 1400 , translateX: '-95%' },
            { delay: 1000  , translateY: 0} ,
        ]
    }, 0)
    .add({
        targets: '.cover-section .cover-note-blank img:first-child',
        keyframes: [
            { height: '641px' },
            { height: '541px' },
        ]
    }, 1400)
    .add({
        targets: '.cover-section .cover-section-text-1',
        duration: 2000,
        keyframes: [
            { opacity: 0 },
            { opacity: 1 },
            { translateY: -100 , opacity: 0 },
        ]
    }, 1200)
    .add({
        targets: '.cover-section .cover-section-text-2',
        duration: 4000,
        keyframes: [
            { translateY: -30 },
            { opacity: 0 },
            { opacity: 1 },
            { translateY: -100 , opacity: 0 },
        ]
    }, 900)
    .add({
        targets: '.cover-section .quality-paper-image',
        duration: 1000,
        keyframes: [
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 },
        ]
    }, 3300)
    .add({
        targets: '.cover-section .cover-section-text-3',
        keyframes: [
            { translateY: -80 },
            { opacity: 0 },
            { opacity: 1 },
            { delay: 500 , opacity: 0 },
        ]
    }, 4300)
    .add({
        targets: '.cover-section .cover-note-blank img',
        opacity: 0,
        duration: 10,
    })
    .add({
        targets: '.cover-section .cover-note-blank img:last-child',
        opacity: 1,
        duration: 1,
        scale: 1.1,
        translateY: -30,
    })
    .add({
        targets: '.cover-section .notation-1',
        delay: 5400,
        keyframes: [
            { opacity: 0 },
            { translateY: 10 , opacity: 1 },
        ]
    }, 0)

    .add({
        targets: '.cover-section .notation-2',
        delay: 5800,
        keyframes: [
            { opacity: 0 },
            { translateY: 10 , opacity: 1 },
        ]
    }, 0)

    .add({
        targets: '.cover-section .note-blank-btn',
        delay: 5900,
        keyframes: [
            { opacity: 0 },
            { translateY: 10 , opacity: 1 },
        ]
    }, 0)

    var scene5 = new ScrollMagic.Scene({
        triggerElement: ".cover-section",
        offset: 350,
        duration: 7000,
    })
    .on("progress", function (event) {
        timeline5.seek(timeline5.duration * event.progress);
    })
    .setPin(".cover-section")
    .addTo(controller);

    // Note for
    var timeline6 = anime.timeline({
        autoplay: false,
        easing: 'linear',
        direction: 'alternate',
        duration: 1000,
    });

    timeline6
    .add({
        targets: '.note-for .note-for-text',
        translateY: -100,
        duration: 100,
    }, 100)
    .add({
        targets: '.note-for .note-text-1',
        translateY: [100 , 0],
        opacity: [0 , 1],
        duration: 50,
    }, 100)
    .add({
        targets: '.note-for .note-text-2',
        translateY: [100 , 0],
        opacity: [0 , 1],
        duration: 50,
    }, 200)
    .add({
        targets: '.note-for .note-for-cover',
        translateY: -100,
        duration: 100,
    }, 100)
    .add({
        targets: '.note-for .note-for-cover',
        translateY: -200,
        duration: 100,
    }, 200)
    .add({
        targets: '.note-for .note-vertical-line',
        height: '100%',
        duration: 100,
    }, 200)
    .add({
        targets: '.note-for .note-text-1',
        opacity: [1 , 0],
        duration: 1,
    }, 200)
    .add({
        targets: '.note-for .note-text-2',
        opacity: [1 , 0],
        duration: 1,
    }, 300)
    .add({
        targets: '.note-for .note-text-3',
        translateY: [100 , 0],
        opacity: [0 , 1],
        duration: 50,
    }, 300)

    .add({
        targets: '.note-for .note-for-cover',
        translateY: -250,
        duration: 100,
    }, 300)
    .add({
        targets: '.note-for .note-horizontal-line',
        width: '100%',
        duration: 100,
    }, 300)
    .add({
        targets: '.note-for .note-line',
        opacity: [0 , 1],
        duration: 1,
    }, 400)

    var scene6 = new ScrollMagic.Scene({
        triggerElement: ".note-for",
        offset: 384,
        duration: 4000,
    })
    .on("progress", function (event) {
        timeline6.seek(timeline6.duration * event.progress);
    })
    .setPin(".note-for")
    .addTo(controller);

    //console.log('wide');
   } else {

        // Card animation
        var timeline4 = anime.timeline({
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
            duration: 1000,
        });

        timeline4
        .add({
            targets: '.card-section .card-1',
            translateY: -30,
        }, 0)
        .add({
            targets: '.card-section .card-2',
            translateY: -320,
        }, 0)
        .add({
            targets: '.card-section .card-3',
            translateY: -610,
        }, 0)
        .add({
            targets: '.card-section .card-4',
            translateY: -900,
        }, 0)
        .add({
            targets: '.card-section .card-5',
            translateY: -1180,
        }, 0)

        var scene4 = new ScrollMagic.Scene({
            triggerElement: ".card-section",
            offset: 390,
            duration: 1000,
        })
        .on("progress", function (event) {
            timeline4.seek(timeline4.duration * event.progress);
        })
        .setPin(".card-section")
        .addTo(controller);

        // Cover animation
        var timeline5 = anime.timeline({
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
        });

        timeline5
        .add({
            targets: '.cover-section .card-section-cover',
            keyframes: [
                {delay: 500 , left: 1400},
            ]
        }, 0)
        .add({
            targets: '.cover-section .cover-note-blank',
            keyframes: [
                { width: '450px' },
                { scale: 0 , opacity: 0 },
                { duration: 1, delay: 100, scale: 1 , opacity: 1 , translateX: '-50%' },
                { delay: 1000 , duration: 1000, translateY: 150 , translateX: '-25%' , width: '3950px'},
                { delay: 300 , translateX: '-75%' },
                { delay: 1400 , translateX: '-95%' },
                { delay: 1000  , translateY: 0} ,
            ]
        }, 0)
        .add({
            targets: '.cover-section .cover-section-text-1',
            duration: 2000,
            keyframes: [
                { opacity: 0 },
                { opacity: 1 },
                { translateY: -100 , opacity: 0 },
            ]
        }, 1200)
        .add({
            targets: '.cover-section .cover-section-text-2',
            duration: 4000,
            keyframes: [
                { translateY: -30 },
                { opacity: 0 },
                { opacity: 1 },
                { translateY: -100 , opacity: 0 },
            ]
        }, 900)
        .add({
            targets: '.cover-section .quality-paper-image',
            duration: 1000,
            keyframes: [
                { opacity: 0 },
                { opacity: 1 },
                { opacity: 0 },
            ]
        }, 3300)
        .add({
            targets: '.cover-section .cover-section-text-3',
            keyframes: [
                { translateY: -80 },
                { opacity: 0 },
                { opacity: 1 },
                { delay: 500 , opacity: 0 },
            ]
        }, 4300)
        .add({
            targets: '.cover-section .cover-note-blank img',
            opacity: 0,
            duration: 10,
        })
        .add({
            targets: '.cover-section .cover-note-blank img:last-child',
            opacity: 1,
            duration: 1,
            scale: 1.3,
        })
        .add({
            targets: '.cover-section .notation-1',
            delay: 5500,
            keyframes: [
                { opacity: 0 },
                { translateY: 10 , opacity: 1 },
            ]
        }, 0)

        .add({
            targets: '.cover-section .notation-2',
            delay: 5800,
            keyframes: [
                { opacity: 0 },
                { translateY: 10 , opacity: 1 },
            ]
        }, 0)

        .add({
            targets: '.cover-section .note-blank-btn',
            delay: 5800,
            keyframes: [
                { opacity: 0 },
                { translateY: 10 , opacity: 1 },
            ]
        }, 0)

        var scene5 = new ScrollMagic.Scene({
            triggerElement: ".cover-section",
            offset: 350,
            duration: 7000,
        })
        .on("progress", function (event) {
            timeline5.seek(timeline5.duration * event.progress);
        })
        .setPin(".cover-section")
        .addTo(controller);

        // Note for
        var timeline6 = anime.timeline({
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
            duration: 1000,
        });

        timeline6
        .add({
            targets: '.note-for .note-text-1',
            translateY: [100 , 0],
            opacity: [0 , 1],
            duration: 50,
        }, 100)
        .add({
            targets: '.note-for .note-text-2',
            translateY: [100 , 0],
            opacity: [0 , 1],
            duration: 50,
        }, 200)
        .add({
            targets: '.note-for .note-for-cover',
            translateY: -100,
            duration: 100,
        }, 100)
        .add({
            targets: '.note-for .note-for-cover',
            translateY: -200,
            duration: 100,
        }, 200)
        .add({
            targets: '.note-for .note-vertical-line',
            height: '100%',
            duration: 100,
        }, 200)
        .add({
            targets: '.note-for .note-text-1',
            opacity: [1 , 0],
            duration: 1,
        }, 200)
        .add({
            targets: '.note-for .note-text-2',
            opacity: [1 , 0],
            duration: 1,
        }, 300)
        .add({
            targets: '.note-for .note-text-3',
            translateY: [100 , 0],
            opacity: [0 , 1],
            duration: 50,
        }, 300)

        .add({
            targets: '.note-for .note-for-cover',
            translateY: -250,
            duration: 100,
        }, 300)
        .add({
            targets: '.note-for .note-horizontal-line',
            width: '100%',
            duration: 100,
        }, 300)
        .add({
            targets: '.note-for .note-line',
            opacity: [0 , 1],
            duration: 1,
        }, 400)

        var scene6 = new ScrollMagic.Scene({
            triggerElement: ".note-for",
            offset: 333,
            duration: 4000,
        })
        .on("progress", function (event) {
            timeline6.seek(timeline6.duration * event.progress);
        })
        .setPin(".note-for")
        .addTo(controller);

        // Author
        var timelineAuthor = anime.timeline({
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
            duration: 1000,
        });

        timelineAuthor
        .add({
            targets: '.author-section .author-image',
            opacity: [1 , 0.3],
            duration: 500,
        }, 0)
        .add({
            targets: '.author-section .author-desc',
            translateY: [0 , -700],
            duration: 500,
        }, 0)

        var sceneAuthor = new ScrollMagic.Scene({
            triggerElement: ".author-section",
            offset: 433,
            duration: 3000,
        })
        .on("progress", function (event) {
            timelineAuthor.seek(timelineAuthor.duration * event.progress);
        })
        .setPin(".author-section")
        .addTo(controller);

   }
}

myMediaQuery.addEventListener('change', widthChangeCallback);

widthChangeCallback(myMediaQuery);