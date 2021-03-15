import React, { FC } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Secret } from "../../Types";
import { AcordionRow } from "./AcordionSingleRow";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "90%",
      marginLeft: "5%",
    },
  })
);

export interface AccordionProps {
  secrets: Secret[];
  masterKey: string;
}

export const SimpleAccordion: FC<AccordionProps> = (props) => {
  const classes = useStyles();

  // Each secret gets its own ACORDION from AcordionRow component
  const mainAcordion = props.secrets.map((secret: Secret) => {
    return <AcordionRow secret={secret} masterKey={props.masterKey} />;
  });

  return <div className={classes.root}>{mainAcordion}</div>;
};
