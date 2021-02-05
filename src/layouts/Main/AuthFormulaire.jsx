import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";

import { signInUsersAction } from "../../redux/store/actions";
import ButtonProgress from "./ButtonProgress";

export default function FormDialog({ loading }) {
  const dispatch = useDispatch();
  const curentUser = useSelector((state) => state.curentUser);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(20),
  });

  const { reset, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (user) => {
    dispatch(signInUsersAction(user));
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Authentification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To authenticate to this website, please enter your email address
              and password here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              inputRef={register}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              inputRef={register}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
            />

            {curentUser.error && (
              <Alert severity="error">{curentUser.error}</Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <ButtonProgress type="submit" loading={loading} />
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
