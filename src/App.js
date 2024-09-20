import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.js";
import Login from "./pages/login/login.js";

import Ceo from './pages/about/ceo.js';
import Company from './pages/about/company.js';
import History from './pages/about/history.js';
import Conduct from './pages/about/conduct.js';
import Location from './pages/about/location.js';

import Product from "./pages/product/product.js";
import ProductDetail from "./pages/product/productDetail.js";

import Register from "./pages/register/register.js";
import Registerconfirm from "./pages/register/registerconfirm.js";

import ShoppingList from "./pages/shopping/shoppingList.js";
import Pay from "./pages/shopping/pay.js";
import PayComplete from "./pages/shopping/paycomplete.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about/ceo" element={<Ceo />}></Route>
        <Route path="/about/company" element={<Company />}></Route>
        <Route path="/about/history" element={<History />}></Route>
        <Route path="/about/conduct" element={<Conduct />}></Route>
        <Route path="/about/location" element={<Location />}></Route>
        <Route path="/product/product_list/:code" element={<Product />}></Route>
        <Route path="/product/product_view/:idx" element={<ProductDetail />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path='/signup/success' element={<Registerconfirm />}></Route>
        <Route path='/shopping/cart' element={<ShoppingList/>}></Route>
        <Route path='/shopping/pay' element={<Pay/>}></Route>
        <Route path='/shopping/complete' element={<PayComplete/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
