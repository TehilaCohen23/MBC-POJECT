import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Business from "./components/Business";
import NotFoundPage from "./components/NotFoundPage";
import MyCards from "./components/MyCards";
import AllCards from "./components/AllCards";
import NewCard from "./components/NewCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import Home from "./components/home";
import UpdateCard from "./components/UpdateCard";
import Profile from "./components/Profile";
import jwt_decode from "jwt-decode";
import CardDetails from "./components/cardDetails";

export let userConnected = createContext(false);

function App() {
  let [isLogin, setIsLogin] = useState<boolean>(false);

  let [isBusinessUser, setIsBusinessUser] = useState<boolean>(false);
  let [cardId, setCardId] = useState<string>("");
  let [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userData") as string) === null) {
      setIsBusinessUser(false);
    } else {
      let token = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).token;
      let info: boolean | any = jwt_decode(token);
      let payload = info.biz;
      setIsBusinessUser(payload);

      let userId = info.id;
      setUserId(userId);
    }
  }, [isLogin]);

  return (
    <div className="App">
      <Router>
        <userConnected.Provider value={isLogin}>
          <Navbar isLogin={isLogin} isBusinessUser={isBusinessUser} />
        </userConnected.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/business-register" element={<Business />} />
          <Route
            path="/myCards"
            element={
              <MyCards
                cardId={String(cardId)}
                setCardId={setCardId}
                userId={String(userId)}
              />
            }
          />

          <Route
            path="/allCards"
            element={<AllCards cardId={String(cardId)} setCardId={setCardId} />}
          />
          <Route path="/newCard" element={<NewCard />} />
          <Route
            path="/updateCard"
            element={<UpdateCard cardId={String(cardId)} />}
          />
          <Route
            path="/cardDetails"
            element={<CardDetails cardId={String(cardId)} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
