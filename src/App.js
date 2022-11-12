import './App.css';
import './Css/index.css';
import './Css/detail.css';
import './Css/buynow.css'
import Home from './Classes/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ViewProduct from './Classes/ViewProduct';
import Login from './Classes/Login';
import Register from './Classes/Register';
import AddProduct from './Classes/AddProduct';
import Back from './Classes/Back';
import Cart from './Classes/Cart';

function App() {
  return (
      <div>
        <Router>
          <Routes>
          <Route index element={<Home/>}></Route>
            <Route path='product'  element={<ViewProduct/>} ></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}> </Route>
            <Route path='addproduct' element={<AddProduct/>}></Route>
            <Route path='cart' element={<Cart/>}></Route>
            <Route path='test' element={<Back/>}></Route>
            <Route path='*' element={<div><h1>Page Not Found 🙂🙂</h1> </div>}></Route>
          </Routes>
        </Router>
        
      </div>
      
      
  );
}

export default App;
