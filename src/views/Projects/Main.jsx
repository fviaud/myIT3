import React, { useEffect, forwardRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Divider,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import Pagination from "./Paginations";
import { fetchProjectsAction } from "../../redux/projects/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Formulaire from "./Formulaire";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  contentBody: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

export default () => {
  const classes = useStyles();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page");
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchProjectsAction(page));
  }, [dispatch, location]);

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref}>
      <RouterLink {...props} />
    </div>
  ));
  return projects.isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Box display="flex" mb={1}>
        <Typography color="primary" variant="h5" className={classes.title}>
          Projects
        </Typography>
        <Formulaire />
      </Box>

      {projects.values && (
        <List component="nav">
          {projects.values.map((project, index) => (
            <ListItem
              button
              component={CustomRouterLink}
              to={`/project/${project.id}/overview`}
              key={index}
            >
              <ListItemAvatar>
                <FolderIcon />
              </ListItemAvatar>
              <ListItemText primary={project.title} />
            </ListItem>
          ))}
        </List>
      )}
      {projects.totalPages > 1 && (
        <Box className={classes.contentBody}>
          <Pagination total_pages={projects.totalPages} />
        </Box>
      )}
    </>
  );
};
