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

const DisplayPrice = ({ path }) => {
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
      {console.log(path, "dd")}
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
    </>
  );
};

export default DisplayPrice;
