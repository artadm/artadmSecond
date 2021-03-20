
//   window.onload = function() {
//     yourFunction(param1, param2);
//   };

const toHTML = things => `
    <div class="card__item" id="${things.id}">
    <div class="card__inner">
        <div class="card__img">
            <img src="${things.img}" alt="">
        </div>
        <div class="card__text">${things.text}</div>
    </div>
    </div>
`
const render = function(elem, cnst) {
    for( let j = 0; j < elem.children.length; j++) {
            const html = cnst.filter(el => el.id == elem.children[j].id).map(toHTML).join('')
            elem.children[j].innerHTML = html     
    }
}


ganres.forEach(ganr => {
    const el = document.querySelector('.' + ganr.class)
    render(el, ganr.cnst)  
})

    $('[data-btn]').on('click', function(event) {
        event.preventDefault()
        const $this = $(this),
              btnType = $this.data('btn')
        if(btnType == '#isekai') {
            isekaiInfo.open()
        } else if(btnType == '#senen') {
            senenInfo.open()
        }
    })

    const isekaiInfo = g.modal ({
        title: 'Исекай',
        closable: true,
        text: 'Наш список лучших Исекаев!',
        class: 'slider__isekai'
    })

    const senenInfo = g.modal ({
        title: 'Сёнен',
        closable: true,
        text: 'Наш список лучших Сёненов!',
        class: 'slider__senen'
    })