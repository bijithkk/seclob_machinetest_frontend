import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails/ProductDetails';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
