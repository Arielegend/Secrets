import React, { FC, useEffect, useState } from "react";
import { Secret } from "../Types";
import { SecretsTable } from "./AllSecretsTable";
import { fetchUrl } from "../../API";
import { ManipulateSecret } from "./HandleSecret";
import { AddSecret } from "./AddSecret";

export interface DashboardProps {}

export const Dashboard: FC<DashboardProps> = (props) => {
  const [secrets, setSecrets] = useState<Secret[]>([]);

  // loading -> A boolean indicates weather fetch is currently happening, or done.
  // Once fetch is done,  we are nd able to display table with its all rows.
  const [loading, setLoading] = useState(true);

  // Once this component is up, we refecth data.
  useEffect(() => {
    fetchUrl(setSecrets, setLoading);
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h1>Dashboard</h1>
          {secrets.length > 0 ? <SecretsTable secrets={secrets} /> : null}
          <ManipulateSecret secrets={secrets} />
          <br />
          <br />
          <AddSecret />
        </div>
      )}
    </div>
  );
};
