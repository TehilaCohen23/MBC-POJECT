import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/Users";
import { signinUser } from "../services/UsersService";

interface LoginProps {
  setIsLogin: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setIsLogin }) => {
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      password: yup.string().min(4).max(12).required(),
      email: yup.string().email().required(),
    }),
    onSubmit: (values: User) => {
      signinUser(values)
        .then(({ data }) => {
          setIsLogin(true);
          navigate("/allCards");

          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              token: data,
            })
          );
        })
        .catch((error) => console.log(error));
    },
  });

  let navigate = useNavigate();

  return (
    <>
      <div className="container mt-4 col-md-4 text-center">
        <h5 className="display-4 text-center">Login</h5>
        <small className="mb-4">Sign in to your account</small>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="emailInput">Email</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="passwordInput">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success my-3 w-100"
            disabled={!formik.isValid || !formik.dirty}
          >
            Sign in
          </button>
          <label>
            New user? <Link to="/register"> register here</Link>
          </label>
          <br />
          <label>
            New business owner?
            <Link to="/business-register"> register here</Link>
          </label>
        </form>
      </div>
    </>
  );
};

export default Login;
