import './index.css'; 
import './cards.js'; 
import { initialCards } from './cards.js';
import { openModal, closeModal, closeEsc, closeOverlay } from '../components/modal.js';
import { addCard, deleteCard, likeCard, /*openPopupTypeImage*/ } from '../components/card.js';

//DOM узлы
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//редактирование
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

//создание
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

//Добавление карточки
const newCard_NameInput = document.querySelector('.popup__input_type_card-name');
const newCard_LinkInput = document.querySelector('.popup__input_type_url');

initialCards.forEach((item) => {
    placesList.append(addCard(item, deleteCard, likeCard, openPopupTypeImage ))
});

addButton.addEventListener('click', () => {
    openModal(popupNewCard);
});

closeOverlay(popupNewCard);

//новая карточка
function newCard_create (evt) {
    evt.preventDefault();
    const dataset = {
        name: newCard_NameInput.value,
        link: newCard_LinkInput.value,
    };

    const newCard_popup = addCard (dataset , deleteCard, likeCard, openPopupTypeImage);
    
    placesList.prepend(newCard_popup);
    closeModal(popupNewCard);
    evt.target.reset();
 };

//слушатель создание нью карточки
const newCard_form = document.forms['new-place'];
newCard_form.addEventListener ('submit', newCard_create); 

//открытие модального окна с фото и подписью
function openPopupTypeImage (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(popupTypeImage);

};
closeOverlay(popupTypeImage);

//Редактирование профиля
const profileformElement = document.forms['edit-profile'];
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupJobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = popupNameInput.value;
    profileDescription.textContent = popupJobInput.value;
    closeModal(popupEdit);
};

profileformElement.addEventListener ('submit', handleFormSubmit); //Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»

editButton.addEventListener('click', () => {
    openModal(popupEdit);
    popupNameInput.value = profileTitle.textContent;
    popupJobInput.value = profileDescription.textContent;
});

closeOverlay(popupEdit);

