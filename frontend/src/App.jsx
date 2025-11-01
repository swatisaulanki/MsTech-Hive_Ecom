import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Context
import { AuthProvider } from "./context/AuthContext";

// Route protection
import ProtectedRoute from "./routes/ProtectedRoute";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ShopNow from "./pages/ShopNow";
import Categories from "./components/Categories";
import CategoryPage from "./pages/CategoryPage ";
import BlogPage from './pages/BlogPage';
import Cart from './components/Cart';
import Orders from './pages/Orders';
import Offer from './pages/Offer';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FaqPage from "./pages/FaqPage";
import Contact from  "./pages/Contact";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Login from './Login/Login';
import Register from './Login/Register';
import ScrollToTop from './components/ScrollToTop';
import ProductDetails from './components/ProductDetails';
import { ToastContainer } from 'react-toastify';
import ElectronicsPage from './pages/ElectronicsPage';
import FashionPage from './pages/FashionPage';
import GroceryPage from './pages/GroceryPage';
import AccessoriesPage from './pages/AccessoriesPage';
import SearchResults from './pages/SearchResults';
import ProceedToCheckout from './pages/ProceedToCheckout';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import AdminDashboard from './pages/AdminDashboard';
import ProfileUpdate from './components/ProfileUpdate';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopNow />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faqpage" element={<FaqPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/returns" element={<ReturnPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        <Route path="/login" element={< Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/electronics" element={<ElectronicsPage />} />
        <Route path="/category/fashion" element={<FashionPage />} />
        <Route path="/category/grocery" element={<GroceryPage/>} />
        <Route path="/category/accessories" element={<AccessoriesPage/>} />
        <Route path="/search" element={<SearchResults/>} />
        <Route path="/proceed" element={<ProceedToCheckout/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/order" element={<OrderSuccess/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/profileupdate" element={<ProfileUpdate/>}/>

        {/* Protected Routes */}
       
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ScrollToTop/>
      <ToastContainer/>
      <Footer />
    </AuthProvider>
  );
};

export default App;
