import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Box, Container, CssBaseline } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Projects from "../../views/Projects";
import { fetchProjectsAction } from "../../redux/projects/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: "black",
    background: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const menuId = "primary-search-account-menu";
  const curentUser = useSelector((state) => state.curentUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjectsAction());
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tools
          </Typography>
          {curentUser.values ? (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Container fixed>
        <Box mt={5} />
        <Projects />
      </Container>
    </div>
  );
}
