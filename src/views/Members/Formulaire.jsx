import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Typography, List, ListItem, ListItemText, Divider, Chip, Avatar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FolderIcon from "@material-ui/icons/Folder";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { TextField, Container, Box } from "@material-ui/core";
import "../../redux/project";
import { addProjectStoreAction } from "../../redux/project/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  margin: {
    marginTop: theme.spacing(6),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = React.useState([]);

  const users = useSelector((state) => state.users);
  const project = useSelector((state) => state.project);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    dispatch(addProjectStoreAction({ ...project.values, members: [...project.values.members, ...members] }));
    handleClose();
  };

  const handleInputChange = (event, values) => {
    event.persist();
    setMembers((state) => [...values.map((user) => ({ id: user.id, name: user.name }))]);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<PersonAddIcon />}
        onClick={handleClickOpen}
        disabled={users.isLoading}
      >
        Add
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Ajouter des utilisateurs au projet
            </Typography>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Typography variant="h6" className={classes.margin}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae itaque molestiae distinctio, ipsam,
            quibusdam exercitationem dolor odit excepturi nostrum molestias facere, inventore reprehenderit explicabo
            eum aspernatur ullam ab tempora! Cumque!
          </Typography>
          <Divider />
          <Box display="flex" mt={4}>
            <Autocomplete
              multiple
              noOptionsText={"No results found"}
              options={users.values}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.name;
              }}
              // defaultValue={group.members}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    // avatar={<Avatar alt={option.name} src={apiAvatars + option.avatar} />}
                    avatar={<Avatar alt={option.name} src={option.avatar} />}
                    {...getTagProps({ index })}
                  />
                ))
              }
              style={{ width: "100%" }}
              onChange={(event, values) => handleInputChange(event, values)}
              disableClearable={true}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Box>
          <Button
            onClick={() => handleSave()}
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
          >
            save
          </Button>
        </Container>
      </Dialog>
    </div>
  );
};
