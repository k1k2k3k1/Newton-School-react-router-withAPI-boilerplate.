import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import './App.css';

function Top() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.coinlore.net/api/tickers/')
      .then(response => response.json())
      .then(data => setData(data.data.slice(0, 10)))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Top 10 Cryptocurrencies:</h2>
      <div className="display-container">
        {data.map((coin) => (
          <div key={coin.id} className="crypto-container">
            <div className="rank">Rank {coin.rank}</div>
            <div className="coin-info">
              {coin.name} {coin.symbol}
            </div>
            <div className="price">Price: {coin.price_usd}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Site Name</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Top />
      </BrowserRouter>
    </div>
  );
}

export default App;
