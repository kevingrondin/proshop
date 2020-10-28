import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CartContextProvider from "./context/CartContext"
import OrderContextProvider from "./context/OrderContext"
import ProductContextProvider from "./context/ProductContext"
import UserContextProvider from "./context/UserContext"

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <OrderContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </OrderContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
