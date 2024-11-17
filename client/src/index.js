import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { TasksProvider } from './context/tasks.context'
import { ProductsProvider } from './context/products.context'
import { CartProvider } from './context/cart.context';
import { ListProvider } from './context/list.context';

import './assets/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <TasksProvider> 
    <ProductsProvider>
    <ListProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </ListProvider>
    </ProductsProvider>
    </TasksProvider> 
  </BrowserRouter>
);

reportWebVitals();