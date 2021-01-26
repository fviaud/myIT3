import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DnsIcon from "@material-ui/icons/Dns";
import ComputerIcon from "@material-ui/icons/Computer";
import Slide from "@material-ui/core/Slide";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Container, Grid, Box, Card, CardActionArea, CardContent } from "@material-ui/core";
import { addRessourcesStoreAction } from "../../redux/ressources/actions";
import StorageIcon from "@material-ui/icons/Storage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
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
  card: {
    minWidth: 275,
  },
  titleCard: {
    fontSize: 14,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default () => {
  const classes = useStyles();
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [ressource, setRessource] = useState(0);
  const [value, setValue] = useState(0);
  const onOffre = (data) => {
    setRessource(data);
    setValue(1);
  };

  const handleClickOpen = () => {
    reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const schema = yup.object().shape(
    ressource && ressource.type === "environment"
      ? {
          name: yup
            .string()
            .required("Le nom de l'environement est requis")
            .min(3, "Le nom de l'environnement doit etre superieur à trois caractères")
            .max(20, "Le nom de l'environnement doit etre inferieur à 20 caractères"),
        }
      : {
          operatingSystem: yup.string().required("Operating system est requis"),
        }
  );

  const { reset, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addRessourcesStoreAction({ project: project.values.id, ...ressource, ...data }));
    setValue(0);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="primary" size="small" startIcon={<StorageIcon />} onClick={handleClickOpen}>
        New
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add ressource
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
            <div className={classes.root}>
              <TabPanel value={value} index={0}>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                  <Grid item onClick={() => onOffre({ type: "environment" })}>
                    <Card className={classes.card} variant="outlined">
                      <CardActionArea>
                        <CardContent>
                          <DnsIcon />
                          <Typography className={classes.titleCard} color="textSecondary" gutterBottom>
                            Environment
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item onClick={() => onOffre({ type: "virual machine" })}>
                    <Card className={classes.card} variant="outlined">
                      <CardActionArea>
                        <CardContent>
                          <ComputerIcon />
                          <Typography className={classes.titleCard} color="textSecondary" gutterBottom>
                            virtual machine
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {ressource.type === "environment" ? (
                  <TextField
                    fullWidth
                    name="name"
                    label="Name of environment"
                    required
                    variant="outlined"
                    className={classes.margin}
                    inputRef={register}
                    error={errors.name ? true : false}
                    helperText={errors.name && errors.name.message}
                  />
                ) : (
                  <TextField
                    fullWidth
                    name="operatingSystem"
                    label="Operating system"
                    required
                    variant="outlined"
                    className={classes.margin}
                    select
                    SelectProps={{ native: true }}
                    inputRef={register}
                    error={errors.operatingSystem ? true : false}
                    helperText={errors.operatingSystem && errors.operatingSystem.message}
                  >
                    <option aria-label="None" value="" />
                    <option value={"debian"}>Debian</option>
                    <option value={"ubuntu"}>Ubuntu</option>
                    <option value={"Windows"}>Windows</option>
                  </TextField>
                )}
              </TabPanel>
              {value === 1 && (
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Button variant="contained" color="primary" onClick={() => setValue(value - 1)}>
                      Back
                    </Button>
                  </Box>
                  <Button variant="contained" color="primary" type="submit">
                    Add
                  </Button>
                </Box>
              )}
            </div>
          </form>
        </Container>
      </Dialog>
    </>
  );
};
