import {Routes, Route,NavLink} from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import AllProducts from './pages/ALLProducts'
import Cart from './pages/Cart'
import './App.css'
import Layout from './components/Layout/Layout'
import ShowProduct from './pages/SowProduct'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<ShowProduct />} />
      </Routes>
    </Layout>
  );
}

export default App
