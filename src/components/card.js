
//функция лайка и удаления карточки тут
import '../pages/index.js';
//import { initialCards } from '../pages/cards';
//import { openModal, closeModal, closeOverlay } from "../components/modal";
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
function addCard (element, deleteCard, likeCard, openPopupTypeImage ) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const popupImage = document.querySelector('.popup_type_image');

    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;

    deleteButton.addEventListener('click', function() {
        deleteCard(cardElement);
    });
    
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);
    
    const NameCard = element.name;
    const LinkCard = element.link;
    //console.log(NameCard,LinkCard);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => openPopupTypeImage(NameCard,LinkCard));

    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard (card) {
    card.remove(); 
}

// @todo: Вывести карточки на страницz
//initialCards.forEach((item) => {
//    placesList.append(addCard(item, deleteCard, likeCard, openPopupTypeImage ))
//});

//функция лайка
function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};


export { addCard, deleteCard, likeCard };

