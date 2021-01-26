import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectStoreAction } from "../../redux/project/actions";
import { Button, TextField, Typography, Box, Divider } from "@material-ui/core";

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
          component="div"
          label={"Name"}
          required
          value={projects.values[match.params.id].name}
          InputProps={{ disableUnderline: true }}
          // inputProps={{ readOnly: true }}
        />
      </Box>
      <Box component="div" mt={2}>
        <TextField
          label={"Détails"}
          required
          value={projects.values[match.params.id].detail}
          multiline
          rowsMax={4}
          InputProps={{ disableUnderline: true }}
          // inputProps={{ readOnly: true }}
        />
      </Box>
    </>
  );
};
