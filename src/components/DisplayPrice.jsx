import React from "react";
import style from "./displayprice.module.scss";

const DisplayPrice = (props) => {
  return (
    <div className={style.price_div_current}>
      <span className={style.price_current}>{props.price}$</span>
      <div>
        {" "}
        додати список бірж в виді індекс, де знаходиться для цього треба парсить
        інфу з сайта
      </div>
    </div>
  );
};

export default DisplayPrice;
