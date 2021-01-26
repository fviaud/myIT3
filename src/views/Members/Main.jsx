import React, { useEffect, useforwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";

import { fetchUsersAction } from "../../redux/users/actions";

import Formulaire from "./Formulaire";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  const project = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  return (
    <>
      <Box display="flex" mb={1}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Members
        </Typography>
        <Formulaire />
      </Box>

      <Divider />
      <List component="nav">
        {project.values.members &&
          project.values.members.map((user, index) => (
            <ListItem button key={index}>
              <ListItemText primary={user.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleClick}>
                  <MoreIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: "40ch",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleEdit}
                    // component={CustomRouterLink}
                    // to={{ pathname: `/tickets/edit/` + ticket._id }}
                  >
                    Nommer admin du projet
                  </MenuItem>
                  <MenuItem
                    onClick={handleEdit}
                    // component={CustomRouterLink}
                    // to={{ pathname: `/tickets/edit/` + ticket._id }}
                  >
                    Retirer du projet
                  </MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </>
  );
};
