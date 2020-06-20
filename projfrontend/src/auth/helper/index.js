import API from "./../../API"



// export const signInWithGoogle = () =>{
//     var  provider = new firebase.auth.GoogleAuthProvider()
//     firebase.auth().signInWithPopup(provider)
//     .then(res=>{
//         // console.log(res)
//         console.log(res.user.email)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// }


export const signUp = (user)=>{
    // console.log(user)
    return fetch(`${API}/signUp`,{
        method:"POST",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(respose=>{
        // console.log(respose)
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
        
    })

}



export const SignIn = (user)=>{
    return fetch(`${API}/signIn`,{
        method:"POST",
        headers:{
            Accept:"application.json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(respose=>{
        // console.log(respose)
        return respose.json()
    })
    .catch(err=>{
        console.log(err)
    })
}


export const authenticate = (data,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }

}



export const signOut = (next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
    }

    return fetch(`${API}/signOut`,{
        method:"GET"
    })
    .then(response=>{
        console.log("Signout Success")
    })
    .catch(err=>{
        console.log(err)
    })
    next()
}

export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}