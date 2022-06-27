import React, { useEffect } from "react";
import { useState } from "react";
import style from "./navigation.module.scss";
import DisplayRate from "./DisplayRate";

const menus = ["біржі", "майбутнє"];

const Navigation = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);

  useEffect(() => console.log("useeffect navigation "), []);
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
      {console.log("call display")}
      {activeNavItem === 0 && <DisplayRate></DisplayRate>}
      {/* {activeNavItem ? console.log(activeNavItem) : console.log(activeNavItem)} */}
    </>
  );
};

export default Navigation;
