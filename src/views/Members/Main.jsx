import React, { useEffect, useforwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Box, List, Typography, Divider } from "@material-ui/core";
import { fetchUsersAction } from "../../redux/users/actions";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import Formulaire from "./Formulaire";
import Item from "./Item";

const useStyles = makeStyles(() => ({
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography variant="subtitle1" className={classes.wrapIcon}>
        <FolderOpenIcon />
        <Box ml={1}>{project.values.title}</Box>
      </Typography>
      <Divider />
      <Box display="flex" mt={1}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Members
        </Typography>
        <Formulaire />
      </Box>

      <List>
        {project.values.members && project.values.members.map((user, index) => <Item user={user} index={index} />)}
      </List>
    </>
  );
};
