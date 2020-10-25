import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom"
import { Container } from "react-bootstrap"

import Header from './components/Header'

import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import PaymentPage from "./pages/PaymentPage"
import ProductPage from "./pages/ProductPage"
import RegisterPage from "./pages/RegisterPage"
import ShippingPage from "./pages/ShippingPage"

const App = () => (
  <HashRouter>
    <Header />
    <main className="py-3">
      <Container>
        <Routes>
          <Route path='/cart/:productId' element={<CartPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/product/:id' element={<PaymentPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/search/:keyword' element={<HomePage />} />
          <Route path='/shipping' element={<ShippingPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </main>
  </HashRouter>
);


export default App;
