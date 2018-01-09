window.addEventListener('load', (event) => {

    document.querySelectorAll('.read-more').forEach(d => {
        d.addEventListener('click', function (e) {
            e.preventDefault()
            const el = e.target
            const child = el.parentElement.querySelector('.read-more-content')
            child.classList.toggle('hidden')
            const hidden = child.classList.contains('hidden')
            el.innerText = hidden ? 'more info...' : 'collapse...'
            child.querySelectorAll('img').forEach(img => {
                var src = img.getAttribute('lazy-src')
                if (src) {
                    img.setAttribute('src', src)
                }
            })
        })
    })
})
