import React, { FC, useEffect, useState } from "react";
import { Secret } from "../Types";
import { fetchUrl } from "../../API";
import { AddSecret } from "./AddSecret";
import { SimpleAccordion } from "./Card/Acordion";
import { TextField } from "@material-ui/core";

export const Dashboard: FC = () => {
  // All secrets we fetch from server
  const [secrets, setSecrets] = useState<Secret[]>([]);

  // By the search field we organize the secrets to show
  // NO CASE SENSITIVE
  const [secretsToShow, setSecretToShow] = useState<Secret[]>([]);

  // Master key has 1 place where we check its validity (whcich is "42")
  // this central validity check occurs at Utils.checkMasterKey
  const [masterKey, setMasterKey] = useState("");

  // loading -> A boolean indicates weather fetch is currently happening, or done.
  // Once fetch is done,  we are nd able to display table with its all rows.
  const [loading, setLoading] = useState(true);

  // Once this component is up, we refecth data.
  useEffect(() => {
    fetchUrl(setSecrets, setLoading, setSecretToShow);
  }, []);

  // We would like to present secrets to the user based on a search for their names..
  // No case Sensitive
  // In case Search is empty, we present all secrets
  // We Lowering all chars at search
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.toLowerCase();

    if (value.length === 0) {
      setSecretToShow(secrets);
    } else {
      // User had put some string to search secrets by...
      let secretsToShowBuilder: Secret[] = [];
      secrets.forEach((tmpSecret: Secret) => {
        if (tmpSecret.name.toLowerCase().includes(value)) {
          secretsToShowBuilder.push(tmpSecret);
        }
      });
      // updating secrets to show...
      setSecretToShow(secretsToShowBuilder);
    }
  }

  const topPart = (
    <div
      style={{
        marginLeft: "5%",
        marginRight: "5%",
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {" "}
      <h1>Dashboard</h1>
      <div style={{ marginTop: "2%" }}>
        <TextField
          label="Master Key"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMasterKey(e.target.value)
          }
        ></TextField>{" "}
      </div>
    </div>
  );

  const mainBody = (
    <div>
      {" "}
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <div className="SearchNDestroyDiv">
            <TextField
              style={{ paddingBottom: "1%" }}
              label="Search for a secret..."
              onChange={handleSearch}
            ></TextField>{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingBottom: "1%",
              }}
            >
              {" "}
              <AddSecret masterKey={masterKey} />
            </div>
          </div>

          {/* 
            We are passing secrets and master key
            * secrets   -> each secret will get its own card
            * masterKey -> in order to do API operations, and even view a secret, user must enter valid master key
          */}
          <SimpleAccordion secrets={secretsToShow} masterKey={masterKey} />
        </div>
      )}
    </div>
  );

  /*
  Dashboard has 2 main parts.
    * 1. Top -> h1 element, Master key input, 
    * 2. mainBody -> has the main Accordion displaying all searched secrets, 
    *               as well as searching and add new secrets fields 
              
  */
  return (
    <div>
      {topPart}
      <br />
      {mainBody}
    </div>
  );
};
