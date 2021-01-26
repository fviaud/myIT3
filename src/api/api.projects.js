import axios from "axios"
import 'regenerator-runtime/runtime'

const apiProjets = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/posts" });

export const getProjects = () => { return apiProjets.get() }
