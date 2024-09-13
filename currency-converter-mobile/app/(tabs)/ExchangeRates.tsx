import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

export default function ExchangeRates() {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((res) => {
        setCurrencies(Object.keys(res.data.rates));
        setExchangeRates(res.data.rates);
      })
      .catch((err) => console.error(err));
  }, []);

  const fetchExchangeRates = (currency) => {
    axios
      .get(`https://open.er-api.com/v6/latest/${currency}`)
      .then((res) => {
        setExchangeRates(res.data.rates);
      })
      .catch((err) => console.error(err));
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setBaseCurrency(selectedCurrency);
    fetchExchangeRates(selectedCurrency);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Exchange Rates</Text>
      <Picker
        selectedValue={baseCurrency}
        onValueChange={(itemValue) => handleCurrencyChange(itemValue)}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <ScrollView>
        {Object.entries(exchangeRates).map(([currency, rate]) => (
          <View key={currency} style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
            <Text>{currency}</Text>
            <Text>{rate.toFixed(4)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
