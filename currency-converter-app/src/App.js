import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CurrencyConverter from "./components/CurrencyConverter";
import ExchangeRates from "./components/ExchangeRates";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Currency Converter</Link></li>
            <li><Link to="/exchange-rates">Exchange Rates</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CurrencyConverter />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

