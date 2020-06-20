import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addProductToCart, removeProductFromCart } from "./helper/coreapicalls";


const Card = ({product}) => {

  const [values, setvalues] = useState({
    orders:[]
  })
  
  const {orders} = values

  const addToCartProduct = (product)=>{
    let orders = []
    orders = addProductToCart(product)
    setvalues({...values,orders:orders})

  }

  const removeFromCart = (product) =>{
    let orders = []
    orders = removeProductFromCart(product)
    console.log(orders)
    setvalues({...values,orders:orders})

  }

  const showAddToCart = ()=>{
    if(orders && orders.some(order=>order._id === product._id)){
      return(
        <button onClick={()=>removeFromCart(product)} className="btn btn-block btn-outline-danger mt-2 mb-2">
                  Remove from cart
        </button>
      )
    }else{
      return(
        <button onClick={() => addToCartProduct(product)} className="btn btn-block btn-outline-success mt-2 mb-2">
                Add to Cart
        </button>
      )
    }
  }
  

  const showCard = ()=>(
        <div className="col-sm-10 col-md-6 col-lg-3" style={{marginBottom:"20px",float:"left"}}>
        <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{product.name}</div>
        <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
            {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">&#x20b9; {product.price}</p>
        <div className="row">
        <div className="col-12">
          {showAddToCart()}
        </div>
        {/* <div className="col-12">
        <button onClick={() => {}} className="btn btn-block btn-outline-danger mt-2 mb-2">
                Remove from cart
        </button>
        </div> */}
        </div>
        </div>
        </div>
        </div>
  )



  return (


    <div className="" style={{minWidth:"100%"}}>
      {showCard()}  
    </div>

  );
};

export default Card;