import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom"
import { Container } from "react-bootstrap"

import Header from './components/Header'

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"
import RegisterPage from "./pages/RegisterPage"

const App = () => (
  <HashRouter>
    <Header />
    <main className="py-3">
      <Container>
        <Routes>
          <Route path='/cart/:productId' element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/search/:keyword' element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </main>
  </HashRouter>
);


export default App;
