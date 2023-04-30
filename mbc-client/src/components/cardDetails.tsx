import { FunctionComponent, useEffect, useState } from "react";
import { getCardById } from "../services/CardsService";
import Card from "../interfaces/Card";
import { getUserProfile } from "../services/UsersService";

interface CardDetailsProps {
  cardId: string;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({ cardId }) => {
  let [cardData, setCardData] = useState<Card>();
  let [cardOwner, setCardOwner] = useState<string>();

  useEffect(() => {
    getCardById(cardId)
      .then((res) => setCardData(res.data))
      .catch((err) => console.log(err));

    getUserProfile()
      .then((res) => setCardOwner(res.data.name))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h4 className="mt-10 display-3 text-opacity-75">Card details:</h4>
      <div className="container">
        {cardData ? (
          <div
            key={cardData._id}
            className="card ms-2 center"
            style={{ width: "18rem" }}
          >
            <img
              className="card-img-top"
              src={cardData.image}
              alt={cardData.name}
              style={{ height: "100%" }}
            ></img>
            <div className="card-body">
              <h5 className="card-title">{cardData.name}</h5>
              <p className="card-text">{cardData.description}</p>
              <p className="card-text">{cardData.address}</p>
              <small className="card-text">{cardData.phone}</small>
              <p className="card-text text-success">Owner: {cardOwner}</p>
            </div>
          </div>
        ) : (
          <p>Error</p>
        )}
      </div>
    </>
  );
};

export default CardDetails;
