import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./Form.css";

function Form() {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();

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
                <CountryDropdown
                  value={country}
                  style={{
                    padding: "8px 5px",
                    marginRight: "8px",
                    border: "1px solid lightgray",
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
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
          <div className="form-group ">
            <label className="pe-2">آپلود عکس :</label>
            <input type="file" />
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
