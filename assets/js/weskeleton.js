// Function to detect text direction
function getDirection() {
    var bodyElement = document.body
    var style = window.getComputedStyle(bodyElement)
    var direction = style.getPropertyValue('direction')
    return direction === 'rtl'
}

// Helper functions
{
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

    function copy(text, alert = null) {
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value);
        document.body.removeChild(input);

        if(alert) {
            iziToast.success({title: alert})
        }
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

            case  'copy':
                copy(url, 'Copied!')
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

        dropdown.style = "translate: none; rotate: none; scale: none; transform: translate(0px, -1.9em) scale(0.98, 0.98); opacity: 0;"
        dropdown.classList.remove('d-none')
        select.dataset.isOpen = 'true'
        gsap.to(dropdown, {
            opacity : 1,
            y : '0',
            duration: 0.15,
            scale: 1,
            ease: "power4.in",
            display: 'block',
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
            if(select.dataset.isOpen === 'true') {
                if(!select.contains(event.relatedTarget)) {
                    select.dataset.isOpen = 'false'
                    gsap.to(dropdown, {
                        opacity: 0,
                        y: '-1.9em',
                        duration: 0.15,
                        scale: 0.98,
                        ease: "power4.out",
                        onComplete() {
                            dropdown.classList.add('d-none')
                        }
                    })
                }
            }
        }

        function choose(event) {
            const text = event.target.textContent
            const placeholder = event.target.dataset.placeholder
            const value = event.target.dataset.value
            const href = event.target.href

            if(placeholder !== undefined) {
                preview.classList.add('placeholder')
            }
            else {
                preview.classList.remove('placeholder')
            }

            preview.textContent = text

            if(value) {
                input.value = value
                input.dispatchEvent(new Event('input', { 'bubbles': true }));
            }
            if(href) {
                go(href)
            }
            closeDropdown(dropdown)
        }
    }

    function closePopup(id) {
        const popup = document.getElementById(id)
        const content = popup.querySelector('.cm_popup__body')

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
                popup.setAttribute('aria-hidden', 'true');
                document.body.style.overflowY = 'auto'
            }
        })
    }

    function openPopup(id, preventPageScroll = false) {
        const popup = document.getElementById(id)
        const content = popup.querySelector('.cm_popup__body')
        const overlay = popup.querySelector('.cm_popup__overlay')
        popup.classList.remove('d-none')
        popup.setAttribute('aria-hidden', 'false');

        if(preventPageScroll) {
            document.body.style.overflowY = 'hidden'
        }

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

    function openMenu(id, preventPageScroll = false) {
        const menu = document.getElementById(id)
        const content = menu.querySelector('.cm_menu__content')
        const overlay = menu.querySelector('.cm_menu__overlay')

        overlay.classList.remove('d-none')
        menu.setAttribute('aria-hidden', 'false');
        content.classList.add('open')

        if(preventPageScroll) {
            document.body.style.overflowY = 'hidden'
        }

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

        content.classList.remove('open')

        gsap.to(overlay, {
            opacity: 0,
            duration: .3,
            onComplete() {
                overlay.classList.add('d-none')
                menu.setAttribute('aria-hidden', 'true');
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
            item.setAttribute('aria-selected', 'false');
        })
        el.classList.add('active')
        el.setAttribute('aria-selected', 'true');

        content.querySelectorAll('.cm_tab__content__item').forEach(item => {
            item.classList.remove('active')
        })
        content.children[tappedIndex].classList.add('active')
    }

    function initTab(el) {
        const initialTab = el.dataset.initialTab
        const nav = el.querySelector('.cm_tab__nav')
        const targetTab = nav.children[initialTab]
        navigateTab(targetTab)
    }

    function toggleAccordion(el) {
        const accordion = querySelectorParent('.cm_accordion', el)

        if(accordion.classList.contains('open')) {
            collapse(accordion, el)
        }
        else {
            expand(accordion, el)

            if(accordion.classList.contains('king')) {
                document.querySelectorAll('.cm_accordion').forEach(item => {
                    const group = item.dataset.group
                    const currentGroup = accordion.dataset.group

                    if(item !== accordion && item.classList.contains('open') && group === currentGroup) {
                        collapse(item, el)
                    }
                })
            }
        }

        function collapse(accordion, title) {
            const body = accordion.querySelector('.cm_accordion__body')
            accordion.classList.remove('open')
            title.setAttribute('aria-expanded', 'false');
            gsap.to(body, {
                height: 0,
                ease: "power3.out",
                duration: 0.3,
            })
        }

        function expand(accordion, title) {
            const body = accordion.querySelector('.cm_accordion__body')
            accordion.classList.add('open')
            title.setAttribute('aria-expanded', 'true');
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
    if(typeof AOS !== 'undefined') {
        AOS.init();
    }

    if(typeof iziToast !== 'undefined') {
        iziToast.settings({
            icon: '',
            theme: 'dark',
            rtl: getDirection(),
            position: 'bottomCenter',
        });
    }

    // Query Selections
    if(typeof Plyr !== 'undefined') {
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
    }

    if(typeof autosize !== 'undefined') {
        document.querySelectorAll('textarea').forEach(item => {
            autosize(item)
        })
    }

    document.querySelectorAll('.cm_tab').forEach(item => {
        initTab(item)
    })
}





