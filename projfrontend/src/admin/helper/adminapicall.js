import API from "../../API";
import { isAuthenticated } from "../../auth/helper/index";



//Category API calls

export const getCategoryById = (categoryId,next)=>{
    return fetch(`${API}/category/getCategory/${categoryId}`,{
        method:"GET",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json"
        },
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getCategories = ()=>{
    return fetch(`${API}/category/getCategories`,{
        method:"GET",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json"
        },
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })

}


export const postCategory = (category)=>{
const {user:{name,_id,email},token} = isAuthenticated()

    return fetch(`${API}/category/create/${_id}`,{
        method:"POST",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({name:category})
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })

}

export const updateCategory = (category)=>{
const {user:{name,_id,email},token} = isAuthenticated()

    return fetch(`${API}/category/updateCategory/${category.id}/${_id}`,{
        method:"PUT",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(category)
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })

}

export const deleteCategory = (categoryId)=>{
const {user:{name,_id,email},token} = isAuthenticated()

    return fetch(`${API}/category/deleteCategory/${categoryId}/${_id}`,{
        method:"DELETE",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}` 
        },
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })

}


//Product API Calls

export const createProduct = (product)=>{
const {user:{name,_id,email},token} = isAuthenticated()

    return fetch(`${API}/product/createProduct/${_id}`,{
        method:"POST",
        headers:{
            Accept:"application.json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })

}

export const getProductById = (productId,next)=>{
    return fetch(`${API}/product/getProduct/${productId}`,{
        method:"GET",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json"
        },
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })
}



export const deleteProduct = (productId)=>{
const {user:{name,_id,email},token} = isAuthenticated()

    return fetch(`${API}/product/delete/${_id}/${productId}`,{
        method:"DELETE",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}` 
        },
    })
    .then(respose=>{
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })

}

export const getProducts = ()=>{
    return fetch(`${API}/product/getProduct`,{
        method:"GET",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json"
        },
    })
    .then(respose=>{
        console.log(respose)
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })
}
