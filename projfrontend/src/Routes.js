import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import "../src/styles.css"
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import Cart from "./user/Cart"
const Routes= ()=>{
    return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signin" exact component={Signin}/>
                    <Route path="/signup" exact component={Signup}/>
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
                    <AdminRoute path="/admin/category" exact component={AddCategory}/>
                    <AdminRoute path="/admin/add-product" exact component={AddProduct}/>
                    <AdminRoute path="/admin/manage-product" exact component={ManageProducts}/>
                    <AdminRoute path="/admin/manage-product/delete" exact component={ManageProducts}/>
                    
                    <PrivateRoute path="/user/cart" exact component={Cart}/>
                    <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                </Switch>
            </BrowserRouter>
    );
}

export default Routes


