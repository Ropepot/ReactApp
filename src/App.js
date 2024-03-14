import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderHistory from './pages/OrderHistory';
import AccountDetails from './pages/AccountDetails';

// Bootstrap Container
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  // Function for clearing localStorage on logout
  const unsetUser = () => {
      localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(typeof data.user !== "undefined"){
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, [])

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container fluid>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/users/" element={<Register />}/>
              <Route path="/users/login" element={<Login />}/>
              <Route path="/users/logout" element={<Logout />}/>
              <Route path="/users/details" element={<AccountDetails />}/>
              <Route path="/products" element={<Products />}/>
              <Route path="/products/addProduct" element={<AddProduct />}/>
              <Route path="/products/:productId" element={<ProductView />}/>
              <Route path="/carts" element={<Cart />}/>
              <Route path="/orders/my-orders" element={<Orders />}/>
              <Route path="/orders/all-orders" element={<OrderHistory />}/>
              <Route path="*" element={<Error />}/>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );          
}

export default App;
