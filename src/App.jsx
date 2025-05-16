import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails/ProductDetails';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/productdetails' element={<ProductDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
