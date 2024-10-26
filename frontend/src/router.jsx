import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from './pages/client/Home'
import Dashboard from './pages/admin/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import ListBrand from './pages/admin/Brand/brand'
import AddBrand from './pages/admin/Brand/add-brand'
import EditBrand from './pages/admin/Brand/edit-brand'

import ListCategories from "./pages/admin/Categories/categories";
import AddCategory from './pages/admin/Categories/add-category'
import EditCategory from './pages/admin/Categories/edit-category'
import ListSize from './pages/admin/Size/sizes'
import AddSize from './pages/admin/Size/add-size'
import EditSize from './pages/admin/Size/edit-size'
import ListColor from './pages/admin/Color/colors'
import AddColor from './pages/admin/Color/add-color'
import EditColor from './pages/admin/Color/edit-color'
import ListProduct from './pages/admin/Product/products'
import AddProduct from './pages/admin/Product/add-product'
import EditProduct from './pages/admin/Product/edit-products'

const Routes = () => {
    const routes = useRoutes([
        //client
        {path:'',element:<Home/>},
        //admin
        {path:'admin', element:<AdminLayout/>,children:[
            {path:'',element:<Dashboard/>},

            {path:'brands',element:<ListBrand/>},
            {path:'add-brands',element:<AddBrand/>},
            {path:'edit-brands/:id',element:<EditBrand/>},

            {path:'categories',element:<ListCategories/>},
            {path:'add-categories',element:<AddCategory/>},
            {path:'edit-categories/:id',element:<EditCategory/>},

            {path:'sizes',element:<ListSize/>},
            {path:'add-sizes',element:<AddSize/>},
            {path:'edit-sizes/:id',element:<EditSize/>},

            {path:'colors',element:<ListColor/>},
            {path:'add-colors',element:<AddColor/>},
            {path:'edit-colors/:id',element:<EditColor/>},

            {path:'products',element:<ListProduct/>},
            {path:'add-products',element:<AddProduct/>},
            {path:'edit-products/:id',element:<EditProduct/>},
        ]}
    ])
  return routes
}

export default Routes