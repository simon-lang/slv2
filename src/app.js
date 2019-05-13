window.addEventListener('load', (event) => {

    const toggleReadMore = (container) => {
        const el = container.querySelector('.read-more-content')
        el.classList.toggle('hidden')
        const hidden = el.classList.contains('hidden')
        const link = container.querySelector('.read-more')
        link.innerText = hidden ? 'more info...' : 'collapse...'
        el.querySelectorAll('img').forEach(img => {
            var src = img.getAttribute('lazy-src')
            if (src) {
                img.setAttribute('src', src)
            }
        })
    }

    document.querySelectorAll('.read-more-items > li').forEach(el => {
        el.addEventListener('click', function (e) {
            toggleReadMore(e.target)
        })
    })

    document.querySelectorAll('.read-more').forEach(d => {
        d.addEventListener('click', function (e) {
            e.preventDefault()
            toggleReadMore(e.target.parentElement)
        })
    })

    document.querySelectorAll('.read-more-content').forEach(el => {
        el.addEventListener('click', e => {
            e.stopPropagation()
        })
    })
})
