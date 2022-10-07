import Header from "./components/Header";
import style from "./App.module.scss";
import Navigation from "./components/Navigation";
import Contact from "./components/Contacts";
import Layout from "./components/Layout";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageMarketWorld from "./pages/pageMarketWorld/PageMarketWorld";
import PageMarketUkraine from "./pages/pageMarketUkraine/PageMarketUkraine";
import PageTaxes from "./pages/pageTaxes/PageTaxes";
import PageNews from "./pages/pageNews/PageNews";
import DisplayRate from "./components/DisplayRate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/" element={<Navigation></Navigation>}>
            <Route index path="MarketWorld" />
            {/* <Route path="taxes" element={<PageTaxes></PageTaxes>} />
            <Route path="news" element={<PageNews></PageNews>} />
            <Route
              path="MarketUkraine"
              element={<PageMarketUkraine></PageMarketUkraine>}
            /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
