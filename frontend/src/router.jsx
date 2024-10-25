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
        ]}
    ])
  return routes
}

export default Routes