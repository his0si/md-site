import axios from "axios";

const api=axios.create({
    baseURL:"/api/login",
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const logoutAPI=async ()=>{
    try{
        const {data}= await api.post("/logout");
        return data;
    }catch(error){
        throw error.response?.data || error;
    }
}

export const withdrawAPI=async ()=>{
    try{
        const {data}= await api.delete("/withdraw");
        return data;
    }catch(error){
        throw error.response?.data || error;
    }
}