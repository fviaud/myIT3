import React, { Suspense, useEffect } from "react";
import { createBrowserHistory } from "history";
import { default as Routes } from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "./redux/store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
const browserHistory = createBrowserHistory();

// export default () => {
//     const user = useSelector(state => state.user)
//     const dispatch = useDispatch()
//     useEffect(() => {dispatch(fetchUserAction())}, [])
//     // return user.isLoading ? "loading" : <>{user.values.name}</>
//     return user.isLoading ? "loading" : user.error ? user.error:
//     <>{user.values && user.values.name}
//     </>
// }

import "./redux/project";
import "./redux/projects";
import "./redux/ressources";
import "./redux/users";

const App = () => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserAction());
  }, []);

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes />
    </Suspense>
  );
};

export default App;
