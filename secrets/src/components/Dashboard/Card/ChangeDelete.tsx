import React, { FC, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Secret } from "../../Types";
import { changeNameOfSecret, deleteSecret } from "../../../API";
import { checkMasterKey } from "../../Utils";

export interface ChangeDeleteProps {
  secret: Secret;
  masterKey: string;
}

export const ChangeDelete: FC<ChangeDeleteProps> = (props) => {
  const [newName, setnewName] = useState("");

  // Once pressing the 'CHANGE NAME' button,
  // If there is a valid name (i.e its length is no 0)
  //    1. Update JSON-SERVER using PUT comnnad,
  //    2. Alert a propr successful message,
  //    3. Closing the dialog
  //    4. Reloading page.
  function handleClickChangeName() {
    if (newName.length < 1) alert("Secret new name must be largen than 0");
    else {
      if (checkMasterKey(props.masterKey)) {
        let newSecret = props.secret;
        newSecret.name = newName;
        changeNameOfSecret(newSecret);
      }
    }
  }

  // At Deleting, we confirm with the User he really wishes to delete.
  // Undo can NOT be done.
  function handleDeleteSecretBttn() {
    if (window.confirm("Are you sure you want to delete this secret?")) {
      if (checkMasterKey(props.masterKey)) {
        deleteSecret(props.secret);
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div>
        <TextField
          style={{ width: "100%" }}
          label="Enter new name..."
          multiline
          rows={2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setnewName(e.target.value)
          }
        ></TextField>
        <Button
          style={{ width: "100%" }}
          variant="outlined"
          color="primary"
          onClick={handleClickChangeName}
        >
          Change Name
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDeleteSecretBttn}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
