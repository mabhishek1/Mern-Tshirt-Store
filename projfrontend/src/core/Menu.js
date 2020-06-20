import React,{Fragment} from 'react'
import {Link,withRouter,Redirect} from "react-router-dom"
import { isAuthenticated, signOut } from '../auth/helper'


const AuthFormControl = ()=>{
    // console.log(isAuthenticated())
    if(!isAuthenticated()){
        return(
           <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                            Signin
                   </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                            Signup
                    </Link>
                </li>
           </Fragment>
        )
    }else{
        return(
            <div>
                 <li className="nav-item">
                     <Link className="nav-link"
                        onClick={signOut}
                        to="/">
                            Signout
                    </Link>
                     </li>
            </div>
         )
    }
    
}

const userAdminDashboard = ()=>{
    if(isAuthenticated() && isAuthenticated().user.role === 1){
        return(
           <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard">
                            Admin Dashboard
                   </Link>
                </li>
           </Fragment>
        )
    }else if(isAuthenticated() && isAuthenticated().user.role === 0){
        return(
            <div>
                 <li className="nav-item">
                     <Link className="nav-link" to="/user/dashboard">
                            User Dashboard
                    </Link>
                     </li>
            </div>
         )
    }
    
}

const Menu = ()=> (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">My Store</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                    <Link className="nav-link" to="/">
                            Home
                   </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className="nav-link" to="/user/cart">
                            Cart
                   </Link>
                    </li>
                    {userAdminDashboard()}
                    {AuthFormControl()}
                    </ul>
                    
                </div>

                
            </nav>
            
        </div>
)

export default Menu