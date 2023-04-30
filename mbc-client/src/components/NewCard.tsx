import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { addCard } from "../services/CardsService";
import { useNavigate } from "react-router-dom";

interface NewCardProps {}

const NewCard: FunctionComponent<NewCardProps> = () => {
  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      phone: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().min(4).max(30).required(),
      description: yup.string().min(5).max(120).required(),
      address: yup.string().min(6).max(20).required(),
      phone: yup.string().min(10).max(15).required(),
      image: yup.string().min(2).required(),
    }),
    onSubmit: (values: Card, { resetForm }) => {
      addCard(values)
        .then(({ data }) => {
          resetForm();
          navigate("/myCards");
        })
        .catch((err) => console.log(err));
    },
  });
  let navigate = useNavigate();
  return (
    <>
      <div className="container mt-4 col-md-4 text-center">
        <h6 className="display-3 text-center text-primary text-opacity-75">
          Create a new card
        </h6>

        <p className="text-center text-primary text-opacity-75">
          Create a new card for your business:
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="businessName"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="nameInput">Business name</label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-warning">{formik.errors.name}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="descriptionInput"
              placeholder="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="descriptionInput">Business description</label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-warning">{formik.errors.description}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="addressInput"
              placeholder="frankfurt"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="addressInput">Business address</label>
            {formik.touched.address && formik.errors.address && (
              <p className="text-warning">{formik.errors.address}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="phoneInput"
              placeholder="businessPhone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="phoneInput">Business phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-warning">{formik.errors.phone}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="imageInput"
              placeholder="..."
              name="image"
              onChange={formik.handleChange}
              value={formik.values.image}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="imageInput">Business image</label>
            {formik.touched.image && formik.errors.image && (
              <p className="text-danger">{formik.errors.image}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-outline-success my-3 w-100"
            disabled={!formik.touched || !formik.isValid}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewCard;
