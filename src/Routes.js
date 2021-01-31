import React, { lazy, } from "react";
import { Switch, Redirect } from "react-router-dom";


import { RouteWithLayout } from "./components";
import { Main as MainLayout } from "./layouts";
import { Project as ProjetLayout } from "./layouts";

import { Ressources, Members, Billing } from "./views";

const Projects = lazy(() => import("./views/Projects"));
const Project = lazy(() => import("./views/Project"));

export default () => {
  return (
    <Switch>

      <RouteWithLayout
        component={Projects}
        exact
        layout={MainLayout}
        path="/dashboard"
      />

      <RouteWithLayout
        component={Project}
        exact
        layout={ProjetLayout}
        path="/project/:id/overview"
      />

      <RouteWithLayout
        component={Ressources}
        exact
        layout={ProjetLayout}
        path="/project/:id/ressources"
      />

      <RouteWithLayout
        component={Members}
        exact
        layout={ProjetLayout}
        path="/project/:id/members"
      />

      <RouteWithLayout
        component={Billing}
        exact
        layout={ProjetLayout}
        path="/project/:id/billing"
      />

      <Redirect to="/dashboard" />
    </Switch>
  );
};


