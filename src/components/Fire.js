import React, { useEffect } from "react";
import { useState } from "react";
import { culturesArray } from "./culturesArray";
import style from "./displayrate.module.scss";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
//const cultures = culturesArray;

const Fire = () => {
  const [activeCulture, setActiveCulture] = useState(2);
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
    console.log("data fetch");
  }, []);

  return (
    <>
      {console.log("render component")}
      {console.log(cultures)}
      <div>
        {cultures.map((x) => (
          <li>
            {x.name},{x.cost}
          </li>
        ))}
      </div>
    </>
  );
};

export default Fire;
