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
import { act, isCompositeComponentWithType } from "react-dom/test-utils";

const Filter = ({ getFiltered }) => {
  const [filterValues, setFilterValues] = useState({
    ok: true,
    region: undefined,
    priceMIN: undefined,
    priceMAX: undefined,
    formOfPay: undefined,
  });

  const regions = [
    { id: 1, ua: "Всі" },
    { id: 2, ua: "Вінницька" },
    { id: 3, ua: "Волинська" },
    { id: 4, ua: "Дніпровська" },
    { id: 5, ua: "Донецька" },
    { id: 6, ua: "Житомирська" },
    { id: 7, ua: "Закарпатська" },
    { id: 8, ua: "Запорізька" },
    { id: 9, ua: "Івано-Франківська" },
    { id: 10, ua: "Київська" },
    { id: 11, ua: "Кіровоградська" },
    { id: 12, ua: "Луганська" },
    { id: 13, ua: "Львівська" },
    { id: 14, ua: "Миколаївська" },
    { id: 15, ua: "Одеська" },
    { id: 16, ua: "Полтавська" },
    { id: 17, ua: "Рівненська" },
    { id: 18, ua: "Сумська" },
    { id: 19, ua: "Тернопільська" },
    { id: 20, ua: "Харківська" },
    { id: 21, ua: "Херсонська" },
    { id: 22, ua: "Хмельницька" },
    { id: 23, ua: "Черкаська" },
    { id: 24, ua: "Чернівецька" },
    { id: 25, ua: "Чернігівська" },
  ];

  useEffect(() => {
    return getFiltered(filterValues);
  }, [filterValues]);

  const handleSelectRegion = (value) => {
    value !== "Всі"
      ? setFilterValues(() => ({ ...filterValues, region: value }))
      : setFilterValues(() => ({ ...filterValues, region: undefined }));
  };

  const handleSelectFormOfPay = (value) => {
    value !== "Всі"
      ? setFilterValues(() => ({ ...filterValues, formOfPay: value }))
      : setFilterValues(() => ({ ...filterValues, formOfPay: undefined }));
  };

  const handlePriceMIN = (value = 0) => {
    value !== 0
      ? setFilterValues(() => ({ ...filterValues, priceMIN: value }))
      : setFilterValues(() => ({ ...filterValues, priceMIN: undefined }));
  };
  const handlePriceMAX = (value = 0) => {
    value !== 0
      ? setFilterValues(() => ({ ...filterValues, priceMAX: value }))
      : setFilterValues(() => ({ ...filterValues, priceMAX: undefined }));
  };

  return (
    <>
      {
        <div className={style.filter_}>
          <div className="filter-region">
            <label>Регіон:</label>
            <select
              name="region"
              onChange={(e) => handleSelectRegion(e.target.value)}
            >
              {regions.map((region) => (
                <option key={region.id} value={region.ua}>
                  {region.ua}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Ціна</label>
            <div className={style.filter__price}>
              <input
                type="number"
                placeholder="від:"
                min="0"
                onChange={(e) => handlePriceMIN(+e.target.value)}
              ></input>
              <input
                type="number"
                placeholder="до:"
                max="1000000"
                onChange={(e) => handlePriceMAX(+e.target.value)}
              ></input>
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
      }
    </>
  );
};

const Sort = () => {
  return (
    <>
      <div className={style.wrapper_sort}>
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

const Table = ({ path, filters }) => {
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const data = useGetCollection(path, filters);
  useEffect(() => {
    setDataToDisplay(data);
  });

  return (
    <>
      {dataToDisplay.length !== 0 ? (
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
      ) : (
        <> a нема миші зіли</>
      )}
    </>
  );
};

const DisplayPriceUkraine = ({ initialPath: pathToCollection }) => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFiters] = useState({});

  useEffect(() => {
    setFilterVisible(false);
    setFiters({});
  }, [pathToCollection]);

  const getFiltered = (forFilter) => {
    setFiters({ ...forFilter });
  };

  const handleClickOnFilterVisible = () =>
    setFilterVisible((current) => !current);

  return (
    <>
      <div className="panel">
        <div className={style.wrapper_sort_filter}>
          <a href="#" onClick={handleClickOnFilterVisible}>
            фільтри
          </a>
          <Sort></Sort>
        </div>
        <br></br>

        {isFilterVisible && <Filter getFiltered={getFiltered}></Filter>}
      </div>

      {pathToCollection.length !== 0 && (
        <Table path={pathToCollection} filters={filters} />
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
