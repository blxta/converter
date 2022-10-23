import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DisplayRate from "../../components/DisplayRate";
import { DisplayPrice } from "../../components/DisplayPrice";
import { Swiper, SwiperSlide } from "swiper/react";

import style from "./displayrate.module.scss";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

//const cultures = culturesArray;

const PageMarketWorld = ({ market }) => {
  const [pathToInfo, setPathToInfo] = useState("");
  const [arrayOfCultures, setArrayOfCultures] = useState([]);
  const getPath = (path) => {
    setArrayOfCultures(path[1]);
    setPathToInfo(path[0]);
    return;
  };

  return (
    <>
      <DisplayRate market={market} createPath={getPath}></DisplayRate>
      <DisplayPrice path={pathToInfo} market={market}></DisplayPrice>
    </>
  );
};

export default PageMarketWorld;
