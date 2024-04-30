// Variables
let interactSoundEffectsEnabled = true
let isRtl = window.getComputedStyle(document.documentElement).getPropertyValue('direction') === 'rtl'

// Weskeleton
{
    function weskeletonSettingsInit() {
        const savedPrimaryColor = localStorage.getItem("setting-primary-color")
        const savedSecondaryColor = localStorage.getItem("setting-secondary-color")
        const savedForegroundColor = localStorage.getItem("setting-foreground-color")
        const savedBackgroundColor = localStorage.getItem("setting-background-color")
        const savedGrayColor = localStorage.getItem("setting-gray-color")

        if(
            savedPrimaryColor &&
            savedSecondaryColor &&
            savedForegroundColor &&
            savedBackgroundColor &&
            savedGrayColor
        ) {
            changeRootVariable('primary-color', savedPrimaryColor)
            changeRootVariable('secondary-color', savedSecondaryColor)
            changeRootVariable('foreground-color', savedForegroundColor)
            changeRootVariable('background-color', savedBackgroundColor)
            changeRootVariable('gray-color', savedGrayColor)
        }

        if(localStorage.getItem('setting-is-bigger-font-size')) {
            // Make switch update on DOM
            document.getElementById('weskeleton-increase-font-size-input').checked = true
            let currentFontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
            document.body.style.fontSize = (currentFontSize * 1.2) + 'px';
        }

        if(localStorage.getItem('setting-is-ise-off')) {
            interactSoundEffectsEnabled = false
            document.getElementById('weskeleton-ise-input').checked = false
        }
    }

    function weskeletonReset() {
        localStorage.removeItem("setting-primary-color")
        localStorage.removeItem("setting-secondary-color")
        localStorage.removeItem("setting-foreground-color")
        localStorage.removeItem("setting-background-color")
        localStorage.removeItem("setting-gray-color")
        localStorage.removeItem("setting-is-bigger-font-size");
        localStorage.removeItem("setting-is-ise-off");

        location.reload()
    }

    function weskeletonToggleFontSize(el) {
        if(el.checked) {
            localStorage.setItem("setting-is-bigger-font-size", true);
            let currentFontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
            document.body.style.fontSize = (currentFontSize * 1.2) + 'px';
        }
        else {
            localStorage.removeItem("setting-is-bigger-font-size");
            document.body.style.removeProperty('font-size')
        }
    }

    function weskeletonToggleISE(el) {
        if(!el.checked) {
            localStorage.setItem("setting-is-ise-off", true);
            interactSoundEffectsEnabled = false
        }
        else {
            localStorage.removeItem("setting-is-ise-off");
            interactSoundEffectsEnabled = true
        }
    }
}

// Helper functions
{
    function switchTheme(el) {
        const primaryColor = extractRGBValues(window.getComputedStyle(el.children[0], null).getPropertyValue('background-color'))
        const secondaryColor = extractRGBValues(window.getComputedStyle(el.children[1], null).getPropertyValue('background-color'))
        const backgroundColor = extractRGBValues(window.getComputedStyle(el.children[2], null).getPropertyValue('background-color'))
        const grayColor = extractRGBValues(window.getComputedStyle(el.children[3], null).getPropertyValue('background-color'))
        const ForegroundColor = extractRGBValues(window.getComputedStyle(el.children[4], null).getPropertyValue('background-color'))


        changeRootVariable('primary-color', primaryColor)
        changeRootVariable('secondary-color', secondaryColor)
        changeRootVariable('foreground-color', ForegroundColor)
        changeRootVariable('background-color', backgroundColor)
        changeRootVariable('gray-color', grayColor)

        function extractRGBValues(rgbString) {
            let values = rgbString.match(/\((.*?)\)/)[1];
            let rgbArray = values.split(',').map(value => value.trim());
            return rgbArray.join(', ');
        }
    }

    function changeRootVariable(variableName, newValue) {
        document.documentElement.style.setProperty(`--${variableName}`, newValue);
        localStorage.setItem("setting-" + variableName, newValue);
    }

    function playInteractionSoundEffect(src) {
        if(interactSoundEffectsEnabled) {
            let audio = new Audio(src);
            audio.play();
            audio.onended = function() {
                audio.remove();
            };
        }
    }

    function querySelectorParent(query, el) {
        let currentElement = el
        while(!currentElement.parentNode.querySelector(query)) {
            currentElement = currentElement.parentNode
        }
        return currentElement
    }

    function go(href) {
        document.location.href = href;
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
}

// Components
{
    function openSelect(select) {
        const dropdown = select.querySelector('.cm_select__dropdown')
        const searchInput = select.querySelector('.cm_select__search')
        const preview = select.querySelector('.cm_select__preview')
        const input = select.querySelector('.cm_select__input input[type="hidden"]')

        if(input.disabled)
            return

        playInteractionSoundEffect('assets/audio/ise/drop.mp3')

        dropdown.style = "translate: none; rotate: none; scale: none; transform: translate(0px, -1.9em) scale(0.98, 0.98); opacity: 0;"
        dropdown.classList.remove('d-none')
        gsap.to(dropdown, {
            opacity : 1,
            y : '0',
            duration: 0.1,
            scale: 1,
            ease: "power4.in",
        })

        select.addEventListener('blur', closeDropdown, {once: true})
        dropdown.addEventListener('blur', closeDropdown, {once: true})
        dropdown.querySelectorAll('.cm_select__option').forEach(option => {
            option.addEventListener('mousedown', choose, {once: true})
        })

        if(searchInput) {
            searchInput.addEventListener('input', search)
            searchInput.addEventListener('focusout', closeDropdown, {once: true})
        }

        function search(event) {
            const el = event.target
            const searchQuery = el.value
            dropdown.querySelectorAll('.cm_select__option').forEach(option => {
                const text = option.textContent
                if(text.search(searchQuery) === -1) {
                    option.classList.add('d-none')
                }
                else {
                    option.classList.remove('d-none')
                }
            })
        }

        function closeDropdown(event) {
            if(!select.contains(event.relatedTarget)) {
                gsap.to(dropdown, {
                    opacity: 0,
                    y: '-1.9em',
                    duration: 0.1,
                    scale: 0.98,
                    ease: "power4.out",
                    onComplete() {
                        dropdown.classList.add('d-none')
                    }
                })
            }
        }

        function choose(event) {
            const text = event.target.textContent
            const value = event.target.dataset.value
            const placeholder = event.target.dataset.placeholder

            if(placeholder !== undefined) {
                preview.classList.add('placeholder')
            }
            else {
                preview.classList.remove('placeholder')
            }

            preview.textContent = text
            input.value = value
            closeDropdown(dropdown)
        }
    }

    function closePopup(id) {
        const popup = document.getElementById(id)
        const content = popup.querySelector('.cm_popup__body')

        playInteractionSoundEffect('assets/audio/ise/bloop.mp3')
        gsap.to(popup, {
            opacity: 0,
        })

        gsap.to(content, {
            y: '.5em',
            opacity: 0,
            scale: .95,
            duration: .2,
            onComplete() {
                popup.classList.add('d-none')
                document.body.style.overflowY = 'auto'
            }
        })
    }

    function openPopup(id) {
        const popup = document.getElementById(id)
        const content = popup.querySelector('.cm_popup__body')
        const overlay = popup.querySelector('.cm_popup__overlay')
        popup.classList.remove('d-none')
        document.body.style.overflowY = 'hidden'

        gsap.fromTo(popup, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: .3,
        })

        gsap.fromTo(content, {
            y: '-1em',
            opacity: 0,
            scale: .95,
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .2,
        })
    }

    function openMenu(id) {
        const menu = document.getElementById(id)
        const content = menu.querySelector('.cm_menu__content')
        const overlay = menu.querySelector('.cm_menu__overlay')

        overlay.classList.remove('d-none')
        content.classList.add('open')
        document.body.style.overflowY = 'hidden'

        gsap.fromTo(overlay, {
            opacity: 0,

        }, {
            opacity: 1,
        })
    }

    function closeMenu(id) {
        const menu = document.getElementById(id)
        const content = menu.querySelector('.cm_menu__content')
        const overlay = menu.querySelector('.cm_menu__overlay')

        if(!content.classList.contains('open'))
            return

        playInteractionSoundEffect('assets/audio/ise/swing-whoosh.mp3')

        content.classList.remove('open')

        gsap.to(overlay, {
            opacity: 0,
            duration: .3,
            onComplete() {
                overlay.classList.add('d-none')
                document.body.style.overflowY = 'auto'
            }
        })
    }

    function navigateTab(el) {
        const tab = querySelectorParent('.cm_tab', el)
        const nav = tab.querySelector('.cm_tab__nav')
        const content = tab.querySelector('.cm_tab__content')
        const tappedIndex = Array.prototype.indexOf.call(nav.children, el)

        nav.querySelectorAll('.cm_tab__nav__item').forEach(item => {
            item.classList.remove('active')
        })
        el.classList.add('active')

        content.querySelectorAll('.cm_tab__content__item').forEach(item => {
            item.classList.remove('active')
        })
        content.children[tappedIndex].classList.add('active')
    }

    function toggleAccordion(el) {
        playInteractionSoundEffect('assets/audio/ise/bloop.mp3')
        const accordion = querySelectorParent('.cm_accordion', el)

        if(accordion.classList.contains('open')) {
            collapse(accordion)
        }
        else {
            expand(accordion)

            if(accordion.classList.contains('king')) {
                document.querySelectorAll('.cm_accordion').forEach(item => {
                    const group = item.dataset.group
                    const currentGroup = accordion.dataset.group

                    if(item !== accordion && item.classList.contains('open') && group === currentGroup) {
                        collapse(item)
                    }
                })
            }
        }

        function collapse(accordion) {
            const body = accordion.querySelector('.cm_accordion__body')
            accordion.classList.remove('open')
            gsap.to(body, {
                height: 0,
                ease: "power3.out",
                duration: 0.3,
            })
        }

        function expand(accordion) {
            const body = accordion.querySelector('.cm_accordion__body')
            accordion.classList.add('open')
            gsap.to(body, {
                height: 'auto',
                ease: "power3.out",
                duration: 0.3,
            })
        }
    }

    function togglePassword(el) {
        let input = el.parentNode.querySelector('input')
        let btn = el


        switch (input.type) {
            case 'text': {
                input.type = "password"
            } break;

            case 'password' : {
                input.type = "text"
            } break;
        }
    }

    function toggleButton(el) {
        const toggled = el.querySelectorAll('.state--toggled')
        const idle = el.querySelectorAll('.state--idle')

        toggled.forEach(item => {
            item.classList.remove('state--toggled')
            item.classList.add('state--idle')
        })

        idle.forEach(item => {
            item.classList.add('state--toggled')
            item.classList.remove('state--idle')
        })
    }
}

// Inits
{
    // Calls
    weskeletonSettingsInit()

    AOS.init();

    isRtl = false;

    iziToast.settings({
        icon: '',
        theme: 'dark',
        rtl: isRtl,
        position: isRtl ? 'bottomLeft' : 'bottomRight',
    });

    // Query Selections
    document.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', () => {
            playInteractionSoundEffect('assets/audio/ise/drop.mp3')
        })
    })

    document.querySelectorAll('input, textarea').forEach(item => {
        if(item.type === 'radio' || item.type === 'checkbox') {
            item.addEventListener('change', () => {
                playInteractionSoundEffect('assets/audio/ise/water-drop.mp3')
            })
        }
        if(item.type === 'text' || item.type === 'password' || item.type === 'number' || item.type === 'email' || item.tagName.toLowerCase() === 'textarea') {
            item.addEventListener('focus', () => {
                playInteractionSoundEffect('assets/audio/ise/click.mp3')
            })
        }
    })

    document.querySelectorAll('audio:not(.solid)').forEach(audio => {
        new Plyr(audio, {
            settings: [],
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        });
    })
    document.querySelectorAll('video:not(.solid)').forEach(video => {
        new Plyr(video, {
            settings: [],
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'pip', 'fullscreen'],
            //ratio: '1:1'
        });
    })

    document.querySelectorAll('textarea').forEach(item => {
        autosize(item)
    })

}