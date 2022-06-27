import React, { useEffect } from "react";
import { useState } from "react";

import style from "./displayrate.module.scss";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

//const cultures = culturesArray;

const DisplayRate = () => {
  const [activeCulture, setActiveCulture] = useState(0);
  const [cultures, setCultures] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const querySnapshot = await getDocs(collection(db, "cultures"));
      const cul = [];
      querySnapshot.forEach((doc) => {
        cul.push(doc.data());
      });
      setCultures(cul);
    };
    fetch();
    console.log("effect over");
  }, []);

  return (
    <>
      {console.log(cultures)}
      {console.log("cultures ")}
      <div className={style.content}>
        {cultures.map((culx, index) => (
          <button
            key={index}
            onClick={() => setActiveCulture(index)}
            className={index === activeCulture ? style.active__button : ""}
          >
            {culx.name}
          </button>
        ))}
      </div>
      <div className={style.price_div_current}>
        <span className={style.price_current}>
          {cultures.length === 0 ? "" : cultures[activeCulture].cost}$
        </span>
      </div>
    </>
  );
};

export default DisplayRate;
