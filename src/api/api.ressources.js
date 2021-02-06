import axios from "axios"
import 'regenerator-runtime/runtime'

const apiRessources = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/posts" });

export const getRessources = (id) => { return apiRessources.get(`/${id}/commentss`) }
export const getRessource = (id) => { return apiRessources.get("/" + id) }
export const addRessource = (objet) => { return apiRessources.post("/", objet) };

