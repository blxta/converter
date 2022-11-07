import React, { useEffect } from "react";
import { useState } from "react";
import style from "./navigation.module.scss";
import DisplayRate from "./DisplayRate";
import { Link, Routes, Route } from "react-router-dom";
import PageMarketWorld from "../pages/pageMarketWorld/PageMarketWorld";
import PageMarketUkraine from "../pages/pageMarketUkraine/PageMarketUkraine";
import PageNews from "../pages/pageNews/PageNews";
import PageTaxes from "../pages/pageTaxes/PageTaxes";
import Income from "./IncomeToUkraine";
const menus = [
  ["біржі", "marketWorld"],
  ["україна", "marketUkraine"],
  ["новини", "news"],
  ["податки", "taxes"],
];

const Navigation = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);

  const switchNav = () => {
    switch (activeNavItem) {
      case 0:
        return <PageMarketWorld market="World"></PageMarketWorld>;
      case 1:
        return <PageMarketUkraine market="Ukraine"></PageMarketUkraine>;
      case 2:
        return <PageNews></PageNews>;
      case 3:
        return <PageTaxes></PageTaxes>;
    }
  };

  return (
    <>
      <div className={style.content_navigator}>
        <nav className={style.nav_navigation}>
          {menus.map((item, index) => (
            <Link
              key={index}
              to={`${item[1]}`}
              onClick={() => setActiveNavItem(index)}
              className={
                index === activeNavItem
                  ? style.nav_activeItem
                  : style.nav_non_activeItem
              }
            >
              {item[0]}
            </Link>
          ))}
        </nav>
        {/* <Income></Income> */}
      </div>

      {switchNav()}
    </>
  );
};

export default Navigation;
