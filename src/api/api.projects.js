import axios from "axios"
import 'regenerator-runtime/runtime'

const apiProjects = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/posts" });

export const getProjects = () => { return apiProjects.get() }

export const addProject = (project) => { return apiProjects.post("/", project) };
