import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="container mt-4 col-md-8 text-center m-4">
        <img
          src="../images/MBCLogo(jpg).jpg"
          className="img-fluid"
          alt="logo"
        />
        <div className="btn1">
          <button
            className="btn btn-outline-success w-40"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
        <div className="btn2 m-4">
          <button
            className="btn btn-outline-success w-40"
            onClick={() => navigate("/register")}
          >
            website registration
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
