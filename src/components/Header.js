import React from "react";
import DisplayCourse from "./DisplayCourse";
import style from "./header.module.scss";

const Header = () => {
  return (
    <>
      <header>
        <h1 className={style.header}> Курс зерна на біржі</h1>
      </header>

      <DisplayCourse></DisplayCourse>
      <footer>Контакти</footer>
    </>
  );
};

export default Header;
