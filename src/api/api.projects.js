import axios from "axios"
import 'regenerator-runtime/runtime'

const apiProjects = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/posts" });

export const getProjects = () => { return apiProjects.get() }
export const getProject = (id) => { return apiProjects.get("/" + id) }
export const addProject = (project) => { return apiProjects.post("/", project) };
export const updateProject = (id, data) => { return apiProjects.patch("/" + id, data) };
