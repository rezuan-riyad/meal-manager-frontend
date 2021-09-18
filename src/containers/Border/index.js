import {
  Container, TableRow, Typography, TableContainer,
  Table, TableHead, TableBody, Paper, Tab, TableCell, Box, Divider
} from '@material-ui/core'
import { StyledTableCell } from '../../styles/customComponent'
import React, { useContext } from 'react'
import Layout from '../Layout'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { GlobalContext } from '../../_contexts/GlobalContext'

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledPaper = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.4);"
  }
}))(Paper)

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    marginTop: theme.spacing(1.5)
  },
  insideCell: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  mealRecord: {
    display: "inline-block",
    margin: "10px",
    padding: theme.spacing(1.5),
    border: "1px solid lightgray"
  },
  text: {
    display: "inline-block",
    width: 150,
    textAlign: "left"
  },
  amount: {
    display: "inline-block",
    width: 80,
    textAlign: "right"
  }
}))

export default function Border() {
  const classes = useStyles()
  const { state, dataRecord } = useContext(GlobalContext)

  return (
    <Layout>
      <Container className={classes.root}>
        <Typography variant="h5" gutterBottom>Rezuan's Meal Record</Typography>
        <MealRecord />
        <RecordSummary />
      </Container>
    </Layout>
  )
}

const MealRecord = () => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">
              <Typography variant="subtitle1">Lunch</Typography>
              <div className={classes.insideCell}>
                <Typography variant="caption">Qty</Typography>
                <Typography variant="caption">Rate</Typography>
              </div>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography variant="subtitle1">Dinner</Typography>
              <div className={classes.insideCell}>
                <Typography variant="caption">Qty</Typography>
                <Typography variant="caption">Rate</Typography>
              </div>
            </StyledTableCell>
            <StyledTableCell align="center">Daily Cost</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {
            [...new Array(12)].map((elem, i) => (
              <StyledTableRow>
                <StyledTableCell>1/AUG/2021</StyledTableCell>
                <StyledTableCell>
                  <div className={classes.insideCell}>
                    <Typography variant="caption">1</Typography>
                    <Typography variant="caption">40</Typography>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div className={classes.insideCell}>
                    <Typography variant="caption">2</Typography>
                    <Typography variant="caption">30</Typography>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">60</StyledTableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const RecordSummary = () => {
  const classes = useStyles()
  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>Monthly Record Summary</Typography>
      <StyledPaper>
        <Box>
          <Typography variant="body1">
            <strong><u>Meal Costs</u></strong>
          </Typography>
          {
            [{ id: 1, courseName: 'Lunch', totalTaken: 23, totalCost: 700 },
            { id: 2, courseName: 'Dinner', totalTaken: 23, totalCost: 800 }].map((record) => {
              const { courseName, totalCost, totalTaken } = record
              const avgCost = (totalCost / totalTaken).toFixed(2)
              return (
                <Box key={record.id} className={classes.mealRecord}>
                  <Text text={`${courseName} Amount :`} amount={totalTaken} />
                  <Text text="Avg. Meal Rate :" amount={`Tk ${avgCost}`} />
                  <Text text={`Total ${courseName} Cost :`} amount={`Tk ${totalCost}`} />
                </Box>
              )
            })
          }
        </Box>
        <Box marginTop={2}>
          <Typography variant="body1">
            <strong><u>Other Expences</u></strong>
          </Typography>
          <Box className={classes.mealRecord}>
            <Text text="Khala Bill :" amount="Tk 500" />
            <Text text="Gas Bill :" amount="Tk 100" />
          </Box>
        </Box>

        <Box marginTop={2}>
          <Typography variant="body1">
            <strong><u>Net Balance</u></strong>
          </Typography>
          <Box className={classes.mealRecord}>
            <Text text="Deposit :" amount="Tk 3000" />
            <Text text="Total Expense :" amount="Tk 2000" />
            <Text text="Remaining :" amount="Tk 1000" />
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  )
}

const Text = ({ text, amount }) => {
  const classes = useStyles()
  return (
    <Typography variant="body2">
      <span className={classes.text}>{text}</span>
      <span className={classes.amount}>{amount}</span>
    </Typography>
  )
}