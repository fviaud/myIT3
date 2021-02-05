import React, { Suspense, useEffect } from "react";
import firebase, { analytics, auth, firestore, storage } from "firebase";
import { createBrowserHistory } from "history";
import { default as Routes } from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction,signInUsersAction } from "./redux/store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
const browserHistory = createBrowserHistory();


import authentication from "./services/authentication";

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
    // const user= {email:"fredy@free.fr",password:"admin33"}
    // dispatch(signInUsersAction(user))

    // dispatch(fetchUserAction());
  }, []);

  // if (module.hot) {
  //   module.hot.accept()
  // }

 


  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes />
    </Suspense>
  );
};

export default App;
