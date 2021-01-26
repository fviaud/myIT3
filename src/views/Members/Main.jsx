import React, { useEffect, useforwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Box, List, Typography, Divider } from "@material-ui/core";

import { fetchUsersAction } from "../../redux/users/actions";

import Formulaire from "./Formulaire";
import Item from "./Item";

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

  const handleClose = () => {
    setAnchorEl(null);
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
      <List>
        {project.values.members && project.values.members.map((user, index) => <Item user={user} index={index} />)}
      </List>
    </>
  );
};
