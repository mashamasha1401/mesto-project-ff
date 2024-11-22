//openModal closeModal

//открытие открытия модального окна
 const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    modal.classList.add('popup_is-animated');
    document.addEventListener('keydown', closeEsc);
};

// Функция закрытия модального окна
 const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
 };

 // Закрытие модалального окна по Esc
 const closeEsc = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape' || evt.keyCode === 27) {
        const openedModal = document.querySelector('.popup_is-opened');
        closeModal(openedModal);
    };
 };

// Закрытие модалального окна по оверлей
const closeOverlay = screen => {
    screen.addEventListener('click', (evt) => {
        if  (evt.target.classList.contains('popup_is-opened')||evt.target.classList.contains('popup__close')) {
            closeModal(screen);
        };
    });
};


  export {openModal, closeModal, closeEsc, closeOverlay};