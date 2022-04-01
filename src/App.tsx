import { Provider } from 'react-redux';
import CurrencyConverter from './pages/currency-converter/CurrencyConverter';
import { store } from "./store";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CurrencyConverter />
      </div>
    </Provider>
  );
}

export default App;
