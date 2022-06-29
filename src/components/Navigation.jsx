import React, { useEffect } from "react";
import { useState } from "react";
import style from "./navigation.module.scss";
import DisplayRate from "./DisplayRate";
import { Link } from "react-router-dom";
import PageMarketWorld from "../pages/pageMarketWorld/PageMarketWorld";
import PageMarketUkraine from "../pages/pageMarketUkraine/PageMarketUkraine";
import PageNews from "../pages/pageNews/PageNews";
import PageTaxes from "../pages/pageTaxes/PageTaxes";
const menus = ["біржі", "україна", "новини", "податки/облік"];

const Navigation = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);

  const switchNav = () => {
    switch (activeNavItem) {
      case 0:
        return <PageMarketWorld></PageMarketWorld>;
      case 1:
        return <PageMarketUkraine></PageMarketUkraine>;
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
            <a
              key={index}
              href="#"
              onClick={() => setActiveNavItem(index)}
              className={
                index === activeNavItem
                  ? style.nav_activeItem
                  : style.nav_non_activeItem
              }
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      {switchNav()}
    </>
  );
};

export default Navigation;
