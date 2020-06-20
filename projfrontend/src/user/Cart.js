import React, { useState, useEffect, Fragment } from 'react'
import Base from '../core/Base'
import { getCartOrders } from './helper/userapicalls'
import ImageHelper from '../core/helper/ImageHelper'
import { removeProductFromCart } from '../core/helper/coreapicalls'

const Cart = ()=> {

    const [values, setvalues] = useState({
        orders:[]
    })

    const {orders} = values

    const deleteOrder = (order)=>{
        const orders = removeProductFromCart(order)
        setvalues({...values,orders:orders})
        console.log(orders)
    }

    const showOrderList = ()=>(
        
        orders.map(order=>(
            <div className="product">
            <div className="product-image">
                {/* <ImageHelper product={order}/> */}
            </div>
            <div className="product-details">
            <div className="product-title">{order.name}</div>
            <p className="product-description">{order.description}</p>
            </div>
            <div className="product-price">&#x20b9; {order.price}</div>
            <div className="product-quantity">
                <input type="number" value="1" min="1" />
            </div>
            <div className="product-removal">
                <button onClick={()=>deleteOrder(order)} className="remove-product">
                    Remove
                </button>
            </div>
            <div className="product-line-price">&#x20b9; {order.price}</div>
        </div>

        ))
    )

    const getOrders = ()=>{
        let orders = []
        orders = getCartOrders()
        console.log(orders.length)
        setvalues({...values,orders:orders})
    }


    useEffect(() => {
        getOrders()
    }, [])

    const showCart = () =>{
        return(
            <Fragment>
                <h1>Shopping Cart</h1>

                <div className="shopping-cart">

                    <div className="column-labels">
                        <label className="product-image">Image</label>
                        <label className="product-details">Product</label>
                        <label className="product-price">Price</label>
                        <label className="product-quantity">Quantity</label>
                        <label className="product-removal">Remove</label>
                        <label className="product-line-price">Total</label>
                    </div>
                        
                    {showOrderList()}
                    <button className="checkout">Checkout</button>

                    </div>
            </Fragment>
        )
    }


    return (
        <Base title="Cart" description="Your Orders">
            {showCart()}
        </Base>
    )
}

export default Cart