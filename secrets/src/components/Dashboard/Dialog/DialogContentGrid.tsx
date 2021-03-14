import React, { FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Secret } from "../../Types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export interface GridType {
  secretToShow: Secret;
}

/*
Helper displayer Function.
Recives a secret
Returns a grid with all secret elemnts
*/
export const CenteredGrid: FC<GridType> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {"Secret id:   "}
            {props.secretToShow.id}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {"Name:   "}
            {props.secretToShow.name}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {"Text:   "}
            {props.secretToShow.text}
          </Paper>
        </Grid>

        <br />
      </Grid>
      <br />
    </div>
  );
};
