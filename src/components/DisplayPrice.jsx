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
  connectFirestoreEmulator,
} from "firebase/firestore";

const FilterForPageUkraine = ({ getData, pathToGetData }) => {
  const [g, setG] = useState([]);

  const [q] = useGetCollection(pathToGetData, {});

  const regions = [
    //send this on server
    [1, { ua: "Всі" }],
    [2, { ua: "Вінницька" }],
    [3, { ua: "Волинська" }],
    [4, { ua: "Дніпровська" }],
    [5, { ua: "Донецька" }],
    [6, { ua: "Житомирська" }],
    [7, { ua: "Закарпатська" }],
    [8, { ua: "Запорізька" }],
    [9, { ua: "Івано-Франківська" }],
    [10, { ua: "Київська" }],
    [11, { ua: "Кіровоградська" }],
    [12, { ua: "Луганська" }],
    [13, { ua: "Львівська" }],
    [14, { ua: "Миколаївська" }],
    [15, { ua: "Одеська" }],
    [16, { ua: "Полтавська" }],
    [17, { ua: "Рівненська" }],
    [18, { ua: "Сумська" }],
    [19, { ua: "Тернопільська" }],
    [20, { ua: "Харківська" }],
    [21, { ua: "Херсонська" }],
    [22, { ua: "Хмельницька" }],
    [23, { ua: "Черкаська" }],
    [24, { ua: "Чернівецька" }],
    [25, { ua: "Чернігівська" }],
  ];

  const [filter, setFilter] = useState({
    region: "Всі",
    priceMIN: 0,
    priceMAX: 0,
    formOfPay: "Всі",
  });

  const handleSelectRegion = (value) => {
    // setFilter({ ...filter, region: value });
  };

  const handleSelectFormOfPay = (value) => {
    // setFilter({ ...filter, formOfPay: value });
  };
  return (
    <>
      <div className={style.filter_}>
        <div className="filter-region">
          <label>Регіон:</label>
          <select
            name="region"
            onChange={(e) => handleSelectRegion(e.target.value)}
          >
            {regions.map((x) => (
              <option key={x[0]} value={x[1]["ua"]}>
                {x[1]["ua"]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ціна</label>
          <div className={style.filter__price}>
            <input type="number" placeholder="від:" min="0"></input>
            <input type="number" placeholder="до:" max="1000000"></input>
          </div>
        </div>
        <div className="filter-form-of-pay">
          <label>Форма оплати:</label>
          <select
            name="form-of-pay"
            onChange={(e) => handleSelectFormOfPay(e.target.value)}
          >
            <option>Всі</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
      </div>
      {console.log("сработало = ", q)}
    </>
  );
};
const DisplayPriceUkraine = ({ initialPath: path }) => {
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const getDataAfterFiltering = (data) => setDataToDisplay(data);

  return (
    <>
      <FilterForPageUkraine
        getData={getDataAfterFiltering}
        pathToGetData={path}
      ></FilterForPageUkraine>
      <br></br>
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
          {dataToDisplay.map((culture, index) => (
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

const DisplayPriceWorld = ({ initialPath: path }) => {
  const cultureInfoArray = useGetCollection(path);
  return (
    <>
      {console.log(cultureInfoArray)}
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
  return (
    <>
      {market == "World" && (
        <DisplayPriceWorld initialPath={path}></DisplayPriceWorld>
      )}
      {market == "Ukraine" && (
        <DisplayPriceUkraine initialPath={path}></DisplayPriceUkraine>
      )}
    </>
  );
};

export { DisplayPrice, DisplayPriceUkraine, DisplayPriceWorld };
