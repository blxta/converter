import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DisplayRate from "../../components/DisplayRate";
import style from "./displayrate.module.scss";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

//const cultures = culturesArray;

const PageMarketUkraine = () => {
  return (
    <>
      <DisplayRate market="Ukraine"></DisplayRate>
      <div> фільтр область (вся україна), культури прєдложенія</div>
    </>
  );
};

export default PageMarketUkraine;
