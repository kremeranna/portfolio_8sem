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
    const vidContainer = document.querySelector('.main_content_vid');
    if (!vidContainer) {
        console.log('Контейнер .main_content_vid не найден');
        return;
    }

    const soundFiles = ['frog1.mp3', 'frog2.mp3'];
    let currentAudio = null;

    function playRandomSound() {
        const randomIndex = Math.floor(Math.random() * soundFiles.length);
        const soundFile = soundFiles[randomIndex];
        const fullPath = `images/${soundFile}`;
        console.log(`Попытка воспроизвести: ${fullPath}`);

        const audio = new Audio(fullPath);

        // Добавляем обработчики для отслеживания загрузки и ошибок
        audio.addEventListener('canplaythrough', () => {
            console.log(`Аудио ${fullPath} загружено и готово к воспроизведению`);
        });
        audio.addEventListener('error', (e) => {
            console.error(`Ошибка загрузки аудио ${fullPath}:`, e);
        });
        audio.addEventListener('play', () => {
            console.log(`Аудио ${fullPath} начало воспроизводиться`);
        });
        audio.addEventListener('ended', () => {
            console.log(`Аудио ${fullPath} закончилось`);
        });

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = audio;

        // Воспроизводим с обработкой возможной блокировки
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Воспроизведение успешно запущено');
            }).catch(error => {
                console.error('Ошибка воспроизведения:', error);
                // Если ошибка связана с политикой автовоспроизведения, предложим пользователю кликнуть ещё раз
                if (error.name === 'NotAllowedError') {
                    alert('Для воспроизведения звука требуется дополнительное взаимодействие. Нажмите ещё раз.');
                }
            });
        }
    }

    vidContainer.addEventListener('mousedown', (e) => {
        console.log('mousedown на контейнере');
        vidContainer.classList.add('pressed');
        playRandomSound();
    });

    vidContainer.addEventListener('mouseup', () => {
        vidContainer.classList.remove('pressed');
    });

    vidContainer.addEventListener('mouseleave', () => {
        vidContainer.classList.remove('pressed');
    });
});