import React from "react";
import { ButtonStyled } from "./styles/Button.styled";

function Button({ label }) {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <ButtonStyled type="submit">{label ? label : "ارسال"}</ButtonStyled>
      </div>
    </div>
  );
}

export default Button;
