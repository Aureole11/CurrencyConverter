import React, { useState, useEffect } from "react";
import axios from "axios";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch available currencies
    axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((res) => {
        setCurrencies(Object.keys(res.data.rates));
      })
      .catch((err) => console.error(err));
  }, []);

  const convertCurrency = () => {
    // Fetch conversion rate
    axios
      .get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((res) => {
        const rate = res.data.rates[toCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <span> to </span>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button onClick={convertCurrency}>Convert</button>

      {convertedAmount && (
        <div>
          <h3>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h3>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
