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
/*
initialCards.forEach((item) => {
    placesList.append(addCard(item, deleteCard, likeCard, openPopupTypeImage ))
});*/

//КАРТОЧКИ
addButton.addEventListener('click', () => {
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

    /*
    cardsData.forEach((item) => {
        placesList.append(addCard(item, deleteCard, likeCard, openPopupTypeImage ,userId ))
    });*/
    //console.log(cardsData);
    cardsData.forEach((element) => {
        //console.log('test5');
        const newCard = addCard(element,likeCard,deleteCard,openPopupTypeImage,userId);
        
        placesList.append(newCard);
        //console.log('test4')
    });
  })
  .catch((err) => {
    console.log(err);
  })

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
        .finally(() => {
            newCardSaveButton.textContent = "Сохранить";
        })

    /*
    const dataset = {
        name: newCard_NameInput.value,
        link: newCard_LinkInput.value,
    };

    const newCard_popup = addCard (dataset , deleteCard, likeCard, openPopupTypeImage);
    
    placesList.prepend(newCard_popup);
    closeModal(popupNewCard);
    evt.target.reset();
    */
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


//открытие формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = popupNameInput.value;
    profileDescription.textContent = popupJobInput.value;
    closeModal(popupEdit);
};

//Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
profileformElement.addEventListener ('submit', handleProfileFormSubmit); 

//кнопка сохраниить изменения описания профиля
editButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(popupEdit);
    popupNameInput.value = profileTitle.textContent;
    popupJobInput.value = profileDescription.textContent;
    clearValidation(popupEdit , validationConfig);
});

function editProfile(evt)  {
    evt.preventDefault;
    editPopupButton.textContent= "Сохранение...";
    patchEditProfile(profileTitle.textContent, profileDescription.textContent)
        .then(() => {
            profileTitle.textContent = popupNameInput.value;
            profileDescription.textContent = popupJobInput.value;
            closeModal(popupEdit);
        })
        .finally(() => {
            editPopupButton.textContent = "Сохранить";
        });
};

profileformElement.addEventListener("submit", editProfile);

closeOverlay(popupEdit);

//редактирование аватара
//const profileformElement = document.forms['edit-profile'];
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
    console.log('test 2');
    patchEditAvatar(editAvatarInputUrl.value)
        .then((res) => {
            console.log('test 6');
            profileImage.style.backgroundImage = `url(${res.avatar})`;
            closeModal(popupTypeEditAvatar);
            console.log('test 7');
        })
        .finally(() => {
            console.log('test 8');
            editAvatarButton.textContent = "Сохранить";
        });
};

formEditAvatar.addEventListener("submit", editAvatar);


enableValidation(validationConfig);

export {validationConfig};