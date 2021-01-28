import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchProjectAction, updateProjectAction } from "../../redux/project/actions";
import { TextField, Typography, Box, Divider, makeStyles, IconButton } from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import LinearProgress from "@material-ui/core/LinearProgress";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

export default ({ match }) => {
  const project = useSelector((state) => state.project);
  const classes = useStyles();
  const [edit, setEdit] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectAction(match.params.id));
  }, [match.params.id]);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Le nom du projet est requis")
      .min(3, "Le nom du projet doit etre superieur à trois caractères")
      .max(20, "Le nom du projet doit etre inferieur à 20 caractères"),
    detail: yup.string().required("Detail est requis").max(600, "Le detail doit etre inferieur à 120 caractères"),
  });

  const { reset, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(updateProjectAction(project.values.id, data));
    setEdit({});
  };

  return (
    <>
      <Typography variant="subtitle1" className={classes.wrapIcon}>
        <FolderOpenIcon />
        <Box ml={1}>{project.isLoading || project.values.title}</Box>
      </Typography>
      <Divider />

      {project.isLoading ? (
        <>
          <LinearProgress />
          <Box display="flex" mt={1}>
            <Typography variant="h6" color="primary" className={classes.title}>
              Settings
            </Typography>
          </Box>
        </>
      ) : (
        project.values.id && (
          <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" mt={1}>
              <TextField
                fullWidth
                component="div"
                label={"Name"}
                name="name"
                required
                inputRef={register}
                defaultValue={project.values.title}
                InputProps={{ disableUnderline: !edit.name }}
                inputProps={{ readOnly: !edit.name }}
                error={errors.name ? true : false}
                helperText={errors.name && errors.name.message}
              />
              {edit.name ? (
                <IconButton type="submit">
                  <CheckIcon />
                </IconButton>
              ) : (
                <EditIcon
                  onClick={() => {
                    setEdit((state) => ({ ...state, name: true }));
                  }}
                />
              )}
            </Box>
            <Box display="flex" mt={1}>
              <TextField
                fullWidth
                label={"Détails"}
                name="detail"
                required
                defaultValue={project.values.body}
                inputRef={register}
                multiline
                rowsMax={8}
                InputProps={{ disableUnderline: !edit.detail }}
                inputProps={{ readOnly: !edit.detail }}
                error={errors.detail ? true : false}
                helperText={errors.detail && errors.detail.message}
              />
              <Box>
                {edit.detail ? (
                  <IconButton type="submit">
                    <CheckIcon
                    // onClick={() => {
                    //   setEdit((state) => ({ ...state, detail: false }));
                    // }}
                    />
                  </IconButton>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setEdit((state) => ({ ...state, detail: true }));
                    }}
                  />
                )}
              </Box>
            </Box>
          </form>
        )
      )}
    </>
  );
};
