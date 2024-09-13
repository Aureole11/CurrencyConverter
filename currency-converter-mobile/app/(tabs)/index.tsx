import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      {/* Tab for CurrencyConverter */}
      <Tabs.Screen
        name="CurrencyConverter"
        options={{
          tabBarLabel: 'Converter',
          tabBarIcon: () => (
            // You can import icons from @expo/vector-icons if you want to add an icon
            // Example: <MaterialIcons name="attach-money" size={24} color="black" />
            null
          ),
        }}
      />

      {/* Tab for ExchangeRates */}
      <Tabs.Screen
        name="ExchangeRates"
        options={{
          tabBarLabel: 'Rates',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}
