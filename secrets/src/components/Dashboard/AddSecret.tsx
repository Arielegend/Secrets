import React, { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addSecret } from "../../API";
import { checkMasterKey } from "../Utils";
import { v4 as uuidv4 } from "uuid";
export interface AddSecretProps {
  masterKey: string;
}

export const AddSecret: FC<AddSecretProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [newSecretName, setNewSecretName] = useState("");
  const [newSecretText, setNewSecretText] = useState("");

  const handleClickOpen = () => {
    if (checkMasterKey(props.masterKey)) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBttn = () => {
    if (newSecretName.length > 0 && newSecretText.length > 0) {
      addSecret({
        id: uuidv4(),
        name: newSecretName,
        text: newSecretText,
      });
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        size="medium"
      >
        Add new Secret
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new secret!</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBttn} color="primary" size="medium">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
