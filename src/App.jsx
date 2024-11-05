import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/shop'
              element={<Shop />}
            />
            <Route
              path='/cart'
              element={<Cart />}
            />
            <Route
              path='/wishlist'
              element={<Wishlist />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/contact'
              element={<Contact />}
            />

            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/product-details/:id'
              element={<ProductDetails />}
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
