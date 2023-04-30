import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import User from "../interfaces/Users";
import { addUser } from "../services/UsersService";
import { Link, useNavigate } from "react-router-dom";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().email().min(2).required(),
      password: yup.string().min(5).max(12).required(),
      name: yup.string().min(4).required(),
    }),
    onSubmit: (values: User) => {
      addUser({ ...values })
        .then(({ data }) => {
          sessionStorage.setItem("isRegister", "true");
          navigate("/login");
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="container mt-4 col-md-4 text-center">
      <h5 className="display-4 text-center">Register</h5>
      <small className="mb-4">Create an account (regular customer)</small>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="John"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="nameInput">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="John@mail.com"
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
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="password"
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
          className="btn btn-success mb-3 w-100"
          disabled={!formik.isValid || !formik.dirty}
        >
          Sign Up
        </button>
        <label>
          Already have user? <Link to="/login"> login here</Link>
        </label>
        <br />
        <label>
          Business owner? <Link to="/business-register">register here</Link>
        </label>
      </form>
    </div>
  );
};

export default Register;
