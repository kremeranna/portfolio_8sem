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