import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default function ButtonAppBar() {
  return (
    <>
      <Toolbar>
        <Button small>Ajouter</Button>
        <Button small>Supprimer</Button>
      </Toolbar>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero asperiores
      ipsa error aliquam id, ullam sit porro aperiam, facilis officia culpa.
      Est, obcaecati? Accusantium minima quis provident dicta, blanditiis
      architecto?
    </>
  );
}
