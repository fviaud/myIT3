import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectStoreAction } from "../../redux/project/actions";
import { TextField, Typography, Box, Divider } from "@material-ui/core";

export default ({ match }) => {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addProjectStoreAction({
        ...projects.values[match.params.id],
        id: match.params.id,
      })
    );
  }, []);

  return (
    <>
      <Box display="flex" mb={1}>
        <Typography color="primary" variant="h5">
          Settings
        </Typography>
      </Box>
      <Divider />
      <Box component="div" mt={2}>
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
  );
};
