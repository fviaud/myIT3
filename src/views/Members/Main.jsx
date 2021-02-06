import React, { useEffect, useforwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Box, List, Typography, Divider } from "@material-ui/core";
import { fetchUsersAction } from "../../redux/users/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { fetchProjectAction } from "../../redux/project/actions";

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

export default ({ match }) => {
  const classes = useStyles();
  const project = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectAction(match.params.id));
    dispatch(fetchUsersAction());
  }, [dispatch]);

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return project.isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Box display="flex" mt={1}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Members
        </Typography>
        <Formulaire />
      </Box>
      <List>
        {project.values &&
          project.values.members.map((user, index) => (
            <Item user={user} index={index} />
          ))}
      </List>
    </>
  );
};
