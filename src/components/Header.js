import React from "react";

import style from "./header.module.scss";

const Header = () => {
  return (
    <header>
      <h1 className={style.header}> ціна зерна</h1>
      <hr></hr>
    </header>
  );
};

export default Header;
