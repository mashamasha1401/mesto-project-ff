import './index.css'; 
import '../components/cards.js'; 
import { enableValidation, clearValidation } from '../components/validation.js'
import { initialCards } from '../components/cards.js';
import { openModal, closeModal, closeEsc, closeOverlay } from '../components/modal.js';
import { addCard, deleteCard, likeCard /*openPopupTypeImage*/ } from '../components/card.js';
import { getUsers, getCards, postNewCard, patchEditProfile, deleteCardOnPage, patchEditAvatar} from '../components/api.js';


//DOM узлы
const placesList = document.querySelector('.places__list');

//Модальное окно с фото и подписью 
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageImage = document.querySelector('.popup__image');
const popupTypeImageCaption = document.querySelector('.popup__caption');

//редактирование
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const editPopupButton = popupEdit.querySelector(".popup__button");

//создание
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardSaveButton = popupNewCard.querySelector(".popup__button")

//Добавление карточки
const newCard_form = document.forms['new-place'];
const newCard_NameInput = document.querySelector('.popup__input_type_card-name');
const newCard_LinkInput = document.querySelector('.popup__input_type_url');

const profileformElement = document.forms['edit-profile'];
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupJobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

//для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//КАРТОЧКИ
addButton.addEventListener('click', () => {
    newCard_form.reset();
    clearValidation(newCard_form, validationConfig);
    openModal(popupNewCard);
});

closeOverlay(popupNewCard);


//промис с массивом запросов
let userId ;

Promise.all([getUsers(), getCards()])
.then(([userData, cardsData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach((element) => {
        const newCard = addCard(element,likeCard,deleteCard,openPopupTypeImage,userId);
        placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Функция создания новой карточки
function newCard_create (evt) {
    evt.preventDefault();
    newCardSaveButton.textContent="Сохранение...";
    postNewCard(newCard_NameInput.value,newCard_LinkInput.value)
        .then((res) => {
            const newCard = addCard(res,likeCard,deleteCard,openPopupTypeImage,userId);
            placesList.prepend(newCard);
            newCard_form.reset();
            clearValidation(newCard_form, validationConfig);
            closeModal(popupNewCard);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            newCardSaveButton.textContent = "Сохранить";
        })
 };

//слушатель кнопки создания нью карточки
newCard_form.addEventListener ('submit', newCard_create); 

//открытие модального окна с большим фото и подписью
function openPopupTypeImage (Name, Link) {
    popupTypeImageImage.src = Link;
    popupTypeImageImage.alt = Name;
    popupTypeImageCaption.textContent = Name;
    openModal(popupTypeImage);
};
closeOverlay(popupTypeImage);

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//обработка открытие попапа редактирования профиля
editButton.addEventListener('click', (evt) => {
    profileformElement.reset();
    popupNameInput.value = profileTitle.textContent;
    popupJobInput.value = profileDescription.textContent;
    clearValidation(profileformElement , validationConfig);
    openModal(popupEdit);
});

//функция редактирования профиля
function editProfile(evt)  {
    evt.preventDefault();
    editPopupButton.textContent= "Сохранение...";
    patchEditProfile(popupNameInput.value, popupJobInput.value)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(popupEdit);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            editPopupButton.textContent = "Сохранить";
        });
};

//слушатель кнопки сохранить на форме редактирования профиля
profileformElement.addEventListener("submit", editProfile);

closeOverlay(popupEdit);

//редактирование аватара
const formEditAvatar = document.forms['edit-avatar'];
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const editAvatarInput = popupTypeEditAvatar.querySelector('.popup__input_type_url_avatar');
const editAvatarButton = popupTypeEditAvatar.querySelector('.popup__button');
const editAvatarInputUrl = popupTypeEditAvatar.querySelector('.popup__input_type_url_avatar');
const profileImageContainer = document.querySelector('.profile_image__container');

//слушатель клика по аватарке
profileImageContainer.addEventListener('click', () => {
    editAvatarInput.value= ' ';
    clearValidation(popupTypeEditAvatar, validationConfig);
    openModal(popupTypeEditAvatar);
    console.log('test !');
});

closeOverlay(popupTypeEditAvatar);


//обработка редактирования аватара
function editAvatar(evt) {
    evt.preventDefault();
    editAvatarButton.textContent= "Сохранение...";
    patchEditAvatar(editAvatarInputUrl.value)
        .then((res) => {
            profileImage.style.backgroundImage = `url(${res.avatar})`;
            closeModal(popupTypeEditAvatar);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            editAvatarButton.textContent = "Сохранить";
        });
};

formEditAvatar.addEventListener("submit", editAvatar);


enableValidation(validationConfig);

export {validationConfig};