import PhotoSwipeLightbox from '../../node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js';
import PhotoSwipe from '../../node_modules/photoswipe/dist/photoswipe.esm.js';
import Swiper from "../../node_modules/swiper/swiper-bundle.min.mjs";
// PhotoSwipes
{
    document.querySelectorAll('.cm_gallery').forEach(item => {
        const lightbox = new PhotoSwipeLightbox({
            // may select multiple "galleries"
            gallery: item,

            // Elements within gallery (slides)
            children: 'a',

            arrowPrevSVG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="36" fill="rgba(255,255,255,1)"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>',
            arrowNextSVG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(255,255,255,1)"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>',
            closeSVG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>',
            zoomSVG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM10 10V7H12V10H15V12H12V15H10V12H7V10H10Z"></path></svg>',

            // setup PhotoSwipe Core dynamic import
            pswpModule: PhotoSwipe
        });
        lightbox.init();
        lightbox.on('openingAnimationStart', () => {
            playInteractionSoundEffect('assets/audio/ise/fireball-whoosh.mp3')
        });
        lightbox.on('closingAnimationStart', () => {
            playInteractionSoundEffect('assets/audio/ise/swing-whoosh.mp3')
        });
        lightbox.on('beforeOpen', () => {

        });
    })
}


// Sliders
{
    new Swiper('.swiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },

        autoplay: {
            delay: 300,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        breakpoints: {
            576:  {},
            768:  {},
            992:  {},
            1200: {},
            1400: {},
        },
    });
}

// Temp
{
    addEventListener('scroll', (event) => {
        //console.log(window.scrollY);
    });
}