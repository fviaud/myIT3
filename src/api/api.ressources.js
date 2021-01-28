import axios from "axios"
import 'regenerator-runtime/runtime'

const apiRessources = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/posts" });

// export const getRessources = () => { return apiRessources.get() }
export const getRessource = (id) => { return apiRessources.get("/" + id) }
export const addRessource = (objet) => { return apiRessources.post("/", objet) };

