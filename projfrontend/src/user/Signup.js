import React,{useState} from 'react'
import Base from '../core/Base'
import { signUp } from '../auth/helper'


const Signup = ()=> {

    const [value,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:""
    })

    const {name,email,password,error,success} = value

    const handleChange = name => event=>{
        setValues({...value,error:false,[name]:event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...Base,error:false})
        signUp({name,email,password})
        .then(res=>{
            // console.log(res)
            if(res.error){
                setValues({...value,error:true,success:false,name:"",email:"",password:""})    
            }else{
                setValues({...value,error:false,success:true,name:"",email:"",password:""})
            }
            
        })
        .catch(error=>{
            setValues({...value,error:true,success:false,name:"",email:"",password:""})
            console.log(error)
        })
        // successFailMsg()
    }

    const successFailMsg = () =>{
        if(success){
            return (
                <div class="alert alert-success" role="alert">
                    User Created
                </div>
            )
        }
        if(error){
            return (
                <div class="alert alert-danger" role="alert">
                    User Not Created
                </div>
            )
        }
    }

    return (
        <Base title="Signup" description="Signup from">
            <div>
            <div className="container">
            <form>
                {successFailMsg()}
                <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name" onChange={handleChange("name")} value={name}/>
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange("email")} value={email}/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange("password")} value={password}/>
                </div>
                <button type="submit" onClick={onSubmit} class="btn btn-primary">Submit</button>
            </form>
        </div>
            </div>
        </Base>
        
    )
}

export default Signup
