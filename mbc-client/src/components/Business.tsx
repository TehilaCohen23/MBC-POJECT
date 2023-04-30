import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import User from "../interfaces/Users";
import { addUserBs } from "../services/UsersService";
import { Link, useNavigate } from "react-router-dom";

interface BusinessProps {}

const Business: FunctionComponent<BusinessProps> = () => {
  let formik = useFormik({
    initialValues: { email: "", password: "", name: "", businessName: "" },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(5).max(12).required(),
      name: yup.string().min(4).required(),
      businessName: yup.string().min(4).required(),
    }),
    onSubmit: (values: User) => {
      addUserBs({ ...values })
        .then(({ data }) => {
          sessionStorage.setItem("isSignUp", "true");
          // newAccount(data.id);
          navigate("/login");
        })
        .catch((error) => console.log(error));
    },
  });

  let navigate = useNavigate();

  return (
    <>
      <div className="container mt-4 col-md-4 text-center">
        <h5 className="display-5 text-center">Registration as businesses</h5>
        <small className="mb-4">Create a business account</small>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="bNameInput"
              placeholder="Business name"
              name="businessName"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="bNameInput">Business name</label>
            {formik.touched.businessName && formik.errors.businessName && (
              <p className="text-danger">{formik.errors.businessName}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="name"
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
            Already have user? <Link to="/login"> login here</Link>
          </label>
          <br />
          <label>
            Not a business owner? <Link to="/register">register here</Link>
          </label>
        </form>
      </div>
    </>
  );
};

export default Business;
