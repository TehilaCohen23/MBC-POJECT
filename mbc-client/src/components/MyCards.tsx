import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../interfaces/Card";
import { deleteCard, updateCard } from "../services/CardsService";
import { getCardsByUserId } from "../services/AccountService";

interface MyCardsProps {
  cardId: string;
  setCardId: Function;
  userId: string;
}

const MyCards: FunctionComponent<MyCardsProps> = ({
  setCardId,
  cardId,
  userId,
}) => {
  let [userCards, setUserCards] = useState<Card[]>([]);
  let [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    getCardsByUserId(userId)
      .then((response: any) => {
        setUserCards(response.data);
      })
      .catch((err: any) => console.log(err));
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    getCardsByUserId(userId)
      .then((response: any) => {
        setUserCards(response.data);
        setDeleted(false);
      })
      .catch((err: any) => console.log(err));
  }, [deleted]);

  return (
    <>
      <h4 className="mt-10 display-6 text-opacity-75">My Cards</h4>
      <button
        className="btn btn-success w-35 d-flex"
        onClick={() => navigate("/newCard")}
      >
        Add new card
      </button>

      {userCards ? (
        <div className="container">
          <div className="row">
            {userCards.map((card: Card) => (
              <div
                key={card._id}
                className="card ms-2"
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src={card.image}
                  alt={card.name}
                  style={{ height: "100%" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.description}</p>
                  <p className="card-text">{card.address}</p>
                  <p className="card-text">{card.phone}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      setCardId(String(card._id));
                      updateCard(cardId).catch((err) => console.log(err));
                      navigate("/updateCard");
                    }}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setCardId(card._id);
                      deleteCard(String(card._id)).catch((err) =>
                        console.log(err)
                      );
                      setDeleted(true);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>

                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      navigate("/cardDetails");
                      setCardId(card._id);
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <small> More information </small>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-primary display-3">No data found</p>
      )}
    </>
  );
};

export default MyCards;
