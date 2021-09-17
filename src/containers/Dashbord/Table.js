import React, { useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, InputBase, TableFooter } from '@material-ui/core';
import CellData from './CellData';

import mealData from '../../json/mealData.json'
import { generateMealData } from '../../json/fakeDataQuery'
import { GlobalContext } from '../../contexts/GlobalContext';
import Footer from './Footer'
import { Link } from 'react-router-dom';


// Custom TableCell Component
const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: theme.spacing(.5, 1)
  },
  head: {
    height: 30,
    fontWeight: 400,
    background: theme.palette.text.primary,
    color: "white",
    textAlign: "center"
  },
  body: {
    "&:nth-of-type(even)": {
      background: theme.palette.action.selected
    }
  }
}))(TableCell);

// Styling
const useStyles = makeStyles((theme) => ({
  leftCol: {
    textAlign: "left",
    paddingLeft: theme.spacing(1)
  },
  summery: {
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing(2)
  },
  disabled: {
    color: theme.palette.text.secondary
  },
  tableFooterCell: {
    color: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalCost: {
    padding: theme.spacing(1, 0),
    color: theme.palette.primary.main
  },
  link:{
    textDecoration: "none",
    color: "inherit"
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const { state, dataRecord } = useContext(GlobalContext)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    let current_month = new Date().getMonth()
    let monthExceeds = state.month > current_month
    monthExceeds ? setDisabled(true) : setDisabled(false)
  }, [state.month])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} >
        {/* Table Head */}
        <TableHead>
          <TableRowForHead mealData={mealData} />
        </TableHead>
        {/* Table Body */}
        <TableBody>
          <TableRowForName mealData={mealData} />
          <TableRowForRate mealData={mealData} />

          {dataRecord.data.map((user) => (
            <TableRow key={user.id}>
              <StyledTableCell>
                <Box className={classes.leftCol}>
                  <Link to={`/border/${user.id}`} className={classes.link}>
                    {user.name}
                  </Link>
                </Box>
              </StyledTableCell>
              {
                user.records.map((record, i) => {
                  return (
                    <StyledTableCell
                      key={i}
                      className={record.disabled ? classes.disabled : null}>
                      <CellData record={record} userId={user.id} />
                    </StyledTableCell>
                  )
                })
              }
            </TableRow>
          ))}
          {
            disabled ? null : <TableRowForFooter />
          }
        </TableBody>
      </Table>
      <Footer />
    </TableContainer>
  );
}

// Table Row For Head 
const TableRowForHead = () => {
  const classes = useStyles();
  const { state } = useContext(GlobalContext)
  return (
    <React.Fragment>
      <TableRow>
        <StyledTableCell>
          <Box className={classes.leftCol}>Date</Box>
        </StyledTableCell>
        {
          state.selectedDates.map((date) => {
            return (
              <StyledTableCell key={date}>
                {date}
              </StyledTableCell>
            )
          })
        }
      </TableRow>
    </React.Fragment>
  )
}

// Table Row for body
const TableRowForName = ({ mealData }) => {
  const classes = useStyles()
  const { state, dataRecord } = useContext(GlobalContext)
  return (
    <React.Fragment>
      <TableRow>
        <StyledTableCell>
          <Box className={classes.leftCol}>
            Border Name | Course Name
          </Box>
        </StyledTableCell>
        {
          dataRecord.mealData.map((data, i) => {
            return (
              <StyledTableCell key={i}>
                <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
                  <Typography variant="body2">{data.course[0].courseName}</Typography>
                  <Typography variant="body2">{data.course[1].courseName}</Typography>
                </Box>
              </StyledTableCell>
            )
          })
        }
      </TableRow>
    </React.Fragment>
  )
}

//Table Row for displaying meal Rate
const TableRowForRate = ({ mealData }) => {
  const classes = useStyles()
  const { state, dataRecord } = useContext(GlobalContext)
  return (
    <TableRow>
      <StyledTableCell>
        <Box className={classes.leftCol}>
          Meal Rate
        </Box>
      </StyledTableCell>
      {
        dataRecord.mealData.map((data, i) => {
          return (
            <StyledTableCell key={i}>
              <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center">
                <Typography variant="body2">{data.course[0].courseRate}</Typography>
                <Typography variant="body2">{data.course[1].courseRate}</Typography>
              </Box>
            </StyledTableCell>
          )
        })
      }
    </TableRow>
  )
}

const TableRowForFooter = () => {
  const classes = useStyles()
  const { dataRecord } = useContext(GlobalContext)

  return (
    <React.Fragment>
      <TableRow>
        <StyledTableCell className={classes.summery}>
          <Typography variant="body2">Total Meal</Typography>
          <Typography variant="body2">Cost (Taka)</Typography>
          <Typography variant="body2" className={classes.totalCost}>Daily Total (Taka)</Typography>
        </StyledTableCell>
        {
          dataRecord.mealData.map(elem => (
            <StyledTableCell>
              <Box>
                <Box className={classes.tableFooterCell}>
                  <Typography variant="body2">23</Typography>
                  <Typography variant="body2">33</Typography>
                </Box>
                <Box className={classes.tableFooterCell}>
                  <Typography variant="body2">23</Typography>
                  <Typography variant="body2">33</Typography>
                </Box>
                <Box className={classes.totalCost} textAlign="center">
                  <Typography variant="body2">456</Typography>
                </Box>
              </Box>
            </StyledTableCell>
          ))
        }
      </TableRow>
    </React.Fragment>
  )
}