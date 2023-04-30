import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API || "";

// add new card
export function addCard(newCard: Card) {
  return axios.post(`${api}/cards`, newCard, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

//get all cards
export function getAllCards() {
  return axios.get(`${api}/cards`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

//get card by cardId
export function getCardById(id: string) {
  const userCards = axios.get(`${api}/cardsOne/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
  return userCards;
}

//update card by card id
export function updateCard(cardId: string) {
  return axios.put(`${api}/cards/${cardId}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

//delete card
export function deleteCard(cardId: string) {
  return axios.delete(`${api}/cards/${cardId}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
