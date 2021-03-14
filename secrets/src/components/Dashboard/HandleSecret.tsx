import React, { FC, useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { dummySecret, Secret } from "../Types";
import { SimpleDialog } from "./Dialog/DialogUtils";

export interface HandleSecretProps {
  secrets: Secret[];
}

export const ManipulateSecret: FC<HandleSecretProps> = (props) => {
  // dialogContent ->
  //                At dialog, we present a specific secret
  const [dialogContent, setDialogContent] = useState<Secret>(dummySecret);

  // this variable holds the typing input of the user, reguarding a secret he wishes to view.
  const [secretToView, setSecretToView] = useState("");

  //Boolean indicates if Dialog is open or not.
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    //  Boolean indicated weather found a secret or no
    let found = false;
    props.secrets.map((secret: Secret, index: number) => {
      if (secretToView === secret.name || secretToView === secret.id) {
        found = true;
        // We found a secret in our DB with the given id OR name,
        //Setting the secret to show at dialog
        setDialogContent(props.secrets[index]);
        setOpen(true);
      }
    });
    if (!found) {
      alert("No such Secret ");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div>
        <TextField
          label="Search by name or id..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSecretToView(e.target.value)
          }
        ></TextField>
        <br />
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Search
        </Button>
        <SimpleDialog
          dialogContent={dialogContent}
          open={open}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};
