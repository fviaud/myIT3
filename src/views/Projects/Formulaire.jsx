import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FolderIcon from "@material-ui/icons/Folder";

import { TextField, Container, Box } from "@material-ui/core";
import "../../redux/project";
import { addProjectsStoreAction } from "../../redux/projects/actions";

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

  const handleClickOpen = () => {
    reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Le nom du projet est requis")
      .min(3, "Le nom du projet doit etre superieur à trois caractères")
      .max(20, "Le nom du projet doit etre inferieur à 20 caractères"),
    detail: yup.string().required("Detail est requis").max(80, "Le nom du projet doit etre inferieur à 20 caractères"),
  });

  const { reset, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addProjectsStoreAction(data));
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" size="small" startIcon={<FolderIcon />} onClick={handleClickOpen}>
        New
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Créer un projet
            </Typography>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Typography variant="h6" className={classes.margin}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae itaque molestiae distinctio, ipsam,
            quibusdam exercitationem dolor odit excepturi nostrum molestias facere, inventore reprehenderit explicabo
            eum aspernatur ullam ab tempora! Cumque!
          </Typography>

          <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="name"
              label="Nom du projet"
              required
              variant="outlined"
              className={classes.margin}
              inputRef={register}
              error={errors.name ? true : false}
              helperText={errors.name && errors.name.message}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              name="detail"
              label="Détails"
              required
              multiline
              rowsMax={4}
              variant="outlined"
              className={classes.margin}
              inputRef={register}
              error={errors.detail ? true : false}
              helperText={errors.detail && errors.detail.message}
            />

            <Button type="submit" variant="contained" size="small" color="primary" className={classes.margin}>
              save
            </Button>
          </form>
        </Container>
      </Dialog>
    </div>
  );
};
