import React, { useState, useEffect } from "react";
import axios from "axios";

function ExchangeRates() {
  const [rates, setRates] = useState({});

  useEffect(() => {
    axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((res) => {
        setRates(res.data.rates);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Exchange Rates (Base: USD)</h2>
      <ul>
        {Object.keys(rates).map((currency) => (
          <li key={currency}>
            {currency}: {rates[currency].toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExchangeRates;
