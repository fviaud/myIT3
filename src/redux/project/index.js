import { injectReducer } from "../store";
import { projectReducer } from "./reducers";

injectReducer("project", projectReducer);
