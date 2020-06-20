import React, { useState, useEffect } from 'react'
import Base from"./Base"
import Card from './Card'
import { getProducts } from '../admin/helper/adminapicall'

const Home=()=> {
    
    const [value, setvalue] = useState({
        productsList:[],
        error:false,
        success:false,
        message:"",
        reload:false
    })
    const {error,message,productsList,success,reload} = value


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
                <Card product={product}/>            
            )
        
    )
    useEffect(()=>{
        console.log("hi")
        preLoad()
    },[reload])


    return (
        <Base title="Home Page" description="Welcome to the Tshirt Store">
            {/* <h1 className="text-white">All of tshirts</h1> */}
            <div>
                {showProducts()}
            </div>
        </Base>
 
    )
}

export default Home
