import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DisplayRate from "../../components/DisplayRate";
import style from "./displayrate.module.scss";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { DisplayPrice } from "../../components/DisplayPrice";

//const cultures = culturesArray;

const FilterForPageUkraine = () => {
  return (
    <>
      <div>
        <div className="filter-region">
          <label>Регіон:</label>
          <select name="region">
            <option>Всі</option>
            <option>АР Крим</option>
            <option>Вінницька</option>
            <option>Волинська</option>
            <option>Дніпровска</option>
            <option>Донецька</option>
            <option>Житомирська</option>
            <option>Закарпатьска</option>
            <option>Запорізька</option>
            <option>Івано-Франківська</option>
            <option>Київська</option>
            <option>Кіровоградська</option>
            <option>Луганська</option>
            <option>Львівська</option>
            <option>Миколаївська</option>
            <option>Одеська</option>
            <option>Полтавська</option>
            <option>Рівненська</option>
            <option>Сумська</option>
            <option>Тернопільска</option>
            <option>Харківська</option>
            <option>Херсонська</option>
            <option>Хмельницька</option>
            <option>Черкаська</option>
            <option>Чернівецька</option>
          </select>
        </div>
        <div className="filter-price">
          <label>Ціна</label>
          <div>
            <input type="number" placeholder="від:"></input>
            <input type="number" placeholder="до:"></input>
          </div>
        </div>
        <div className="filter-form">
          <label>Форма оплати:</label>
          <select name="form">
            <option>Всі</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
      </div>
    </>
  );
};

const PageMarketUkraine = ({ market }) => {
  const [pathToInfo, setPathToInfo] = useState("");
  const getPath = (path) => setPathToInfo(path);

  return (
    <>
      <DisplayRate market={market} createPath={getPath}></DisplayRate>
      <DisplayPrice path={pathToInfo} market={market}></DisplayPrice>
    </>
  );
};

export default PageMarketUkraine;
