import { injectReducer } from "../store";
import { usersReducer } from "./reducers";

injectReducer("users", usersReducer);
