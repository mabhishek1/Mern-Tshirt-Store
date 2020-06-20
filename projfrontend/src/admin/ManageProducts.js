import React,{useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './helper/adminapicall'
import ImageHelper from '../core/helper/ImageHelper'
// import { ImageHelper} from "../core/helper/ImageHelper"
// ImageHelper

function ManageProducts() {

    const [value, setvalue] = useState({
        productsList:[],
        error:false,
        success:false,
        message:"",
        reload:false
    })

    const {error,message,productsList,success,reload} = value

    const deleteProductOnClick = (id)=>{
        console.log(id)
        setvalue({...value,reload:false})
        deleteProduct(id)
        .then(res=>{
            // if(res.error){
            //     console.log(res)
            // }
            // if(res.message){
            //     setvalue({...value,reload:true})
            // }
            console.log(res)
            setvalue({...value,reload:true})
        })
        .catch()
    }



    const preLoad = ()=>{
        setvalue({...value,error:false,success:false,message:""})
        getProducts()
        .then(res=>{
            console.group(res)
            setvalue({...value,productsList:res,reload:false})
        })
        .catch(err=>{
            console.log(err)
        })
    
    }



    const showProducts = ()=>(
        
        productsList.map(product=>
            <div key={product._id}>
            <div className="bg-dark card-header">
            </div>
            <div className="bg-success card-body">
            <div className="container">
            <div className="row">
                <div className="col-sm">
                    <h5 className="text-dark card-title" style={{width:"contain"}}>{product.name}</h5>
                    <p className="text-dark card-text">{product.description}</p>
                    <Link to="/admin/manage-product/update">
                        <button  className="btn btn-warning">Update</button>
                    </Link>
                    <button onClick={()=>deleteProductOnClick(product._id)} className="btn btn-danger">Delete</button>
                    
                </div>
                <div className="col-sm">
                    <ImageHelper 
                    product={product}
                    maxHeight="250px"
                    maxWidth="150px"
                    
                    />
                </div>
            </div>
            </div>
                    
            </div>
            </div>
            
            )
        
    )

    useEffect(()=>{
        console.log("hi")
        preLoad()
    },[reload])

    return (
        <Base title="Manage Products">
            <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to="/admin/dashboard">
                    <li className="text-success breadcrumb-item active" aria-current="page">Dashboard</li>
                    </Link>
                </ol>
            </nav>
                <div>  
                    {showProducts()}                 
            </div>

            </div>
        </Base>
    )
}

export default ManageProducts
