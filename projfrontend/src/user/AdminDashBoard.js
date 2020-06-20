import React, { Fragment } from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"





const DashboardLeft = ()=>{

    const {user:{name,role,email}} = isAuthenticated()
    return(
        <Fragment>
            <div id="page-content-wrapper" style={{float:"left",padding:"0"}}>
            <div className="container-fluid">
            <h1 className="mt-4">Admin Info</h1>
            <p>Name:</p>
            <p>{name}</p>
            <p>Email Id:</p>
            <p>{email}</p>
            </div>
            </div>
        </Fragment>
    )
}

const DashboardRight = ()=>{
    return(
        <Fragment>
            <div className="bg-success" style={{margin:"auto"}}>
                <li href="#" className="list-group-item list-group-item-action bg-success" style={{cursor:"pointer"}} >
                    <Link className="nav-link text-dark" to="/admin/add-product">Add Product</Link>
                </li>
                <li href="#" className="list-group-item list-group-item-action bg-success" style={{cursor:"pointer"}}>
                    <Link className="nav-link text-dark" to="/admin/manage-product">Manage Product</Link>
                </li>
                <li href="#" className="list-group-item list-group-item-action bg-success" style={{cursor:"pointer"}}>
                    <Link className="nav-link text-dark" to="/admin/category">Add/Manage Category</Link>
                </li>
                {/* <li href="#" className="list-group-item list-group-item-action bg-success" style={{cursor:"pointer"}}>
                    <Link className="nav-link text-dark" to="/signin">Update Category</Link>
                </li> */}
                {/* <li href="#" className="list-group-item list-group-item-action bg-success" style={{cursor:"pointer"}}>
                    <Link className="nav-link text-dark" to="/signin">Dashboard</Link>
                </li> */}
            </div>

        </Fragment>
    )
}



const AdminDashBoard = ()=> {
    return (
        <Base title="Admin Dashboard">    
            <div class="row">
                <div class="col-4 col-sm-4 col-md-3" style={{padding:"0"}} >
                    {DashboardRight()}
                </div>
                <div class="col-3 col-sm-6" style={{padding:"0"}}>
                    {DashboardLeft()}
                </div>
            </div>
        
        



        </Base>
    )
}

export default AdminDashBoard
