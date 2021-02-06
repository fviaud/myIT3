import React, { useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RouterLink, useLocation } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";

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

import { fetchRessourcesAction } from "../../redux/ressources/actions";
import DnsIcon from "@material-ui/icons/Dns";
import ComputerIcon from "@material-ui/icons/Computer";
import MoreIcon from "@material-ui/icons/MoreVert";

import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "./Paginations";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  contentBody: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

export default ({ match }) => {
  const classes = useStyles();
  const project = useSelector((state) => state.project);
  const ressources = useSelector((state) => state.ressources);

  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRessourcesAction(match.params.id, page));
  }, [dispatch, match.params.id, location]);

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref}>
      <RouterLink {...props} />
    </div>
  ));

  return ressources.isLoading ? (
    <LinearProgress />
  ) : project.values ? (
    <>
      {/* <Box display="flex" mt={1}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Ressources
        </Typography>
        <Formulaire />
      </Box> */}
      {ressources.error ? (
        <Alert severity="error">{ressources.error}</Alert>
      ) : (
        <>
          <Box display="flex" mt={1}>
            <Typography variant="h6" color="primary" className={classes.title}>
              Ressources
            </Typography>
            <Formulaire />
          </Box>

          {ressources.values ? (
            <List component="nav" aria-label="main mailbox folders">
              {ressources.values.map((ressource, index) => (
                <ListItem
                  button
                  component={CustomRouterLink}
                  to={`/project/${index}/overview`}
                  key={index}
                >
                  <ListItemAvatar>
                    {ressource.type === "environment" ? (
                      <DnsIcon />
                    ) : (
                      <ComputerIcon />
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={ressource.type} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <>empty</>
          )}
        </>
      )}
      {ressources.totalPages > 1 && (
        <Box className={classes.contentBody}>
          <Pagination total_pages={ressources.totalPages} />
        </Box>
      )}
    </>
  ) : (
    <Alert severity="error">{project.error}</Alert>
  );
};
