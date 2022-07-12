import React from "react-dom";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Contact from "./Contacts";
import style from "../App.module.scss";

const Layout = () => {
  return (
    <>
      <div className={style.App}>
        <header>
          <Header></Header>
        </header>
        <section className={style.content}>
          <Outlet></Outlet>
          {/* <Navigation></Navigation> */}
        </section>
        <footer className={style.footer}>
          <Contact></Contact>
        </footer>
      </div>
    </>
  );
};

export default Layout;
