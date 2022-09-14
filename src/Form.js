import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./Form.css";
//Copy paste is your friend, but you have to understand what you are doing.

function Form() {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  let schema = yup.object().shape({
    firstName: yup.string().required("پرکردن فیلد الزامی است!"),
    lastName: yup.string().required("پرکردن فیلد الزامی است!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data, e) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="containerForm">
      {isSubmitted && isValid ? (
        <div className="text-center">
          {" "}
          <div className="alert alert-success" role="alert">
            ارسال فرم با موفقیت انجام شد!
          </div>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="col">
              <div className="form-group column-3 ">
                <label>نام :</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("firstName")}
                />
                <small className="text-danger">
                  {errors.firstName?.message}
                </small>
              </div>
            </div>
            <div className="col">
              <div className="form-group column-3 ">
                <label>نام خانوادگی :</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("lastName")}
                />
                <small className="text-danger">
                  {errors.lastName?.message}
                </small>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <div className="form-group  column-4">
                <label className="mb-2">کشور :</label>
                <br />
                <CountryDropdown
                  className="selectContry"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  defaultOptionLabel="Country"
                />
              </div>
              <br />
              <div className="form-group column-4 ">
                <label className="mb-2">شهر :</label>
                <RegionDropdown
                  disableWhenEmpty={false}
                  country={country}
                  style={{
                    padding: "6px 5px",
                    marginRight: "8px",
                    border: "1px solid lightgray",
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                  value={city}
                  onChange={(val) => setCity(val)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            {selectedImage ? (
              <div className="deleteUpload">
                <button
                  className="btn btn-danger"
                  onClick={() => setSelectedImage(null)}
                >
                  حذف
                </button>

                <img
                  style={{ width: "50px", height: "50px" }}
                  className="me-2"
                  alt="پیدانشد"
                  src={URL.createObjectURL(selectedImage)}
                />
              </div>
            ) : (
              <div>
                <label
                  className="pe-2 custom-file-input"
                  htmlFor="file"
                ></label>

                <input
                  id="file"
                  type="file"
                  name="myImage"
                  accept="image/*"
                  style={{ visibility: "hidden" }}
                  onChange={(event) => {
                    if (event.target.files[0].size > 2000000) {
                      alert("file is large");
                    } else {
                      setSelectedImage(event.target.files[0]);
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button
              disabled={!isValid || isSubmitting || isSubmitted}
              className="btn btn-success mr-1"
            >
              ارسال
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;
