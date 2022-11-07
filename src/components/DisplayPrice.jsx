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
import { isCompositeComponentWithType } from "react-dom/test-utils";

const FilterForPageUkraine = ({ getData, pathToGetData }) => {
  const dataForDisplay = useGetCollection(pathToGetData);

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
      {getData(dataForDisplay)}
      {dataForDisplay.length !== 0 && (
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
      )}
    </>
  );
};

const Table = ({ dataToDisplay }) => {
  return (
    <>
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

const ElementSortingDataToDisplay = () => {
  return (
    <>
      <div style={style.wrapper_sort}>
        <label>сортування:</label>
        <select>
          <option>оберіть</option>
          <option>дата новіша</option>
          <option>дата старіша</option>
          <option>ціна зростання</option>
          <option>ціна спадання</option>
          <option>обєм більший</option>
          <option>обєм менший</option>
          <option>компанія а-я</option>
          <option>компанія я-а</option>
        </select>
      </div>
    </>
  );
};

const DisplayPriceUkraine = ({ initialPath: pathToCollection }) => {
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const getDataAfterFiltering = (data) => setDataToDisplay(data);

  return (
    <>
      <div className={style.wrapper_sort_filter}>
        <a href="#">фільтри</a>
        <ElementSortingDataToDisplay></ElementSortingDataToDisplay>
      </div>
      <br></br>
      <FilterForPageUkraine
        getData={getDataAfterFiltering}
        pathToGetData={pathToCollection}
      ></FilterForPageUkraine>
      {dataToDisplay.length !== 0 ? (
        <Table dataToDisplay={dataToDisplay} />
      ) : (
        <span
          style={{
            display: "inline-block",
            width: "100%",
            textAlign: "center",
          }}
        >
          А нема, миші зіли!
        </span>
      )}
    </>
  );
};

const DisplayPriceWorld = ({ initialPath: path }) => {
  const cultureInfoArray = useGetCollection(path);
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
                    <span className={style.price}>
                      {culture.price + "\u0024" + "/тн"}
                    </span>
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
