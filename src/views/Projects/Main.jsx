import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { makeStyles, Box, List, ListItem, ListItemText, ListItemAvatar, Typography, Divider } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import Formulaire from "./Formulaire";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  const projects = useSelector((state) => state.projects);

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref}>
      <RouterLink {...props} />
    </div>
  ));

  return (
    <>
      <Box display="flex" mb={1}>
        <Typography color="primary" variant="h5" className={classes.title}>
          Your projects
        </Typography>
        <Formulaire />
      </Box>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {projects.values &&
          projects.values.map((project, index) => (
            <ListItem button component={CustomRouterLink} to={`/project/${index}/overview`} key={index}>
              <ListItemAvatar>
                <FolderIcon />
              </ListItemAvatar>
              <ListItemText primary={project.title} />
            </ListItem>
          ))}
      </List>
    </>
  );
};
