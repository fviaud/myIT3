import axios from "axios"

const apiUsers = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/users/1" });
const apiAllUsers = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/users" });

export const getUser = () => { return apiUsers.get() }
export const getUsers = () => { return apiAllUsers.get() }