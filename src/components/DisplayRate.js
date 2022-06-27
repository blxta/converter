import React, { useEffect } from "react";
import { useState } from "react";
import { culturesArray } from "./culturesArray";
import style from "./displayrate.module.scss";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
//const cultures = culturesArray;

const DisplayRate = () => {
  const [activeCulture, setActiveCulture] = useState(0);
  const [cultures, setCultures] = useState(null);

  async function f() {
    const querySnapshot = await getDocs(collection(db, "cultures"));
    const cul = [];
    querySnapshot.forEach((doc) => {
      cul.push(doc.data());
    });
    setCultures(cul);
    console.log(cultures);
  }

  return (
    <>
      <div>
        <button onClick={() => f()}>click</button>
      </div>
      <div className={style.content}>
        {cultures.map((cul, index) => (
          <button
            key={index}
            onClick={() => setActiveCulture(index)}
            className={index === activeCulture ? style.active__button : ""}
          >
            {cul[0]}
          </button>
        ))}
      </div>
      <div className={style.price_div_current}>
        <span className={style.price_current}>
          {cultures[activeCulture][1]}$
        </span>
      </div>
    </>
  );
};

export default DisplayRate;
