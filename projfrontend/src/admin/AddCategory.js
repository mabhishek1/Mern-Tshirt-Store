import React, { Fragment, useState,useEffect } from 'react'
import Base from "../core/Base"
import {getCategories, deleteCategory,postCategory} from "./helper/adminapicall"
import { Link, Redirect } from 'react-router-dom'


const AddCategory = () => {

    const [values, setvalues] = useState({
        categories:[],
        reload:true,
        categoryValue:""
    })

    const [showFrom, setShowForm] = useState(false)

    const {categories,reload,categoryValue} = values

    const handleChange = name => event=>{
        setvalues({...values,[name]:event.target.value})
    }

    const addCategoryCategoryValue = ()=>{
        postCategory(categoryValue)
        .then(response=>{
            setvalues({...values,reload:true,categoryValue:""})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const addFormController = ()=>setShowForm(!showFrom)

    const AddCategoryForm = ()=>{
        return(
               <Fragment>
                    <input style={{width:"300px"}} value={categoryValue} type="text" class="form-control" placeholder="Enter category" onChange={handleChange("categoryValue")}></input>
                    <br/>
                    <button class="btn btn-success" onClick={addCategoryCategoryValue}>Add Category</button>
                </Fragment>
            )
        }
        
    

    const deleteCate = (id)=>{
        deleteCategory(id)
        .then(res=>{
            if(res && res.error){
                return(
                <div class="alert alert-alert" role="alert">
                    {res.error}
                </div>
                )
            }else{
                setvalues({...values,reload:true})
                
            }
        })
        .catch(err=>(<div class="alert alert-success" role="alert">
            {err}
        </div>))

    }

    

    useEffect(()=>{
        console.log("on")
        getCategories()
        .then(res=>{
            setvalues({...values,categories:res,reload:false})
        })
        .catch(err=>console.log(err))
    },[reload])
    

    const showCategories = ()=>(
        categories.map(category=>
            <li key={category._id} class="container w-90  list-group-item bg-success">
                {category.name}
                <button type="button" class="btn btn-danger" id={category._id} style={{float:"right",marginLeft:"10px"}} onClick={()=>deleteCate(category._id)} >
                    Delete
                </button>
                <button type="button" class="btn btn-warning" id={category._id} style={{float:"right"}}>
                    <Link to=""/> 
                    Update
                </button>
            </li>)
        
    )

    return (
        <Base 
        title="Category Form"
        description="Form to add Add-Update-Delete Categories">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to="/admin/dashboard">
                    <li className="text-success breadcrumb-item active" aria-current="page">Dashboard</li>
                    </Link>
                </ol>
                </nav>
            <div className="container">
                <button type="button" class="btn btn-info" style={{float:"left"}} onClick={addFormController}>Add New</button>
                <br/><br/>
                {showFrom?AddCategoryForm():null}
            </div>
            
            <br/>
            <ul class="list-group">
                {showCategories()}
            </ul>
        </Base>
    )
}

export default AddCategory
