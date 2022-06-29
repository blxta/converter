import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DisplayRate from "../../components/DisplayRate";
import style from "./displayrate.module.scss";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

//const cultures = culturesArray;

const PageMarketUkraine = () => {
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
      <DisplayRate market="marketUkraine"></DisplayRate>
      <div>таблиця хтмл</div>
    </>
  );
};

export default PageMarketUkraine;
