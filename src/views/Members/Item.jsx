import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";

import { addProjectStoreActio, updateProjectAction } from "../../redux/project/actions";

export default ({ user, index }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const project = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdmin = (id, etat) => {
    const user = { ...project.values.members[id], admin: etat };
    const members = project.values.members;
    members.splice(id, 1, user);
    dispatch(updateProjectAction(project.values.id, { members: [...members] }));
    handleClose();
  };

  const handleDelete = (id) => {
    const members = project.values.members;
    members.splice(id, 1);
    dispatch(updateProjectAction(project.values.id, { members: [...members] }));
    handleClose();
  };

  return (
    <ListItem button key={index}>
      <ListItemAvatar>
        <Avatar alt="" src="" />
      </ListItemAvatar>
      <ListItemText primary={user.name} />
      {user.admin && (
        <ListItemText>
          <Chip variant="outlined" label="Admin" size="small" />
        </ListItemText>
      )}
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleClick}>
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "40ch",
            },
          }}
        >
          <MenuItem onClick={() => handleAdmin(index, true)}>Nommer admin</MenuItem>
          <MenuItem onClick={() => handleAdmin(index, false)}>Démettre l'admin</MenuItem>
          <MenuItem onClick={() => handleDelete(index)}>retirer du projet</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
