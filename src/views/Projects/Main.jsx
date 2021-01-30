import React, { lazy, Suspense } from "react";
import { makeStyles, Box, Typography, Divider } from "@material-ui/core";
import Formulaire from "./Formulaire";
import LinearProgress from "@material-ui/core/LinearProgress";

const ListProjects = lazy(() => import("./ListProjects"));

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <>
      <Box display="flex" mb={1}>
        <Typography color="primary" variant="h5" className={classes.title}>
          Projects
        </Typography>
        <Formulaire />
      </Box>
      <Divider />
      <Suspense fallback={<LinearProgress />}>
        <ListProjects />
      </Suspense>
    </>
  );
};
