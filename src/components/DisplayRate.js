import React from "react";
import { useState } from "react";
import { culturesArray } from "./culturesArray";
import style from "./displayrate.module.scss";

const cultures = culturesArray;

const DisplayRate = () => {
  const [activeCulture, setActiveCulture] = useState(0);

  return (
    <>
      <section>
        <div className={style.content}>
          {cultures.map((culture, index) => (
            <button
              key={index}
              onClick={() => setActiveCulture(index)}
              className={index === activeCulture ? style.active__button : ""}
            >
              {culture[0]}
            </button>
          ))}
        </div>
        <div className={style.price_div_current}>
          <span className={style.price_current}>
            {cultures[activeCulture][1]}$
          </span>
        </div>
      </section>
    </>
  );
};

export default DisplayRate;
