import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { default as Routes } from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "./redux/store/actions";

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

const App = () => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserAction());
  }, []);
  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
};

export default App;
