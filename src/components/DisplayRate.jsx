import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import DisplayPrice from "./DisplayPrice";
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
      {cultures.length === 0 ? (
        ""
      ) : (
        <DisplayPrice price={cultures[activeCulture].price} />
      )}
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
            <Link
              //to={`${props.market}/${culx.culture}`}
              to={"#"}
              key={index}
              onClick={() => setActiveCulture(index)}
              className={
                index === activeCulture
                  ? style.display_buttonActive
                  : style.display_buttonNonActive
              }
            >
              {culx.culture}
            </Link>
          ))}
        </nav>
      </div>
      {props.market === "marketWorld" ? marketType() : null}
    </>
  );
};

export default DisplayRate;
