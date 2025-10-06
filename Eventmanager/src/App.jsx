import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import BlogDetails from './Pages/BlogDetails/BlogDetails'
import VendorRegister from './Pages/vendor/VendorRegister'
import VendorDetails from './Pages/VendorDetails/vendorDetails'
import Planners from './Pages/Planners/Planners'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* pages */}
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/planner' element={<Planners />} />
        <Route path='/details/:id' element={<BlogDetails />} />
        <Route path='/vendor' element={<VendorRegister />} />
        <Route path='/vendorDetails/:id' element={<VendorDetails />} />

       </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
