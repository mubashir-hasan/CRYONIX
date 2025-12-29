import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/navbar/Navbar';
import AdminLogin from './pages/admin/LoginPage/Login';
import AllProducts from './pages/admin/AdminDashboard/AllProducts';
import AddProduct from './pages/admin/AdminDashboard/AddProduct';
import Payment from './components/Payments'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/Footer';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AllProducts />} />
          <Route path='/admin/add-product' element={<AddProduct />} />

          <Route path='/payment' element={<Payment />} />

        </Routes>
        <Footer />
      </Router>
      


    </div>
  );
}

export default App;