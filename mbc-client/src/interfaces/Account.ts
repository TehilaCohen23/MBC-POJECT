import Card from "./Card";

export default interface Account {
  id?: string;
  userId: string;
  userCards: Card[];
}
