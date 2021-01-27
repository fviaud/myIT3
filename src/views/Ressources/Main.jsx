import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";
import Formulaire from "./Formulaire";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import DnsIcon from "@material-ui/icons/Dns";
import ComputerIcon from "@material-ui/icons/Computer";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

export default () => {
  const classes = useStyles();
  const project = useSelector((state) => state.project);
  const ressources = useSelector((state) => state.ressources);

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref}>
      <RouterLink {...props} />
    </div>
  ));

  return (
    <>
      <Typography variant="subtitle1" className={classes.wrapIcon}>
        <FolderOpenIcon />
        <Box ml={1}>{project.values.title}</Box>
      </Typography>
      <Divider />
      <Box display="flex" mt={1}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Ressources
        </Typography>
        <Formulaire />
      </Box>

      <List component="nav" aria-label="main mailbox folders">
        {ressources.values &&
          ressources.values
            .filter((ressource) => ressource.project === project.values.id)
            .map((ressource, index) => (
              <ListItem button component={CustomRouterLink} to={`/project/${index}/overview`} key={index}>
                <ListItemAvatar>{ressource.type === "environment" ? <DnsIcon /> : <ComputerIcon />}</ListItemAvatar>
                <ListItemText primary={ressource.type} />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
      </List>
    </>
  );
};
