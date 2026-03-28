document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-button');
    const modalOverlay = document.getElementById('menuModal');
    const closeBtn = document.querySelector('.modal-close');

    // Открытие
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });
    }

    // Закрытие по крестику
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    // Закрытие по клику на фон
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const projScroll = document.querySelector('.proj_scroll');
    const prevBtn = document.querySelector('.proj_b1');
    const nextBtn = document.querySelector('.proj_b2');

    if (!projScroll) {
        console.error('Элемент .proj_scroll не найден');
        return;
    }

    // Список изображений (имена файлов)
    const images = [
        'proj5_img1.png',
        'proj5_img2.png',
        'proj5_img3.png',
        'proj5_img4.png',
        'proj5_img5.png',
        'proj5_img6.png'
    ];

    let currentIndex = 0;

    function updateImage() {
        // Путь к папке images (в корне сайта)
        const imagePath = `images/${images[currentIndex]}`;
        projScroll.style.backgroundImage = `url('${imagePath}')`;
        projScroll.style.backgroundSize = 'cover';
        projScroll.style.backgroundPosition = 'center';
        projScroll.style.backgroundRepeat = 'no-repeat';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextImage();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevImage();
    });

    // Устанавливаем первое изображение
    updateImage();
});