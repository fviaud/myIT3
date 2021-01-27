import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectStoreAction, fetchProjectAction } from "../../redux/project/actions";
import { TextField, Typography, Box, Divider, makeStyles } from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

export default ({ match }) => {
  const curentUser = useSelector((state) => state.curentUser.values);
  const projects = useSelector((state) => state.projects);
  const project = useSelector((state) => state.project);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      // addProjectStoreAction({
      //   ...projects.values[match.params.id],
      //   id: match.params.id,
      //   members: [{ id: curentUser.id, name: curentUser.name, admin: true }],
      // })
      fetchProjectAction(match.params.id)
    );
  }, []);

  return (
    <>
      <Typography variant="subtitle1" className={classes.wrapIcon}>
        <FolderOpenIcon />
        <Box ml={1}>{projects.values[match.params.id].title}</Box>
      </Typography>
      <Divider />

      <Box display="flex" mt={1}>
        <Typography variant="h6" color="primary" className={classes.title}>
          Settings
        </Typography>
      </Box>

      {project.isLoading ? (
        <>
          <LinearProgress />
        </>
      ) : (
        project.values.id && (
          <>
            <Box component="div" mt={1}>
              <TextField
                fullWidth
                component="div"
                label={"Name"}
                required
                value={projects.values[match.params.id].title}
                InputProps={{ disableUnderline: true }}
                // inputProps={{ readOnly: true }}
              />
            </Box>
            <Box component="div" mt={2}>
              <TextField
                fullWidth
                label={"Détails"}
                required
                value={projects.values[match.params.id].body}
                multiline
                rowsMax={4}
                InputProps={{ disableUnderline: true }}
                // inputProps={{ readOnly: true }}
              />
            </Box>
          </>
        )
      )}
    </>
  );
};
