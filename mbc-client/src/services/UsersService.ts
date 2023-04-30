import axios from "axios";
import User from "../interfaces/Users";
import jwt_decode from "jwt-decode";

const api: string = process.env.REACT_APP_API || "";

//check in login
export function signinUser(user: User) {
  const data = axios.post(`${api}/login`, user);
  return data;
}

//add user in register
export function addUser(newUser: User) {
  const data = axios.post(`${api}/register`, newUser);
  return data;
}

//registration As Businesses
export function addUserBs(newUser: User) {
  const data = axios.post(`${api}/business`, newUser);
  return data;
}

//get user details
export function getUserProfile() {
  const data = axios.get(`${api}/profile`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
  return data;
}

//get isAdmin from the token
export function getIsBizUser() {
  let token = JSON.parse(sessionStorage.getItem("userData") as string).token;
  return (jwt_decode(token) as any).biz;
}
