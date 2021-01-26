import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout } from "./layouts";
import { Project as ProjetLayout } from "./layouts";

import { Dashboard, Project, Ressources, Members, Billing } from "./views";

export default () => {
  return (
    <Switch>

      <RouteWithLayout
        component={Dashboard}
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


