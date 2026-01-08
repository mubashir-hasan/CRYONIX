import './App.css'
import {  Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/navbar/Navbar';
import AdminLogin from './pages/admin/LoginPage/Login';
import AllProducts from './pages/admin/AdminDashboard/AllProducts';
import AddProduct from './pages/admin/AdminDashboard/AddProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/Footer';
import UserLogin from './pages/Auth/Login';
import UserSignup from './pages/Auth/Signup';
import ScrollToTop from './components/Scrolltotop';
import ScrollToTopButton from './components/scrolltotopbutton/ScrolltotopButton';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './pages/admin/AdminDashboard/AdminSidebar';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import Orders from './pages/admin/AdminDashboard/Orders';
import Users from './pages/admin/AdminDashboard/Users';

function App() {

  const token = localStorage.getItem('accessToken');
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");


  return (
    <>
      <div>
        <ScrollToTop />
        <ScrollToTopButton />
        
        {!hideNavbar && <Navbar />}

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/user/user_login' element={<UserLogin />} />
          <Route path='/user/user_signup' element={<UserSignup />} />
          
          <Route path='/admin/login' element={<AdminLogin />} />

          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<ProtectedRoute allowed="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="products" element={<ProtectedRoute allowed="admin"><AllProducts /></ProtectedRoute>} />
                <Route path="add-product" element={<ProtectedRoute allowed="admin"><AddProduct /></ProtectedRoute>} />
                <Route path="orders" element={<ProtectedRoute allowed="admin"><Orders /></ProtectedRoute>} />
                <Route path="users" element={<ProtectedRoute allowed="admin"><Users /></ProtectedRoute>} />
              </Routes>
            </AdminLayout>
          } />

        </Routes>
        <Footer />

      </div>
    </>
  )
}

export default App;
