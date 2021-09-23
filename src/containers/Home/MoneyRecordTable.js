import {
  TableContainer, Table, TableRow, TableCell,
  TableBody, TableHead, Paper
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import React from 'react'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.secondary.extraLight
    }
  }
}))(TableRow);

const borders = [{ id: 1, borderName: "John Doe", deposit: 1900, expense: 1400, balance: 500 },
{ id: 2, borderName: "Jane Doe", deposit: 1900, expense: 1400, balance: 500 },
{ id: 3, borderName: "Khan Rio", deposit: 1900, expense: 1400, balance: 500 },
{ id: 4, borderName: "Khan Rio", deposit: 1900, expense: 1400, balance: 500 },
{ id: 5, borderName: "Khan Rio", deposit: 1900, expense: 1400, balance: 500 },
{ id: 6, borderName: "Khan Rio", deposit: 1900, expense: 1400, balance: 500 },
{ id: 7, borderName: "Khan Rio", deposit: 1900, expense: 1400, balance: 500 }]

export default function MoneyRecordTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Border Name</StyledTableCell>
            <StyledTableCell>Deposit</StyledTableCell>
            <StyledTableCell>Expense</StyledTableCell>
            <StyledTableCell>Remaining</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            borders.map((elem, i) => (
                <StyledTableRow>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{elem.borderName}</TableCell>
                  <TableCell>{elem.deposit}</TableCell>
                  <TableCell>{elem.expense}</TableCell>
                  <TableCell>{elem.balance}</TableCell>
                </StyledTableRow>
              ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}