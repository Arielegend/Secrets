import React, { FC } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Secret } from "../Types";

// At this function we prepare our data to the main table.
// We wish NOT to show the text of the secret, so wo display "***" instead.
function getRowsFixed(rows: Secret[]) {
  let rowsFixed: Secret[] = [];
  let tempId = "";
  let tempName = "";

  rows.forEach((secret: Secret) => {
    tempId = secret.id;
    tempName = secret.name;
    rowsFixed.push({ id: tempId, name: tempName, text: "***" });
  });
  return rowsFixed;
}

export interface SecretsTableProps {
  secrets: Secret[];
}

// Columns for main secrets table
export const MainTableColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "text", headerName: "Text", width: 100 },
];
export const SecretsTable: FC<SecretsTableProps> = (props) => {
  const rows_Fixed: Secret[] = getRowsFixed(props.secrets);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows_Fixed} columns={MainTableColumns} />
    </div>
  );
};
