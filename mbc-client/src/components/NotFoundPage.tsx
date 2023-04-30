import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface NotFoundPageProps {}

const NotFoundPage: FunctionComponent<NotFoundPageProps> = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="container mt-4 col-md-4 text-cente">
        <img src="../images/404.png" alt="404 error" />
        <br />
        <br />
        <div className="alert alert-success">404 - Page not found</div>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-chevron-left"></i>
          __Back
          {/* <i className="fa-solid fa-person-snowboarding"></i> */}
        </button>
      </div>
    </>
  );
};

export default NotFoundPage;
