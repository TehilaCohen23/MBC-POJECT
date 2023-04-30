import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLogin: boolean;
  isBusinessUser: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  isLogin,
  isBusinessUser,
}) => {
  let navigate = useNavigate();

  function isLogout() {
    navigate("/");
    sessionStorage.clear();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-success bg-opacity-50">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink className="navbar-brand" to="#">
            MBC <i className="fa-solid fa-id-card-clip"></i>
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {!isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {!isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {!isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/business-register">
                    Register business
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/allCards">
                    All cards
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {isLogin && isBusinessUser ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myCards">
                    My cards
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {isLogin && isBusinessUser ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/newCard">
                    New card
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}
              {isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}
            </ul>

            <form className="d-flex" role="search">
              {isLogin === true ? (
                <button
                  className="btn btn-outline-light bg-opacity-25 logout"
                  type="submit"
                  onClick={() => isLogout()}
                >
                  Logout
                </button>
              ) : (
                <small></small>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
