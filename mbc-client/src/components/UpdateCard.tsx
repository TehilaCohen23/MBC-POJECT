import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { getCardById, updateCard } from "../services/CardsService";

interface UpdateCardProps {
  cardId: string;
}

const UpdateCard: FunctionComponent<UpdateCardProps> = ({ cardId }) => {
  let [resultCard, setResultCard] = useState<Card>({
    name: "",
    description: "",
    address: "",
    phone: "",
    image: "",
  });

  let formik = useFormik({
    initialValues: {
      _id: resultCard._id,
      name: resultCard.name,
      description: resultCard.description,
      address: resultCard.address,
      phone: resultCard.phone,
      image: resultCard.image,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().min(4).max(20).required(),
      description: yup.string().min(4).max(80).required(),
      address: yup.string().min(4).max(20).required(),
      phone: yup.string().min(10).max(20).required(),
      image: yup.string().min(2).required(),
    }),
    onSubmit: (values: Card, { resetForm }) => {
      updateCard(cardId)
        .then((data) => {
          resetForm();
          navigate("/myCards");
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    getCardById(cardId)
      .then((res: any) => {
        setResultCard(res.data);
      })
      .catch((err: string) => console.log(err));
  }, [cardId]);

  let navigate = useNavigate();

  return (
    <>
      <h6 className="display-3 text-center text-primary text-opacity-75">
        Update card properties
      </h6>

      {resultCard ? (
        <div
          className="container mt-4 col-md-4 text-center"
          key={resultCard._id}
        >
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
              <label htmlFor="nameInput">Name</label>
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
              <label htmlFor="descriptionInput">Description</label>
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
              <label htmlFor="addressInput">Address</label>
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
              <label htmlFor="phoneInput">Phone</label>
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
              <label htmlFor="imageInput">Image</label>
              {formik.touched.image && formik.errors.image && (
                <p className="text-danger">{formik.errors.image}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-outline-success my-3 w-100"
            >
              Update Card
            </button>
          </form>
        </div>
      ) : (
        <p className="text-primary display-3">No card Data</p>
      )}
    </>
  );
};

export default UpdateCard;
