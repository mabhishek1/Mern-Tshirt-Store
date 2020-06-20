import React from "react"

export const addProductToCart = (product)=>{
    let orders = []
    if(typeof window && localStorage.getItem("order")){
        orders = JSON.parse(localStorage.getItem("order")) 
    }
    orders.push(product)
    localStorage.setItem("order",JSON.stringify(orders))
    // ordersList = orders
    return orders
}

export const removeProductFromCart = (product)=>{
    let orders = []
    if(typeof window && localStorage.getItem("order")){
        orders = JSON.parse(localStorage.getItem("order"))
        console.log(orders) 
        // console.log(product)
        let filteredOrder = []
        filteredOrder = orders.filter((order)=>{
            if(order._id !== product._id){
                return order
            }
        })
        console.log(filteredOrder)
        if(filteredOrder){
            localStorage.setItem("order",JSON.stringify(filteredOrder))
        }else{
            localStorage.removeItem("order")
        }
        
        return filteredOrder
    }
    
}




export const getOrder = ()=>{
    if(typeof window && localStorage.getItem("order")){
        return JSON.parse(localStorage.getItem("order")) 
    }
}