import style from "./displayprice.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCollection } from "../hook/getDataFromFirebase";

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
            <th>дата</th>
            <th>об"єм</th>
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
              <td>дата поправить</td>
              <td>{culture.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const DisplayPriceWorld = ({ cultureInfoArray }) => {
  return (
    <>
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

const DisplayPrice = ({ path, market }) => {
  const cultureInfoArray = useGetCollection(path);

  return (
    <>
      {console.log(cultureInfoArray)}
      {/* {market == "World" && (
        <DisplayPriceWorld
          cultureInfoArray={cultureInfoArray}
          //path={path}
        ></DisplayPriceWorld>
      )} */}
      {market == "Ukraine" && (
        <DisplayPriceUkraine
          cultureInfoArray={cultureInfoArray}
        ></DisplayPriceUkraine>
      )}
    </>
  );
};

export { DisplayPrice, DisplayPriceUkraine, DisplayPriceWorld };
