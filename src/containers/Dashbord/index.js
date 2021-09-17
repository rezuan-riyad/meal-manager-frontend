import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Container, Typography, Toolbar, Hidden } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, IconButton, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Table from './Table'
import MonthSelection from './MonthSelection'
import WeekSelection from './WeekSelection';
import DateSelection from './DateSelection';
import Layout from '../Layout';

const useStyles = makeStyles((theme) => ({
  headChild: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
  },
  select: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1.5)
    },
  },
  paper: {
    borderRadius: "none",
    background: theme.palette.action.hover,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
  },
  input: {
    minWidth: 350,
    fontSize: 14,
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      width: "80%"
    },
  },
  iconButton: {
    padding: 8,
  },
}))

export default function Dashbord() {
  const classes = useStyles()

  return (
    <Layout>
      <Container>
        <div className={classes.headChild}>
          <div className={classes.select}>
            <MonthSelection />
            <Hidden smDown>
              <WeekSelection />
            </Hidden>
            <Hidden mdUp>
              <DateSelection />
            </Hidden>
          </div>
          <Paper component="form" className={classes.paper}>
            <InputBase
              className={classes.input}
              placeholder="Search by date e.g. 04/AUG/2021"
              inputProps={{ 'aria-label': 'search by date' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            {/* <Typography>{state.monthName}, {state.year}</Typography> */}
          </Paper>

        </div>
        <Table />
      </Container>
    </Layout>
  )
}
