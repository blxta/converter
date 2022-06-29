import Header from "./components/Header";
import style from "./App.module.scss";
import Navigation from "./components/Navigation";
import Contact from "./components/Contacts";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className={style.App}>
        <header>
          <Header></Header>
        </header>
        <section className={style.content}>
          <Navigation></Navigation>
        </section>
        <footer className={style.footer}>
          <Contact></Contact>
        </footer>
      </div>
    </>
  );
}

export default App;
