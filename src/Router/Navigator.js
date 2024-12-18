import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import ProductList1 from '../components/ProductList1';
import ProductList2 from '../components/ProductList2';
import ProductList3 from '../components/ProductList3';
import ProductList4 from '../components/ProductList4';
import Profile from '../components/Profile';
import CartPage from '../components/CartPage';
import Checkout from '../components/Checkout';
import ScrollToTop from '../components/ScrollToTop';
import ContactUs from '../components/ContactUs';
import BlogList from '../components/BlogList';
import TrackOrder from '../components/TrackOrder';
import OrdersGrid from '../components/OrdersGrid';
import { CartProvider } from '../components/CartContext';
import PrivateRoute from '../components/ProtectedRoute';
import AdminNavbar from '../Admin/AdminNavbar';
import UsersGrid from '../components/UsersGrid';
import Dashboard from '../components/Dashboard';
import ProductForm from '../components/ProductForm';
import AboutUs from '../components/AboutUs';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import ProductDetail from '../components/ProductDetail';

export default function Navigator() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/category/jwellery" element={<ProductList1 />} />
          <Route path="/category/Decor" element={<ProductList2 />} />
          <Route path="/category/Fabric" element={<ProductList3 />} />
          <Route path="/category/Bags" element={<ProductList4 />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/connect" element={<BlogList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/myorder" element={<TrackOrder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          {/* <Route path="/admin" element={<PrivateRoute component={AdminNavbar} adminRoute />} /> */}
          <Route path="/admin" element={<PrivateRoute component={OrdersGrid} adminRoute />} />
          <Route path="/admin/users" element={<PrivateRoute component={UsersGrid} adminRoute />} />
          <Route path="/admin/dashboard" element={<PrivateRoute component={Dashboard} adminRoute />} />
          <Route path="/admin/addproduct" element={<PrivateRoute component={ProductForm} adminRoute />} />
          <Route path="/admin/products" element={<PrivateRoute component={ProductList} adminRoute />} />
        </Routes>
      </Router>
      {/* <Footer/> */}
    </CartProvider>
  );
}
