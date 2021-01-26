import { injectReducer } from "../store";
import { projectsReducer } from "./reducers";

injectReducer("projects", projectsReducer);
