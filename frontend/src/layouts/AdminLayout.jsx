import React from 'react'
import { Outlet } from 'react-router-dom'
import Preloader from '../components/admin/Preloader/preloader'
import NavBar from '../components/admin/Navbar/navbar'
import SideBar from '../components/admin/SideBar/SideBar'
import FooterAdmin from '../components/admin/FooterAdmin/FooterAdmin'

const AdminLayout = () => {
  return (
    <div>
        <div className="wrapper">
            {/* <Preloader/> */}
            <NavBar/>
            <SideBar/>
              <Outlet/>
            <aside className="control-sidebar control-sidebar-dark">
                {/* Control sidebar content goes here */}
            </aside>
            <FooterAdmin/>
            {/* /.control-sidebar */}
        </div>
    </div>
  )
}

export default AdminLayout