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

import DnsIcon from "@material-ui/icons/Dns";
import ComputerIcon from "@material-ui/icons/Computer";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
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
      <Box display="flex" mb={1}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Ressources of this project
        </Typography>
        <Formulaire />
      </Box>
      <Divider />
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
