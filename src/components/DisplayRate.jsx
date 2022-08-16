import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import DisplayPrice from "./DisplayPrice";
import style from "./displayrate.module.scss";
import { db } from "../firebase/config";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";

const DisplayRate = (props) => {
  const [activeCulture, setActiveCulture] = useState(0);
  const [cultures, setCultures] = useState(["", ""]);

  useEffect(() => {
    const fetchCulturesName = async () => {
      const querySnapshot = await getDocs(collection(db, props.market));
      const cul = [];
      querySnapshot.forEach((doc) => {
        let id = doc.id;
        let ua = doc.data().ua;
        cul.push([id, ua]);
      });
      setCultures(cul);
    };
    fetchCulturesName();
  }, [activeCulture]);

  const getPathToInfo = () =>
    props.market.concat(
      "/",
      cultures[activeCulture][0],
      "/",
      cultures[activeCulture][0],
      "List"
    );

  return (
    <>
      <div className={style.content_display_rate}>
        <nav className={style.nav_display_rate}>
          {cultures.map((culx, index) => (
            <Link
              to={"#"}
              key={index}
              onClick={() => setActiveCulture(index)}
              className={
                index === activeCulture
                  ? style.display_buttonActive
                  : style.display_buttonNonActive
              }
            >
              {culx[1]}
            </Link>
          ))}
        </nav>
      </div>
      {<DisplayPrice path={getPathToInfo()} />}
    </>
  );
};

export default DisplayRate;
