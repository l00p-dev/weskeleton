"use strict";

inits()
initComponents()

// Component Functinos
function componentFloatingInputInit(el) {
    let input = el.querySelector('input, textarea')
        checkInputState(input)
    
        function checkInputState(e) {
            if(input.value.length === 0) {
                e.classList.remove('valuable')
            }
            else {
                e.classList.add('valuable')
            }
        }
    
        input.addEventListener('change', (event)=> {
            checkInputState(event.target)
        })
    
        input.addEventListener('input', (event)=> {
            checkInputState(event.target)
        })
}

function componentPasswordInputInit(el) {
    let input = el.querySelector('input')
    let button = el.querySelector('button')

    button.parentComponent = el
    button.inputComponent = input

    button.addEventListener('click', (event) => {
        let parent = event.currentTarget.parentComponent
        let input = event.currentTarget.inputComponent

        switch (input.type) {
            case 'text': {
                input.type = "password"
                parent.classList.remove('show-password')
            } break;

            case 'password' : {
                input.type = "text"
                parent.classList.add('show-password')
            } break;
        }
    })
}

function componentTabInit(tab) {
    tab.querySelectorAll(' .cm_tab__nav .cm_tab__nav__item').forEach((navItem, index) => {
    
        navItem.addEventListener('click', event=> {
            tab.querySelectorAll('.cm_tab__content__item, .cm_tab__nav__item').forEach(item => {
                item.classList.remove('active')
            })

            tab.querySelector('.cm_tab__content__item:nth-child(' + (index + 1) + ')').classList.add('active')
            event.target.classList.add('active')
        })
    })
}

function componentFAQInit(faqTitle) {
    faqTitle.addEventListener('click', event => {
        let faq = event.target.parentNode
        let faqContent = faq.querySelector('.cm_faq__content')

        if (!faq.classList.contains('open')) {
            expandSection(faqContent)
            faq.classList.add('open')

            if(faq.classList.contains('king')) {
                document.querySelectorAll('.cm_faq').forEach(item => {
                    const itemGroup = item.dataset.group
                    const currentFaqGroup = faq.dataset.group

                    if(item !== faq && item.classList.contains('open') && itemGroup === currentFaqGroup) {
                        collapseSection(item.querySelector('.cm_faq__content'))
                        item.classList.remove('open')
                    }
                })
            }
        }
        else {
            collapseSection(faqContent)
            faq.classList.remove('open')
        }
    })
}

function componentSelectInit(select) {
    const input = select.querySelector('input')
    
    const selectInput = select.querySelector('.cm_combo__input')
    const selectDropdown = select.querySelector('.cm_combo__dropdown')
    const selectDropdownItems = select.querySelectorAll('.cm_combo__dropdown__item')
    selectInput.dropdown = selectDropdown

    // selectInput.addEventListener('click', event => {
    //     if(event.currentTarget.dropdown.style.display === 'block') {
    //         event.currentTarget.dropdown.style.display = 'none'
    //         event.target.blur()
    //     }
    //     else {
    //         event.currentTarget.dropdown.style.display = 'block'
    //     }
    // })

    // selectInput.addEventListener('blur', event => {
    //     const dropdown = event.currentTarget.dropdown
    //     dropdown.style.display = 'none'
    // })

    // selectDropdownItems.forEach(dropDownItem => {
    //     dropDownItem.data_input = input
    //     dropDownItem.data_text = selectInput.querySelector('.cm_combo__text')

    //     dropDownItem.addEventListener('click', event => {
    //         const value = event.target.dataset.value
    //         event.currentTarget.data_input.value = value
    //         event.currentTarget.data_text.innerHTML = event.target.innerHTML
    //     })
    // })
}

function toggleComboDropdown(id) {
    var dropdown = document.getElementById(id).querySelector('.cm_combo__dropdown')
    var input = document.getElementById(id).querySelector('.cm_combo__input')
    
    dropdown.classList.toggle('d-none')
}

function comboHide(id) {
    var dropdown = document.getElementById(id).querySelector('.cm_combo__dropdown')
    dropdown.classList.add('d-none')
}

function comboSelect(id, title, value) {
    var input = document.getElementById(id).querySelector('input')
    var text = document.getElementById(id).querySelector('.cm_combo__text')

    text.innerHTML = title
    input.value = value
}

function componentAudioInit(audio) {
    new Plyr(audio, {
        settings: [],
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    });    
}

function componentVideoInit(video) {
    new Plyr(video, {
        settings: [],
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'pip', 'fullscreen'],
        //ratio: '1:1'
    });
}

// Initis
function initComponents() {
    document.querySelectorAll('.cm_input__floating').forEach( (el) => {
        componentFloatingInputInit(el)        
    })
    document.querySelectorAll('.cm_input__password').forEach((el) => {
        componentPasswordInputInit(el)
    })
    document.querySelectorAll('.cm_tab').forEach(tab => {
        componentTabInit(tab)
    })
    document.querySelectorAll('.cm_faq__title').forEach(faqTitle => {
        componentFAQInit(faqTitle)
    })
    document.querySelectorAll('.cm_select').forEach(select => {
        componentSelectInit(select)
    })
    document.querySelectorAll('audio:not(.solid)').forEach(audio => {
        componentAudioInit(audio)
    })
    document.querySelectorAll('video:not(.solid)').forEach(video => {
        componentAudioInit(audio)
    })
}

function inits() {
    AOS.init();
    autosize(document.querySelectorAll('textarea'))
    iziToast.settings({
        icon: '',
        theme: 'dark',
        rtl: true,
    });
}

// General Functions
function togglePoup(id) {
    if(document.querySelector('#' + id).classList.contains('d-none')) {
        openPopup(id)
    }
    else {
        closePopup(id)
    }
}

function openPopup(id) {
    document.querySelector('#' + id).classList.remove('d-none')
    document.querySelector('body').style.overflow = 'hidden'
    let tl  = gsap.timeline()

    tl.fromTo('#' + id + " .cm_popup__overlay", {
        opacity: 0,
    }, {
        opacity: 1,
        duration: .1,
    })

    tl.fromTo('#' + id + " .cm_popup__content", {
        opacity: 0,
        y: -10,
        scale: .95,
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: .3,
    }, '<')
}

function closePopup(id) {
    document.querySelector('body').style.overflow = 'initial'
    let tl  = gsap.timeline()
    
    tl.fromTo('#' + id + " .cm_popup__overlay", {
        opacity: 1,
    }, {
        opacity: 0,
        duration: .1,
    })

    tl.fromTo('#' + id + " .cm_popup__content", {
        opacity: 1,
        y: 0,
        scale: 1,
    }, {
        opacity: 0,
        y: -10,
        scale: .95,
        duration: .3,
        onComplete: function() {
            document.querySelector('#' + id).classList.add('d-none')
        },
    }, '<')
}

function toggleMenu(id) {
    if(document.querySelector('#' + id + ' .cm_menu__overlay').classList.contains('d-none')) {
        openMenu(id)
    }
    else {
        closeMenu(id)
    }
}

function openMenu(id) {
    document.querySelector('#' + id).classList.add('open')
    document.querySelector('#' + id + ' .cm_menu__overlay').classList.remove('d-none')
    document.querySelector('body').style.overflow = 'hidden'

    let tl  = gsap.timeline()
    
    tl.fromTo('#' + id + " .cm_menu__overlay", {
        opacity: 0,
    }, {
        opacity: 1,
        duration: .1,
    })
}

function closeMenu(id) {
    document.querySelector('#' + id).classList.remove('open')
    document.querySelector('body').style.overflow = 'initial'
    let tl  = gsap.timeline()

    tl.fromTo('#' + id + " .cm_menu__overlay", {
        opacity: 1,
    }, {
        opacity: 0,
        duration: .1,
        onComplete: function() {
            document.querySelector('#' + id + ' .cm_menu__overlay').classList.add('d-none')
        },
    })
}

function collapseSection(element) {
    var sectionHeight = element.scrollHeight;

    var elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function() {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        requestAnimationFrame(function() {
            element.style.height = 0 + 'px';
        });
    });
}

function expandSection(element) {
    var sectionHeight = element.scrollHeight;

    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', function(e) {
        element.removeEventListener('transitionend');

        element.style.height = null;
    });
}

function socialNetwordShare(to, url = window.location.href, text = '') {
    switch (to) {
        case 'whatsapp':
            window.open(`https://api.whatsapp.com/send/?phone&text=${url}&app_absent=0`, '_blank');
            break;

        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            break;

        case  'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${url}`, '_blank');
            break;

        case  'linkedin':
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=&source=`, '_blank');
            break;

        case  'reddit':
            window.open(`http://www.reddit.com/submit?url=${url}`, '_blank');
            break;

        case  'telegram':
            window.open(`https://telegram.me/share/url?url=${url}&text=${text}`, '_blank');
            break;
    }
}

function go(href) {
    document.location.href = href;
}

addEventListener('scroll', (event) => {
    //console.log(window.scrollY);
});

// Temp
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

    breakpoints: {
        576:  {},
        768:  {},
        992:  {},
        1200: {},
        1400: {},
    },
});