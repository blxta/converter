import React from "react";
import style from "./displayprice.module.scss";

const DisplayPrice = ({ price }) => {
  return (
    <div className={style.div_display}>
      <ul className={style.li_display}>
        <li>
          <span>index</span>
          <span>market</span>
          <span>{price}$</span>
        </li>
      </ul>
    </div>
  );
};

export default DisplayPrice;
