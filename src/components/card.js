
//функция лайка и удаления карточки тут
import '../pages/index.js';
import {deleteCardOnPage, putLikeCard, deleteLikeCard} from '../components/api.js';
//import { initialCards } from '../pages/cards';
//import { openModal, closeModal, closeOverlay } from "../components/modal";
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


//Функция создания карточки
function addCard (element, likeCard, deleteCard, openPopupTypeImage , userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const popupImage = document.querySelector('.popup_type_image');
    const likeCounter = cardElement.querySelector(".like__counter");
    const cardId = element._id;
    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    likeCounter.textContent = element.likes.length;

    const nameCard = element.name;
    const linkCard = element.link;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => openPopupTypeImage(nameCard,linkCard));

    // вызов функции лайка    
    likeButton.addEventListener('click', (evt) => {
        likeCard(evt, cardId, likeCounter);
    });

    if (element.likes.length > 0) {
        likeCounter.textContent = element.likes.length;
    } else {
        likeCounter.textContent = "0";
    };

    if (element.likes.some((like) => like._id == userId)) {
        //console.log("test1");
        likeButton.classList.add("card__like-button_is-active");
        //console.log("test2");
    };

    //удаление
    if (element.owner._id === userId) {
        deleteButton.addEventListener('click', () => {
            deleteCard(element, cardElement);
        });
        } else {
            deleteButton.remove();
    };
    return cardElement;
};

function deleteCard (element, cardElement) {
    deleteCardOnPage(element._id)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        })
};

//7. Отображение количества лайков карточки
function likeCard (evt, cardId, likeCounter) {
    //console.log("test3");
    //evt.target.classList.toggle("card__like-button_is-active");
    const likeON = evt.target; //событие клика по лайку
    // если лайк имеет класс то уберем его- если нет то добавим лайк
    if (likeON.classList.contains("card__like-button_is-active")) { 
        deleteLikeCard(cardId)
        .then((res) => {
            //console.log("test5");
            likeON.classList.toggle("card__like-button_is-active");
            likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        putLikeCard(cardId)
        .then((res) => {
            likeON.classList.toggle("card__like-button_is-active");
            likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
        
    }
  
};


export { addCard, deleteCard, likeCard };





        