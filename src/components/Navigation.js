import React from "react";
import { useState } from "react";
import style from "./navigation.module.scss";
import DisplayRate from "./DisplayRate";

const menus = ["біржі", "україна", "майбутнє"];

const Navigation = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  return (
    <>
      <nav>
        <ul className={style.menu}>
          {menus.map((item, index) => (
            <li>
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
            </li>
          ))}
        </ul>
      </nav>
      {activeNavItem === 0 && <DisplayRate></DisplayRate>}
    </>
  );
};

export default Navigation;
