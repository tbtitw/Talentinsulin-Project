import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79
  };

  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const convertPrice = (usdPrice) => {
    const price = (usdPrice * rates[currency]).toFixed(2);
    return `${symbols[currency]}${price}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, symbols }}>
      {children}
    </CurrencyContext.Provider>
  );
};
