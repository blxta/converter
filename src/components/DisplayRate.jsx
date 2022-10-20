import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { DisplayPrice } from "./DisplayPrice";
import style from "./displayrate.module.scss";
import { db } from "../firebase/config";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";

const DisplayRate = ({ market, createPath }) => {
  const [activeCulture, setActiveCulture] = useState(0);
  const [cultures, setCultures] = useState([""]);

  useEffect(() => {
    const fetchCulturesName = async () => {
      const querySnapshot = await getDocs(
        collection(db, "market".concat(market))
      );
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

  useEffect(() => {
    const getPathToInfo = () =>
      "market".concat(
        market.concat(
          "/",
          cultures[activeCulture][0],
          "/",
          cultures[activeCulture][0],
          "List"
        )
      );

    createPath(() => getPathToInfo());
  });

  const renderMobileVersion = useMediaQuery({ query: "(max-width: 600px)" });
  const renderOthersVersion = useMediaQuery({ query: "(min-width: 600px)" });
  return (
    <>
      <div className={style.content_display_rate}>
        {renderMobileVersion && (
          <>
            <select
              name="mobile_select"
              onChange={(e) => setActiveCulture(e.target.value)}
            >
              {cultures.map((culx, index) => (
                <option key={index} value={index}>
                  {culx[1]}
                </option>
              ))}
            </select>
          </>
        )}
        {renderOthersVersion && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default DisplayRate;
