import React, {useState,useEffect} from "react"
import axios from "axios"

// const apiUsers = axios.create({ baseURL: "https://randomuser.me/api/?results=20" });
const apiUsers = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/users" });

export default () => {
    const [users,setUsers]=useState([])
    // useEffect(() => {apiUsers.get().then(response=>setUsers(response.data.results))}, [])
    useEffect(() => {apiUsers.get().then(response=>setUsers(response.data))}, []) 
    return users.length  ? users.map((user,index) => <div key={index}>{user.email}</div>):"loading"
}


