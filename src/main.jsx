import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider}from 'react-router-dom'
import store from './App/Store.js'
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "./Components/HomePage/Home.jsx"
import Mens from './Components/Mens/Mens.jsx'
import Womens from "./Components/Womens/Womens.jsx"
import { Login } from './Components/Login/Login.jsx'
import { SignUp } from './Components/SIgnUp/SignUp.jsx'
import CartPage from './Components/Cart-Page/Cart.jsx'
import User from './Components/UserAccount/User.jsx'
import Admin from './Components/AdminPage/Admin.jsx'
import Checkout from './Components/Payment/Checkout.jsx';
import Payment from './Components/Payment/Payment.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='Mens' element={<Mens/>}></Route>
      <Route path='Womens' element={<Womens/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
      <Route path='SignUp' element={<SignUp/>}></Route>
      <Route path='Cart' element={<CartPage/>}></Route>
      <Route path='User' element={<User/>}></Route>
      <Route path='Admin' element={<Admin/>}></Route>
      <Route path='Checkout' element={<Checkout/>}></Route>
      <Route path='Payment' element={<Payment/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
