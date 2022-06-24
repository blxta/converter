import React from "react";
import { useState } from "react";
import { culturesArray } from "./culturesArray";
import style from "./style.module.scss";

const cultures = culturesArray;

const DisplayCourse = () => {
  const [activeCulture, setActiveCulture] = useState(0);

  return (
    <div>
      <span className={style.content}>
        {cultures.map((culture, index) => (
          <button
            key={index}
            onClick={() => setActiveCulture(index)}
            className={index === activeCulture ? style.active__button : ""}
          >
            {culture[0]}
          </button>
        ))}
      </span>
      <p className={style.price_current}>{cultures[activeCulture][1]}</p>
    </div>
  );
};

export default DisplayCourse;
