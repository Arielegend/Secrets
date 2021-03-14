import React, { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addSecret } from "../../API";
import { checkMasterKey } from "../Utils";

export const AddSecret: FC = () => {
  const [open, setOpen] = useState(false);
  const [newSecretId, setNewSecretId] = useState("");
  const [newSecretName, setNewSecretName] = useState("");
  const [newSecretText, setNewSecretText] = useState("");
  const [masterKey, setMasterKey] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBttn = () => {
    if (
      newSecretId.length > 0 &&
      newSecretName.length > 0 &&
      newSecretText.length > 0
    ) {
      if (checkMasterKey(masterKey)) {
        addSecret({
          id: newSecretId,
          name: newSecretName,
          text: newSecretText,
        });
      } else alert("Master key is wrong! (Master key is 42...)");
    } else {
      alert("All parametrs length must be longer than 0");
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Secret
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new secret!</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewSecretId(e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewSecretName(e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Text"
            type="text"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewSecretText(e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Master Key"
            type="text"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMasterKey(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBttn} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
