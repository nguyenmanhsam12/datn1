import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Header/>
      <Outlet></Outlet>
      <Footer />
    </div>
  )
}

export default Home