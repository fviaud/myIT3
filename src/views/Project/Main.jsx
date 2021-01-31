import React, { lazy, Suspense } from "react";

import { Typography, Divider, makeStyles } from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Project from "./Project";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

export default ({ match }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle1" className={classes.wrapIcon}>
        <FolderOpenIcon />
      </Typography>
      <Divider />
      <Project projectId={match.params.id} />
    </>
  );
};
