import { injectReducer } from "../store";
import { ressourcesReducer } from "./reducers";

injectReducer("ressources", ressourcesReducer);
