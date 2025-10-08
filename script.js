// ===========================================
// CONFIGURACIÓN PRINCIPAL
// ===========================================

// Configuración de la fecha del evento (EDITABLE)
const FECHA_EVENTO = new Date(2025, 9, 11, 20, 0, 0).getTime();

// Configuración de WhatsApp (EDITABLE)
const TELEFONO_WHATSAPP = '+540385154971420'; // Reemplazar con número real

// Configuración de música (EDITABLE)
const PLAYLIST = [
    {
        url: "calor.mp3",
        nombre: "Música"
    },
    {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        nombre: "Música"
    }
];

// ===========================================
// VARIABLES GLOBALES
// ===========================================
let musicaActiva = false;
let indiceMusicaActual = 0;

// ===========================================
// FUNCIONES DE MÚSICA
// ===========================================

/**
 * Inicializa la funcionalidad de música
 */
function inicializarMusica() {
    const audio = document.getElementById('musica-fondo');
    const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
    const controlMusica = document.getElementById('control-musica');
    const botonMusica = document.getElementById('boton-musica');
    const infoMusica = document.getElementById('info-musica');

    // Event listeners para botones de música
    document.getElementById('btn-con-musica').addEventListener('click', () => {
        musicaActiva = true;
        pantallaBienvenida.style.display = 'none';
        controlMusica.style.display = 'flex';
        reproducirMusica();
        document.body.style.overflow = 'auto';
    });

    document.getElementById('btn-sin-musica').addEventListener('click', () => {
        musicaActiva = false;
        pantallaBienvenida.style.display = 'none';
        controlMusica.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Control de música flotante
    botonMusica.addEventListener('click', function () {
        if (audio.paused) {
            reanudarMusica();
        } else {
            pausarMusica();
        }
    });

    // Doble clic para siguiente canción
    botonMusica.addEventListener('dblclick', function (e) {
        e.preventDefault();
        siguienteCancion();
    });

    // Reproducir automáticamente cuando termine la canción
    audio.addEventListener('ended', function () {
        siguienteCancion();
    });

    /**
     * Reproduce la música actual
     */
    function reproducirMusica() {
        if (!musicaActiva) return;

        audio.src = PLAYLIST[indiceMusicaActual].url;
        audio.play().catch(e => {
            console.log('Reproducción automática bloqueada:', e);
            infoMusica.textContent = "Haz clic para reproducir";
            infoMusica.classList.add('mostrar');
        });

        actualizarInfoMusica();
    }

    /**
     * Pausa la música
     */
    function pausarMusica() {
        audio.pause();
        botonMusica.textContent = '';
        infoMusica.textContent = "Música pausada";
        infoMusica.classList.add('mostrar');

        setTimeout(() => {
            infoMusica.classList.remove('mostrar');
        }, 2000);
    }

    /**
     * Reanuda la música
     */
    function reanudarMusica() {
        audio.play();
        botonMusica.textContent = '';
        actualizarInfoMusica();
    }

    /**
     * Cambia a la siguiente canción
     */
    function siguienteCancion() {
        indiceMusicaActual = (indiceMusicaActual + 1) % PLAYLIST.length;
        reproducirMusica();
    }

    /**
     * Actualiza la información de la canción actual
     */
    function actualizarInfoMusica() {
        infoMusica.textContent = PLAYLIST[indiceMusicaActual].nombre;
        infoMusica.classList.add('mostrar');

        setTimeout(() => {
            infoMusica.classList.remove('mostrar');
        }, 3000);
    }
}

// ===========================================
// FUNCIONES DE CUENTA REGRESIVA
// ===========================================

/**
 * Actualiza la cuenta regresiva
 */
function actualizarCuentaRegresiva() {
    const ahora = Date.now();
    const diferencia = FECHA_EVENTO - ahora;

    // Si la fecha ya pasó
    if (diferencia < 0) {
        document.getElementById('dias').textContent = '00';
        document.getElementById('horas').textContent = '00';
        document.getElementById('minutos').textContent = '00';
        document.getElementById('segundos').textContent = '00';
        return;
    }

    // Cálculos de tiempo
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Actualizar elementos HTML
    document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
    document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
}

// ===========================================
// FUNCIONES DE WHATSAPP
// ===========================================

/**
 * Configura la confirmación vía WhatsApp
 */
function configurarConfirmacionWhatsApp() {
    document.getElementById('confirmar-btn').addEventListener('click', function (e) {
        e.preventDefault();

        const mensaje = encodeURIComponent(`Hola! Quiero confirmar mi asistencia al evento. 
Opciones🤔:
😎Sí, voy 
😫Perdón, se me complicó.
[Tu nombre aquí]`);

        const urlWhatsApp = `https://wa.me/${TELEFONO_WHATSAPP}?text=${mensaje}`;
        window.open(urlWhatsApp, '_blank');
    });
}

// ===========================================
// FUNCIONES DE GALERÍA
// ===========================================

/**
 * Inicializa la galería interactiva
 */
function inicializarGaleria() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let indiceActual = 0;

    // Abrir lightbox al hacer clic en una imagen
    galeriaItems.forEach(item => {
        item.addEventListener('click', function () {
            indiceActual = parseInt(this.getAttribute('data-index'));
            actualizarLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar lightbox
    lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Cerrar lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navegación entre imágenes
    lightboxPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        indiceActual = (indiceActual - 1 + galeriaItems.length) % galeriaItems.length;
        actualizarLightbox();
    });

    lightboxNext.addEventListener('click', function (e) {
        e.stopPropagation();
        indiceActual = (indiceActual + 1) % galeriaItems.length;
        actualizarLightbox();
    });

    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            indiceActual = (indiceActual - 1 + galeriaItems.length) % galeriaItems.length;
            actualizarLightbox();
        } else if (e.key === 'ArrowRight') {
            indiceActual = (indiceActual + 1) % galeriaItems.length;
            actualizarLightbox();
        }
    });

    /**
     * Actualiza la imagen en el lightbox
     */
    function actualizarLightbox() {
        const imgSrc = galeriaItems[indiceActual].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }
}

// ===========================================
// FUNCIONES DE FORMULARIO
// ===========================================

/**
 * Inicializa el formulario de sugerencia de canciones
 */
function inicializarFormularioCancion() {
    document.getElementById('cancion-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const cancion = document.getElementById('cancion').value;
        const enlace = document.getElementById('enlace').value;

        // Validación básica
        if (!nombre || !cancion) {
            alert('Por favor, completa al menos tu nombre y la canción sugerida.');
            return;
        }

        // Simular envío (en un caso real, aquí se enviaría a un servidor)
        alert(`¡Gracias ${nombre}! Tu sugerencia "${cancion}" ha sido recibida.`);

        // Limpiar formulario
        document.getElementById('cancion-form').reset();
    });
}

// ===========================================
// FUNCIONES DE SCROLL
// ===========================================

/**
 * Configura el scroll suave entre secciones
 */
function configurarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ===========================================

/**
 * Función principal que inicializa toda la aplicación
 */
function inicializarAplicacion() {
    // Bloquear scroll inicialmente (hasta que elija música)
    document.body.style.overflow = 'hidden';

    // Iniciar cuenta regresiva
    actualizarCuentaRegresiva();
    setInterval(actualizarCuentaRegresiva, 1000);

    // Configurar todas las funcionalidades
    inicializarMusica();
    configurarConfirmacionWhatsApp();
    inicializarGaleria();
    inicializarFormularioCancion();
    configurarScrollSuave();

    console.log('Invitación digital cargada correctamente');
}

// Iniciar la aplicación cuando el DOM esté listo

document.addEventListener('DOMContentLoaded', inicializarAplicacion);













