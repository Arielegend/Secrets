import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Secret, dummySecret } from "../../Types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { CenteredGrid } from "./DialogContentGrid";
import { changeNameOfSecret, deleteSecret } from "../../../API";
import { checkMasterKey } from "../../Utils";

export interface SimpleDialogProps {
  dialogContent: Secret;
  open: boolean;
  onClose: () => void;
}

/*
  Args: 
    1. dialogContent : Secret -> at DIALOG, we present the data about a specific given secret.
    2. open          : Boolean  -> Indicates weather DIALOG is open or not.
    3. onClose       : Function -> The handling function closing the DIALOG. 
  */
export const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const [newSecretName, setNewSecretName] = useState("");
  const [secretMasrerKey, setSecretMasterKey] = useState("");

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  // Once pressing the 'CHANGE NAME' button,
  // If there is a valid name (i.e its length is no 0)
  //    1. Update JSON-SERVER using PUT comnnad,
  //    2. Alert a propr successful message,
  //    3. Closing the dialog
  //    4. Reloading page.
  function handleChangeSecretNameBttn() {
    if (newSecretName.length < 1) alert("Shipment name must be largen than 0");
    else {
      // newSecretName length is longer than 0, we check if Master key is valid
      if (checkMasterKey(secretMasrerKey)) {
        let newSecret = props.dialogContent;
        newSecret.name = newSecretName;
        changeNameOfSecret(newSecret, onClose);
      } else alert("Master key is wrong! (Master key is 42...)");
    }
  }

  // At Deleting, we confirm with the User he really wishes to delete.
  // Undo can NOT be done.
  function handleDeleteSecretBttn() {
    if (
      window.confirm(
        "Are you sure you want to delete this secret from the database?"
      )
    ) {
       // user confirmed deletion, we check if Master key is valid
      if (checkMasterKey(secretMasrerKey)) {
        deleteSecret(props.dialogContent);
      } else alert("Master key is wrong! (Master key is 42...)");
    }
  }

  // If input is not dummySecret -> we return a Dialog with contenct
  // Else,                         -> we return  empty <div></div>
  if (props.dialogContent !== dummySecret) {
    const secretToShow: Secret = props.dialogContent;
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullScreen
      >
        {/*Dialog Title*/}
        <DialogTitle id="simple-dialog-title">{secretToShow.name}</DialogTitle>
        {/*Dialog Main Content*/}
        <DialogContent>
          {/* CenteredGrid --> 
                                Helper displayer, it revices a secret, and return a grid with its all elements*/}
          <CenteredGrid secretToShow={secretToShow} />
        </DialogContent>

        {/* 
              At this point we finished display the given Secret.
              We offer the user to change the name of this secret, or to delete it.
          */}
        <Typography variant="h4" component="h2">
          Get control on your key!
        </Typography>
        <Grid>
          <Grid item xs={6}>
            {" "}
            <TextField
              label="Enter new name..."
              multiline
              rows={4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewSecretName(e.target.value)
              }
            ></TextField>
          </Grid>
          <br />
          <br />
          <br />
          <br />
          <TextField
            label="Enter secret master key ..."
            multiline
            rows={4}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSecretMasterKey(e.target.value)
            }
          ></TextField>
          <br />
          <br />
          <br />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleChangeSecretNameBttn}
          >
            Change name
          </Button>
          {"Or          "}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDeleteSecretBttn}
          >
            Click to Delete
          </Button>
        </Grid>
      </Dialog>
    );
  } else return <div></div>;
};
