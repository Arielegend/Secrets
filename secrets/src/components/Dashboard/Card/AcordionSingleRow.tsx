import React, { FC, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Secret } from "../../Types";
import { IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { ChangeDelete } from "./ChangeDelete";
import { checkMasterKey } from "../../Utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      color: "purple",
    },
  })
);

export interface AcordionRowProps {
  secret: Secret;
  masterKey: string;
}

// Function represents a single Accordion row
//
export const AcordionRow: FC<AcordionRowProps> = (props) => {
  const classes = useStyles();

  // Secret is being hidden by default.
  // In order to view it, user needs to:
  //                                    1. Enter valid Master key (42)
  //                                    2. Hold the eye icon
  const [hidden, setHidden] = useState(true);

  // When user is pressing icon to view the secret, we check for master key
  function handleMouseDown() {
    if (checkMasterKey(props.masterKey)) {
      setHidden(false);
    }
  }

  const headerAccordion = (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className={classes.heading}>{props.secret.name}</Typography>
    </AccordionSummary>
  );

  const detailsAccordion = (
    <AccordionDetails>
      <div className="AcordionRowDetailsContiner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <IconButton
              aria-label="delete"
              onMouseDown={handleMouseDown}
              onMouseUp={() => setHidden(true)}
            >
              <Visibility fontSize="small" />
            </IconButton>
            <div>
              {hidden ? (
                <div></div>
              ) : (
                <div style={{ width: "90%", marginTop: "1%" }}>
                  {checkMasterKey(props.masterKey) ? (
                    <Typography align="center">{props.secret.text}</Typography>
                  ) : (
                    ""
                  )}
                </div>
              )}{" "}
            </div>
          </div>

          <p>{props.secret.id}</p>
        </div>
        <div style={{ width: "50%" }}>
          <ChangeDelete secret={props.secret} masterKey={props.masterKey} />
        </div>
      </div>
    </AccordionDetails>
  );

  /*
    As seen, Accordion has 2 main parts.
    * headerAccordion -> Name of secret
    * detailsAccordion -> Once expanding the secret to view it, modify or delete
  */
  return (
    <Accordion style={{ backgroundColor: "#e6fffd" }}>
      {headerAccordion}
      {detailsAccordion}
    </Accordion>
  );
};
