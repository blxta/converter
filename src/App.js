import Header from "./components/Header";
import style from "./App.module.scss";
import DisplayRate from "./components/DisplayRate";
import Navigation from "./components/Navigation";
import Contact from "./components/Contacts";
function App() {
  return (
    <div className={style.App}>
      <Header></Header>
      <Navigation></Navigation>
      <Contact></Contact>
    </div>
  );
}

export default App;
