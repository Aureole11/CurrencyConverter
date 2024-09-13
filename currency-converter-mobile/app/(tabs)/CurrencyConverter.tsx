import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button} from "react-native";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((res) => {
        setCurrencies(Object.keys(res.data.rates));
      })
      .catch((err) => console.error(err));
  }, []);

  const convertCurrency = () => {
    axios
      .get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((res) => {
        const rate = res.data.rates[toCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
      })
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <Text>Currency Converter</Text>
      <TextInput
        value={String(amount)}
        onChangeText={(val) => setAmount(Number(val))}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={fromCurrency}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Text> to </Text>
      <Picker
        selectedValue={toCurrency}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
      >
        {currencies.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Button title="Convert" onPress={convertCurrency} />
      {convertedAmount && (
        <Text>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </Text>
      )}
    </View>
  );
}
