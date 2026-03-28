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
    const nameInput = document.querySelector('.name');
    const emailInput = document.querySelector('.email');
    const messageInput = document.querySelector('.text');
    const sendBtn = document.querySelector('.send');

    const successModal = document.getElementById('successModal');
    if (!successModal) {
        console.error('Modal window not found!');
        return;
    }

    const closeModalBtn = successModal.querySelector('.modal-success__close');
    const okBtn = successModal.querySelector('.modal-success__ok');

    function clearForm() {
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }

    function showSuccessModal() {
        successModal.classList.add('active');
    }

    function hideSuccessModal() {
        successModal.classList.remove('active');
    }

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Очищаем форму и показываем окно
        clearForm();
        showSuccessModal();
    });

    // Закрытие окна
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideSuccessModal);
    if (okBtn) okBtn.addEventListener('click', hideSuccessModal);

    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) hideSuccessModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            hideSuccessModal();
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