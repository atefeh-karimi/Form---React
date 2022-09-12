import React, { useState } from "react";
// import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "./component/Button";
import "./Form.css";

function Form() {
  // const [submitted, setSubmitted] = useState(false);
  // const [valid, setValid] = useState(false);
  let schema = yup.object().shape({
    firstName: yup.string().required("پرکردن فیلد الزامی است!"),
    lastName: yup.string().required("پرکردن فیلد الزامی است!"),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
    control,
    isSubmitted,
    isValid,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
    // setSubmitted(true);
    // setValid(true);
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
      {isSubmitted && isValid ? (
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

        <Button>ارسال</Button>
      </form>
    </div>
  );
}

export default Form;