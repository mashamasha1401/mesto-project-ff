// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard (element, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;

    deleteButton.addEventListener('click', function() {
        deleteCard(cardElement);
    });

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard (card) {

    card.remove(); 
}

// @todo: Вывести карточки на страницz
initialCards.forEach((item) => {
    placesList.append(addCard(item, deleteCard))
});
