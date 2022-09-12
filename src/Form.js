import React from "react";
// import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./Form.css";

function Form() {
  let schema = yup.object().shape({
    firstName: yup.string().required("پرکردن فیلد الزامی است!"),
    lastName: yup.string().required("پرکردن فیلد الزامی است!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { isSubmitting, isSubmitted } = formState;

  const onSubmit = (data, e) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        reset();
      }, 2000);
    });
  };

  const selectCountryOptions = [
    { value: "ایران", label: "ایران" },
    { value: "امریکا", label: "امریکا " },
  ];

  const selectCityOptions = [
    { value: "تهران", label: "تهران" },
    { value: "اصفهان", label: "اصفهان " },
  ];

  return (
    <div className="containerForm">
      {isSubmitted ? (
        <div className="alert alert-success" role="alert">
          ارسال فرم با موفقیت انجام شد!
        </div>
      ) : null}

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
              <small className="text-danger">{errors.firstName?.message}</small>
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
              <small className="text-danger">{errors.lastName?.message}</small>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <div className="form-group  column-4">
              <label className="mb-2">کشور :</label>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    ref={register}
                    options={selectCountryOptions}
                    {...field}
                    placeholder="انتخاب کنید"
                  />
                )}
              />
            </div>
          </div>
          <div className="col">
            {" "}
            <div className="form-group column-4 ">
              <label className="mb-2">شهر :</label>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    options={selectCityOptions}
                    {...field}
                    placeholder="انتخاب کنید"
                  />
                )}
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
            disabled={isSubmitting || isSubmitted}
            className="btn btn-success mr-1"
          >
            ارسال
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
