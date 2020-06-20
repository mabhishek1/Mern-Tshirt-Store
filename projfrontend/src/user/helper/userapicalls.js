export const getCartOrders = ()=>{
    let orders = []
    if(typeof window && localStorage.getItem("order")){
        orders = JSON.parse(localStorage.getItem("order"))
    }
    return orders
}


export const removeProductFromCart = (product)=>{
    let orders = []
    if(typeof window && localStorage.getItem("order")){
        orders = JSON.parse(localStorage.getItem("order")) 
        orders = orders.map(order => {
            if(order._id !== product._id){
                return order
            }
        });
        console.log(orders)
        if(orders){
            localStorage.setItem("order",JSON.stringify(orders))
        }else{
            localStorage.removeItem("order")
        }
        
        return orders
    }
    
}
