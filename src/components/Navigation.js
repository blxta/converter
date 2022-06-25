import React from "react";
import { useState } from "react";
import style from "./navigation.module.scss";
import DisplayRate from "./DisplayRate";

const menus = ["біржі", "майбутнє"];

const Navigation = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  return (
    <>
      <div className={style.ulx}>
        <nav className={style.nav}>
          {menus.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => setActiveNavItem(index)}
              className={
                index === activeNavItem ? style.activeItem : style.active_Item
              }
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      {activeNavItem === 0 && <DisplayRate></DisplayRate>}
    </>
  );
};

export default Navigation;
