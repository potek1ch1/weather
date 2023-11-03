import React from "react";
import Head from "./Components/Head";
import "./App.css";
import Select from "./Components/Select";
import History from "./History";
import Current from "./Current";
import Area from "./Components/Area";
import HistoryDate from "./HistoryDate";
import NoMatch from "./NoMatch";
import Home from "./Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Head />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/history/:pref" element={<HistoryDate />} />
          {/* <Route path="/history/:pref" element={<HistoryDate />} /> */}
          {/* </Routes>
        <Routes> */}
          {/* <Route path="/current" Component={Current}/> */}
          <Route path="/current" element={<Current />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
      <div className="pote">
        <a href="https://sites.google.com/gsuite.si.aoyama.ac.jp/potekichi/">
          <img src="http://localhost:8080/potekichi.PNG" alt="" />
        </a>
      </div>
    </div>
  );
}

export default App;
