import axios from "axios";

const api: string = process.env.REACT_APP_API || "";

//get user's cards by userId
export function getCardsByUserId(userId: string) {
  let data: any = axios.get(`${api}/cards/${userId}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });

  return data;
}
