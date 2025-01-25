
const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
        authorization: '56d241cf-c0ed-461f-8b00-1a56473c4eee',
        "Content-Type": "application/json"
    }
};

//Загрузка информации о пользователе с сервера
async function getUsers () {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'GET',
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    
};

//getUsers();


//4. Загрузка карточек с сервера
const getCards = async() => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'GET',
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
};

//getCards();



 //5. Редактирование профиля

const patchEditProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
};

//6. Добавление новой карточки

const postNewCard = (newName, newLink) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: newName,
        link: newLink,
      }),
    }) 
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  };

 // postNewCard();

 //8. Удаление карточки
 const deleteCardOnPage = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
 };
 deleteCardOnPage();

 //9. Постановка и снятие лайка
const putLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
};


const deleteLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
};


//10. Обновление аватара пользователя
const patchEditAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
};


export {getUsers, getCards, postNewCard, 
    patchEditProfile, deleteCardOnPage, 
    putLikeCard, deleteLikeCard, patchEditAvatar };
