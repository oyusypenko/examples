import React from 'react';
import { ExchangeRates } from './components/ExchangeRates';

const App = () => {
    return (
        <div className="app-container">
            <header>
                <h1>Exchange Rates</h1>
            </header>
            <main>
                <ExchangeRates />
            </main>
            <footer>
                <p>Data source: Czech National Bank</p>
            </footer>
        </div>
    );
};

export default App;
