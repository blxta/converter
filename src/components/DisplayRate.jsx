import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import style from "./displayrate.module.scss";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

//const cultures = culturesArray;
//добавить юз мемо шоб дохуя раз не обновлять компонент
const DisplayRate = (props) => {
  const [activeCulture, setActiveCulture] = useState(0);
  const [cultures, setCultures] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const querySnapshot = await getDocs(collection(db, props.market));
      const cul = [];
      querySnapshot.forEach((doc) => {
        cul.push(doc.data());
      });
      setCultures(cul);
    };
    fetch();
    // console.log(props.fire);
  }, []);

  const marketType = () => (
    <>
      <div className={style.price_div_current}>
        <span className={style.price_current}>
          {cultures.length === 0 ? "" : cultures[activeCulture].price}$
        </span>
      </div>
    </>
  );

  return (
    <>
      {
        //console.log(cultures)
      }
      {
        //console.log("cultures ")
      }
      <div className={style.content_display_rate}>
        <nav className={style.nav_display_rate}>
          {cultures.map((culx, index) => (
            <a
              //   to={`${culx.name}`}
              key={index}
              href="#"
              onClick={() => setActiveCulture(index)}
              className={
                index === activeCulture
                  ? style.display_buttonActive
                  : style.display_buttonNonActive
              }
            >
              {culx.culture}
            </a>
          ))}
        </nav>
      </div>
      {props.market === "marketWorld" ? marketType() : null}
    </>
  );
};

export default DisplayRate;
