document.querySelectorAll('.cm_select').forEach(cmSelect => {
    const preview = cmSelect.querySelector('.cm_select__preview')
    const dropdown = cmSelect.querySelector('.cm_select__dropdown')
    const input = cmSelect.querySelector('input')
    const searchInput = cmSelect.querySelector('.cm_select__search input')

    cmSelect.addEventListener('click', () => {
        openDropdown(dropdown)
        //dropdown.classList.add('open')
    })

    cmSelect.addEventListener('blur', event => {
        const nextBluredElement = event.relatedTarget

        if(!cmSelect.contains(nextBluredElement)) {
            closeDropdown(dropdown)
            //dropdown.classList.remove('open')
        }
    })

    searchInput.addEventListener('input', event => {
        const searchQuery = searchInput.value

        dropdown.querySelectorAll('.cm_select__option').forEach(option => {
            const text = option.textContent

            if(text.search(searchQuery) === -1) {
                option.classList.add('d-none')
            }
            else {
                option.classList.remove('d-none')
            }
        })
    })

    searchInput.addEventListener('blur', event => {
        //const nextBluredElement = event.relatedTarget

        closeDropdown(dropdown)
        //dropdown.classList.remove('open')
    })

    dropdown.querySelectorAll('.cm_select__option').forEach(option => {
        console.log('found')
        option.addEventListener('mousedown', () => {
            const text = option.textContent
            const value = option.dataset.value

            preview.textContent = text
            input.value = value

            closeDropdown(dropdown)
            //dropdown.classList.remove('open')
        })
    })
})


function closeDropdown(el) {

    gsap.to(el, {
        opacity : 0,
        y : '.9em',
        duration: 0.1,
        ease: "power4.out",
        onComplete() {
            el.classList.add('d-none')
        }
    })
}

function openDropdown(el) {
    el.classList.remove('d-none')
    gsap.to(el, {
        opacity : 1,
        y : '0',
        duration: 0.1,
        ease: "power4.in",
    })
}



