import React,{useState} from 'react'
import Base from '../core/Base'
import {Link,Redirect} from "react-router-dom"
import {SignIn,authenticate,isAuthenticated,signInWithGoogle} from "../auth/helper/index"
import "../styles.css"

const Signin = ()=>{
    
    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false,
        success:false
    })
    
    const {email,password,loading,didRedirect,success,error} = values
    const {user} = isAuthenticated()

    const handleChange = name => event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }


    const LoadingFailMsg = () =>{
        if(error){
            return (
                <div className="container alert alert-danger w-25 p-3" role="alert">
                    {error}
                </div>
            )
        }
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        SignIn({email,password})
        .then(response=>{
            if(response.error){
                setValues({...values,error:response.error,email:"",password:""})
            }else{
                authenticate(response,()=>{
                    setValues({...values,didRedirect:true,success:true,email:"",password:""})
                })
            }

        })
        .catch(err=>{
            console.log("Signin request failed")
        })

    }

    // const signInWithGoogleButton = () =>{
    //     return(
    //         <div>
    //         <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />

    //         <div class="google-btn">
    //         <div class="google-icon-wrapper">
    //             <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
    //         </div>
    //         <p class="btn-text"><b>Sign in with google</b></p>
    //         </div>
    //     </div>
    //     )
    // }

    // const signInWithGoogleHelper = () => {
    //     console.log("vhjvhjv")
    //     signInWithGoogle()
        
    // }
    const signInForm = ()=>{
        return(

            <div className="container">
                    {/* <div onClick={signInWithGoogleHelper} style={{margin:"auto",cursor:"pointer"}}>{signInWithGoogleButton()}</div> */}
                     
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input value={email} onChange={handleChange("email")} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input value={password} onChange={handleChange("password")} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                
                    <button type="submit" onClick={onSubmit} class="btn btn-primary">Submit</button>
                </form>
                
            </div>
        
        )
    }   

    const afterRedirect = () =>{
        
        if(user){
            if(user.role === 1){
                return <Redirect
                        to={{
                        pathname: "/admin/dashboard"
                        }}
                    />
            }else{
                return <Redirect
                        to={{
                        pathname: "/user/dashboard",
                        }}
                    />
            }
        }
    }

    return(
        <Base title="SignIn" description="SignIn form">
        {LoadingFailMsg()}
        {signInForm()}
        {afterRedirect()}
        </Base>

)}


export default Signin
