import axios from "axios"

const apiUsers = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/users/1" });

export const getUser = () => { return apiUsers.get() }