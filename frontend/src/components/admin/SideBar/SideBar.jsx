import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="" className="brand-link">
            <img src="/public/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                <img src="/public/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                <a href="#" className="d-block">TheAnh Deptraivcl</a>
                </div>
            </div>
            {/* SidebarSearch Form */}
            <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                    </button>
                </div>
                </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library */}
                <li className="nav-item">
                    <Link to={''} className="nav-link ">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                        Dashboard
                    </p>
                    </Link>
                </li>
                <li class="nav-item">
                    <a href="" class="nav-link">
                    <p>
                        Brands
                        <i class="right fas fa-angle-left"></i>
                    </p>
                    </a>
                    <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <Link to={'brands'} class="nav-link">
                        <p>List Brand</p>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to={'add-brands'} class="nav-link">
                        <p>Add Brand</p>
                        </Link>
                    </li>
                    </ul>
                </li>

                <li class="nav-item">
                    <a href="" class="nav-link">
                    <p>
                        Categories
                        <i class="right fas fa-angle-left"></i>
                    </p>
                    </a>
                    <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <Link to={'categories'} class="nav-link">
                        <p>List Categories</p>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to={'add-categories'} class="nav-link">
                        <p>Add Category</p>
                        </Link>
                    </li>
                    </ul>
                </li>

                <li class="nav-item">
                    <a href="" class="nav-link">
                    <p>
                        Sizes
                        <i class="right fas fa-angle-left"></i>
                    </p>
                    </a>
                    <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <Link to={'sizes'} class="nav-link">
                        <p>List Sizes</p>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to={'add-sizes'} class="nav-link">
                        <p>Add Size</p>
                        </Link>
                    </li>
                    </ul>
                </li>


                <li class="nav-item">
                    <a href="" class="nav-link">
                    <p>
                        Products
                        <i class="right fas fa-angle-left"></i>
                    </p>
                    </a>
                    <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <Link to={'products'} class="nav-link">
                        <p>List Products</p>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to={'add-products'} class="nav-link">
                        <p>Add Product</p>
                        </Link>
                    </li>
                    </ul>
                </li>
                </ul>
            </nav>
            {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    </div>
  )
}

export default SideBar