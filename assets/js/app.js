"use strict";
/* l00p Studio - l00p.dev */

document.querySelectorAll('.cm_input__floating').forEach( (el) => {
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
})

document.querySelectorAll('.cm_input__password').forEach((el) => {
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
})

document.querySelectorAll('video').forEach(video => {
    new Plyr(video, {
        settings: [],
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'pip', 'fullscreen'],
        //ratio: '1:1'
    });
})

document.querySelectorAll('audio').forEach(audio => {
    new Plyr(audio, {
        settings: [],
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    });
})

document.querySelectorAll('.cm_tab').forEach(tab => {
    tab.querySelectorAll(' .cm_tab__nav .cm_tab__nav__item').forEach((navItem, index) => {

        navItem.addEventListener('click', event=> {
            tab.querySelectorAll('.cm_tab__content__item, .cm_tab__nav__item').forEach(item => {
                item.classList.remove('active')
            })

            tab.querySelector('.cm_tab__content__item:nth-child(' + (index + 1) + ')').classList.add('active')
            event.target.classList.add('active')
        })
    })
})

document.querySelectorAll('.cm_faq__title').forEach(faqTitle => {
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
                    else {
                        console.log('this is not true')
                    }
                })
            }
        }
        else {
            collapseSection(faqContent)
            faq.classList.remove('open')
        }
    })
})

document.querySelectorAll('.cm_select').forEach(select => {
    const input = select.querySelector('input')

    const selectInput = select.querySelector('.cm_select__input')
    const selectDropdown = select.querySelector('.cm_select__dropdown')
    const selectDropdownItems = select.querySelectorAll('.cm_select__dropdown__item')
    selectInput.dropdown = selectDropdown

    selectInput.addEventListener('click', event => {
        if(event.currentTarget.dropdown.style.display === 'block') {
            event.currentTarget.dropdown.style.display = 'none'
            event.target.blur()
        }
        else {
            event.currentTarget.dropdown.style.display = 'block'
        }
    })

    selectInput.addEventListener('blur', event => {
        const dropdown = event.currentTarget.dropdown

        setTimeout(() => {
            dropdown.style.display = 'none'
        }, 100)
    })

    selectDropdownItems.forEach(dropDownItem => {
        dropDownItem.input = input
        dropDownItem.text = selectInput.querySelector('.cm_select__text')

        dropDownItem.addEventListener('click', event => {
            const value = event.target.dataset.value
            event.currentTarget.input.value = value
            event.currentTarget.text.innerHTML = event.target.innerHTML
        })
    })
})

// Initis
AOS.init();

autosize(document.querySelectorAll('textarea'))

iziToast.settings({
    icon: '',
});

// Functions
function togglePoup(id) {
    document.querySelector('#' + id).classList.toggle('open')
}

function toggleMenu(id) {
    document.querySelector('#' + id).classList.toggle('open')
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

// Examples
const swiper = new Swiper('.swiper', {
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