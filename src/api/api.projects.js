import axios from "axios"
import 'regenerator-runtime/runtime'

const apiProjets = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/posts" });

// export const getProjects = () => { return apiProjets.get() }

export const getProjects = async (page = 1) => {
    const response = await apiProjets.get()
    const projects = response.data.filter((project, index) => index < page * 10 && index > (page - 1) * 10)
    console.log(projects)
    return projects
}