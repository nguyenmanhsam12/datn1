import React from 'react'
import { useRoutes } from 'react-router-dom'
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
import ListProduct from './pages/admin/Product/products'
import AddProduct from './pages/admin/Product/add-product'
import EditProduct from './pages/admin/Product/edit-products'

import ClientLayout from './layouts/ClientLayout'

import ListVariant from './pages/admin/Variant/variant'
import EditVariant from './pages/admin/Variant/edit-variant'
import Home from './pages/client/Home/_Home'
import Auth from './pages/client/Authentication/_Auth'
import SingGle from './pages/client/SingleProduct/_singleProduct'
import Cart from './pages/client/Cart/cart'
import CheckoutForm from './pages/client/Checkout/Checkout'


const Routes = () => {
    const routes = useRoutes([
        //client
        {path:'',element:<ClientLayout/>,children:[
            {path:'',element:<Home/>},
            {path:'/product/:slug',element:<SingGle/>},
            {path:'auth/*',element:<Auth/>},
            {path:'cart/',element:<Cart/>},
            {path:'checkout/',element:<CheckoutForm/>},
            
        ]},
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

            {path:'products',element:<ListProduct/>},
            {path:'add-products',element:<AddProduct/>},
            {path:'edit-products/:id',element:<EditProduct/>},

            {path:'variants',element:<ListVariant/>},
            {path:'edit-variants/:id',element:<EditVariant/>},
            
        ]}
    ])
  return routes
}

export default Routes