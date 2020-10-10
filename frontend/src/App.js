import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom"
import { Container } from "react-bootstrap"

import Header from './components/Header'

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"

const App = () => (
  <HashRouter>
    <Header />
    <main className="py-3">
      <Container>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/search/:keyword' element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </main>
  </HashRouter>
);


export default App;
