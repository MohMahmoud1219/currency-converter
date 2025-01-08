import React, { useState, useEffect } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1); // قيمة المبلغ الذي سيقوم المستخدم بإدخاله
  const [fromCurrency, setFromCurrency] = useState('USD'); // العملة الأصلية
  const [toCurrency, setToCurrency] = useState('EUR'); // العملة المستهدفة
  const [conversionRate, setConversionRate] = useState(0); // سعر الصرف بين العملتين
  const [convertedAmount, setConvertedAmount] = useState(0); // المبلغ المحول

  // جلب سعر الصرف من API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCurrency}`);
      const data = await response.json();
      setConversionRate(data.conversion_rates[toCurrency]);
    };
    fetchData();
  }, [fromCurrency, toCurrency]);

  // حساب المبلغ المحول بناءً على القيمة المدخلة
  useEffect(() => {
    setConvertedAmount(amount * conversionRate);
  }, [amount, conversionRate]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <h1 className="text-2xl font-bold">Currency Converter</h1>
      <h2 className="text-gray-500">Check Current Currency Exchange Rates</h2>
      
      <div className="flex space-x-4">
        <div>
          <label className="text-sm">From:</label>
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="p-2 rounded">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="text-lg">⇄</span>
        </div>
        
        <div>
          <label className="text-sm">To:</label>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="p-2 rounded">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="text-sm">Amount</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="p-2 rounded"
        />
      </div>
      
      <button className="bg-blue-500 text-white p-2 rounded mt-4">Convert</button>

      <div className="mt-4">
        <h3>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h3>
      </div>
    </div>
  );
}

export default CurrencyConverter;
