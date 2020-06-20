import React, { useState,useEffect } from 'react'
import Base from "../core/Base"
import { getCategories, createProduct } from './helper/adminapicall'
import { Link } from 'react-router-dom'

function AddProduct() {


    const [value, setvalue] = useState({
        categories:[],
        name:"",
        photo:"",
        description:"",
        price:"",
        category:"",
        stock:"",
        formData:"",
        error:false,
        success:false,
        msg:""
    })



    const {categories,name,photo,description,price,category,stock,formData,error,msg,success} = value
    useEffect(()=>{
        console.log("on")
        // setvalue({...value,formData:new FormData()}) 
        getCategories()
        .then(res=>{
            console.log(res)
            if(res.error){
                console.log(res.error)
            }else{
                console.log(res)
                setvalue({...value,categories:res,formData:new FormData()})

            }

        })
        .catch(err=>console.log(err))
    },[])


    const onSubmit = (event)=>{
        event.preventDefault()
        setvalue({...value,error:false,success:false})
        createProduct(formData)
        .then(res=>{
            // console.log(res)
            if(res.error){
                setvalue({...value,name:"",photo:"",description:"",price:"",category:"",stock:"",error:true,msg:error})
            }else{
                console.log(res)
                setvalue({...value,name:"",photo:"",description:"",price:"",category:"",stock:"",error:false,success:true,msg:res.message})    
            }
        })
        .catch(err=>{
            console.log(err)
            setvalue({...value,name:"",photo:"",description:"",price:"",category:"",stock:"",error:true})
        })
    }

    const errorSuccessMsg = ()=>{
        if(error){
            return(
                <div className="alert alert-primary" role="alert">
                    {msg}
                </div>
            )
        }else if(success){
                return(
                    <div className="alert alert-primary" role="alert">
                        {msg}
                    </div>
                )
        }
    }

    const changeHandler = names => event=>{
        const valuess = names === "photo" ? event.target.files[0]:event.target.value
        formData.set(names,valuess)
        setvalue({...value,[names]:valuess})
        
    }

   
    const addProductForm = ()=>(
        
        <div className="container">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to="/admin/dashboard">
                    <li className="text-success breadcrumb-item active" aria-current="page">Dashboard</li>
                    </Link>
                </ol>
                </nav>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                        <input value={name} type="text" onChange={changeHandler("name")} className="form-control" placeholder="Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label  className="col-sm-2 col-form-label">Photo</label>
                        <div className="col-sm-5">
                        <input type="file"  onChange={changeHandler("photo")} className="form-control" id="inputfile3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <input type="text" value={description} onChange={changeHandler("description")} className="form-control" placeholder="Description"/>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                        <input type="number" value={price} onChange={changeHandler("price")} className="form-control" placeholder="price"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10">
                        <select value={category} className="form-control" id="exampleFormControlSelect1" onChange={changeHandler("category")}>
                        {
                            categories.map((cate)=>(<option key={cate._id}>{cate.name}</option>))
                        }
                        </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Stock</label>
                        <div className="col-sm-10">
                        <input type="number" value={stock} onChange={changeHandler("stock")} className="form-control" placeholder="Stock"/>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                    <div className="col-sm-10">
                    <button type="submit" onClick={onSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
                </form>
                
                </div>

    )



    return (
        
            <Base title="Add Product" description="Form to add products">
                {errorSuccessMsg()}
                {addProductForm()}
            </Base>
        
    )
}

export default AddProduct
