import style from "./displayprice.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";

const DisplayPriceUkraine = ({ cultureInfoArray }) => {
  return (
    <>
      <table className={style.table}>
        <thead>
          <tr>
            <th>компанія</th>
            <th>ціна</th>
            <th>номер</th>
            <th>форма</th>
            <th>регіон</th>
          </tr>
        </thead>
        <tbody>
          {cultureInfoArray.map((culture, index) => (
            <tr key={index}>
              <td>{culture.company}</td>
              <td>{culture.price}</td>
              <td>{culture.contact}</td>
              <td>{culture.form}</td>
              <td>{culture.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const DisplayPriceWorld = ({ cultureInfoArray }) => {
  return (
    <div className={style.div}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>індекс</th>
            <th>ціна</th>
            <th>регіон</th>
          </tr>
        </thead>
        <tbody>
          {cultureInfoArray.map((culture, index) => (
            <>
              <tr key={index}>
                <td>{culture.indexMarket}</td>
                <td>
                  <span className={style.price}>{culture.price}</span>
                </td>
                <td>{culture.marketRegion}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DisplayPrice = ({ path, market }) => {
  const [cultureInfoArray, setCulture] = useState([]);

  useEffect(() => {
    const q = query(collection(db, path));
    const unsubscribe = onSnapshot(q, (querySnap) => {
      const tempArray = [];
      querySnap.forEach((doc) => tempArray.push(doc.data()));
      setCulture(tempArray);
    });

    return () => unsubscribe();
  }, [path]);

  return (
    <>
      {market == "World" && (
        <DisplayPriceWorld
          cultureInfoArray={cultureInfoArray}
        ></DisplayPriceWorld>
      )}
      {market == "Ukraine" && (
        <DisplayPriceUkraine
          cultureInfoArray={cultureInfoArray.slice()}
        ></DisplayPriceUkraine>
      )}
    </>
  );
};

export default DisplayPrice;
