function irALaPractica(num) {
    location.href = 'prac' + num + '/practica_' + num + '.html'
}

function descargarArchivo(ruta, nombre) {
    fetch(ruta)
        .then(response => response.blob())
        .then(blob => {
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = window.URL.createObjectURL(blob);
            enlaceDescarga.download = nombre;

            document.body.appendChild(enlaceDescarga);
            enlaceDescarga.click();
            document.body.removeChild(enlaceDescarga);
        })
        .catch(error => console.error('Error al descargar el archivo:', error));
}
/*
function zoomInImagenPortada(nombre) {
    var imagen = document.getElementById(nombre);
    imagen.style.backgroundSize = '105%';
}
function zoomOutImagenPortada(nombre) {
    var imagen = document.getElementById(nombre);
    imagen.style.backgroundSize = 'cover';
}*/



var carousel,
    slider,
    items,
    prevBtn,
    nextBtn,
    bullets;


var width, height, totalWidth, margin = 20,
    currIndex = 0,
    interval, intervalTime = 4000;

function init() {
    carousel = document.getElementsByClassName('carousel')
    slider = document.getElementById('carousel__slider')
    items = document.getElementsByClassName('carousel__slider__item')
    prevBtn = document.getElementsByClassName('carousel__prev')
    nextBtn = document.getElementsByClassName('carousel__next')
    bullets = document.getElementsByClassName('bullet')

    currIndex = 1;
    resize();
    bindEvents();
}

function resize() {
    if (window.innerWidth <= 500) {

        width = Math.max(window.innerWidth * .95, 275),
            height = window.innerHeight * .5,
            totalWidth = width * items.length;
        slider.style.width = totalWidth + "px";

    } else if (window.innerWidth <= 800) {

        width = Math.max(window.innerWidth * .75, 275),
            height = window.innerHeight * .5,
            totalWidth = width * items.length;
        slider.style.width = totalWidth + "px";

    } else {

        width = Math.max(window.innerWidth * .5, 275),
            height = window.innerHeight * .5,
            totalWidth = width * items.length;
        slider.style.width = totalWidth + "px";
    }

    for (var i = 0; i < items.length; i++) {
        let item = items[i];
        item.style.width = (width - (margin * 2)) + "px";
        item.style.height = height + "px";
    }
    move(currIndex);
}

function move(index) {

    if (index < 1) index = items.length;
    if (index > items.length) index = 1;
    currIndex = index;

    changeBullet(currIndex)

    for (var i = 0; i < items.length; i++) {
        let item = items[i],
            box = item.getElementsByClassName('item__3d-frame')[0];
        if (i == (index - 1)) {
            item.classList.add('carousel__slider__item--active');
            box.style.transform = "perspective(1200px)";
        } else {
            item.classList.remove('carousel__slider__item--active');
            box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
        }
    }

    slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
}

function prev() {
    move(--currIndex);
}

function next() {
    move(++currIndex);
}

function changeBullet(index) {
    for (var i = 0; i < bullets.length; i++) {
        var elem = bullets[i];
        elem.classList.remove('activeBullet')
        if (i == index - 1) {
            elem.classList.add('activeBullet')
        }
    }
}

function bindEvents() {
    window.onresize = resize;
    prevBtn[0].addEventListener('click', () => { prev(); });
    nextBtn[0].addEventListener('click', () => { next(); });
}

