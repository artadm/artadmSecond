Element.prototype.appendAfter = function(elem) {
    elem.parentNode.insertBefore(this, elem.nextSibling)
}


$(document).ready(function() {
    $('.slider__ganr').slick({
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        slidesToShow: 1, // сколько слайдов показаны одновременно
        slidesToScroll: 1, // сколько слайдов скроллится
        speed: 500, // скорость переходов
        easing: 'ease', // анимация переходов
        // infinite: false,
        // autoplay: true,
        // autoplaySpeed: 5000,
        draggable: true, // мотать с помощью мыщки, на мобилн устр не действует, там это есть всегда
        swipe: true, // уже для телефонов
        centerMode: false, // по бокам части из другого слйда
        // variableWidth: true,
        rows: 1, // строки в 1 слайде 
        // vertical: true,
        // verticalSwiping: true,
        // adNavFor: '.secondSlider' // связывать 2а слайда
    })  ;
    // $('.secondSlider').slick({
    //     adNavFor: '.slider'
    // })

    $('.reviews__slider').slick({
        infinite: true,
        slidesToShow: 1,
        fade: false,
        slidesToScroll:1,
        dots: false,
        rows: 1
    })


    // fixed slider
    const mediaQuery = window.matchMedia('(max-width: 770px)')
function changeSlider(el) {
    if(el.matches) {
        console.log('asasas')
    }
}
mediaQuery.addListener(changeSlider)
changeSlider(mediaQuery)



    // Fixed Header
    let   header = $('#header'),
          introH = ($('#intro').innerHeight() - '40')
          scrollOffst = $(window).scrollTop()

          checkScroll(scrollOffst)
    $(window).on('scroll', function() {
        scrollOffst = $(this).scrollTop()

        checkScroll(scrollOffst)

    })

    function checkScroll() {
        if(introH <= scrollOffst) {
            header.addClass('fixed')
        } else {
            header.removeClass('fixed')
        }
    }

    //accordion 
$('[data-collapse]').on('click', function(event) {
    event.preventDefault()
    var $this = $(this),
        blockId = $this.data('collapse')
    $(blockId).toggleClass('active')
    $('.slider__ganr').slick('setPosition')
})

$('[data-acc]').on('click', function(event){
    event.preventDefault()
    var $this = $(this),
         dtts = $this.data('acc'),
         blockOffset = $(dtts).offset().top
         document.querySelectorAll('.accordion__item').forEach(element => {
            element.classList.remove('active')
         })
         $(dtts).addClass('active')

    $('.slider__ganr').slick('setPosition')
    $("html, body").animate({
        scrollTop: blockOffset
    }, 500);
})




// Scroll
$('[data-scroll]').on('click', function(event){
    event.preventDefault()
    var $this = $(this),
         dtts = $this.data('scroll'),
         blockOffset = $(dtts).offset().top
        //  document.querySelectorAll('.accordion__item').forEach(element => {
        //     element.classList.remove('active')
        //  })
        //  $(dtts).addClass('active')


    $("#nav a").removeClass('active')
    $this.addClass('active')

    $("html, body").animate({
        scrollTop: blockOffset
    }, 500);
})

})




  $('[data-nav]').on('mouseover', function(event) {
    event.preventDefault()
    $("#nav a").removeClass('active')
    var $this = $(this),
        dtts = $($this.data('nav'))
    // var $this = $(`[data-scroll="${this}"]`)
        dtts.addClass('active')
  })
  $('[data-nav]').on('mouseout', function(event) {
    event.preventDefault()
    $("#nav a").removeClass('active')
  })





// Modal
function _createSlider(options) {
    const slider = document.createElement('div')
    slider.classList.add('slider', 'slider__ganr', options.class)
    slider.insertAdjacentHTML('afterbegin', `
            <div class="card" id = "first">  
           
            </div>

            <div class="card" id = "second">  

            </div>

            <div class="card" id = "first">  

            </div>

            <div class="card" id = "second">  

            </div>
`)
    render(slider, favorite)
    return slider   
}



function _createModal(options) {
    const amodal = document.createElement('div')
    amodal.classList.add('amodal')
    amodal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-close="true">
        <div class="modal__window">
            <div class="modal__header">
                <div class="modal__title">${options.title}</div>
                ${options.closable ? '<div class="modal__close" data-close="true">&times;</div>' : ''}
            </div>
            <div class="modal__content">
                <div class="modal__text">${options.text}</div>
            </div>
            <div class="modal__buttons">
                <button class="modal__btn primary">Добавить</button>
                <button class="modal__btn danger">Удалить</button>
            </div>
        </div>
    </div>
    `)
    
    const slider = _createSlider(options)
    slider.appendAfter(amodal.querySelector('.modal__text'))
    document.body.appendChild(amodal)
    return amodal
}


g.modal = function(options) {
    const animatSpeed = 500
    const gmodal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal1 = {
        open() {
            document.body.classList.add('modal__body')
            if(destroyed) {
                return console.log('Modal destroyed')
            }
            !closing && gmodal.classList.add('open')
        },
        close() {
            document.body.classList.remove('modal__body')
            closing = true
            gmodal.classList.remove('open')
            gmodal.classList.add('hide')
            setTimeout(() => {
                gmodal.classList.remove('hide')
                closing = false
            }, animatSpeed)

        }
    }

    const listener = event => {
        if(event.target.dataset.close) {
            modal1.close()
        }
    }


    gmodal.addEventListener('click', listener)

    return Object.assign(modal1, {
        destroy() {
            gmodal.parentNode.removeChild(gmodal)
            destroyed = true
            gmodal.removeEventListener('click', listener)
        },
        setText(html) {
            gmodal.querySelector('.modal__text').innerHTML = html
        },
        setTitle(html1) {
            gmodal.querySelector('.modal__title').innerHTML = html1
        },
        setImg(pic) {
            gmodal.querySelector('.modal__img').src = pic
        },
        // rend(options) {
        //         const ganreslider = document.querySelector('.' + options.class)
        //         render(ganreslider, isekai)
        // },
        
    })
}
