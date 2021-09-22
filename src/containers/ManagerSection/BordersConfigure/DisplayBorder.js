import React, { useState, useContext } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { BorderContext } from '../../../_contexts/BorderContext'
import {
  Divider, Typography, Paper, Button, TableHead,
  TableRow, Table, TableCell, TableBody, TableContainer,
  withStyles, Switch, Box
} from '@material-ui/core'
import { useStyles } from './styles'

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: theme.spacing(.5, 1)
  },
  head: {
    background: theme.palette.primary.main,
    color: "white",
  },
  body: {
    fontSize: 14,
  }
}))(TableCell)

export default function () {
  const classes = useStyles()
  const { bordersState } = useContext(BorderContext)
  const { borders } = bordersState
  return (
    <TableContainer component={Paper} className={classes.table} >
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Border Name</StyledTableCell>
            <StyledTableCell>Flat/Room</StyledTableCell>
            <StyledTableCell>Joined Date</StyledTableCell>
            <StyledTableCell>Credit</StyledTableCell>
            <StyledTableCell>Expense</StyledTableCell>
            <StyledTableCell>Balance</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            borders.length !== 0 ?
              borders.map((border, i) => (
                <TableRow key={border.id}>
                  <StyledTableCell>{i + 1}</StyledTableCell>
                  <StyledTableCell>{border.username}</StyledTableCell>
                  <StyledTableCell>{border.flat}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(border.joined).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell>
                    {border.accounts
                      .reduce((acc, val) => acc + val.amount, 0)}
                  </StyledTableCell>
                  <StyledTableCell>0</StyledTableCell>
                  <StyledTableCell>
                    {border.accounts
                      .reduce((acc, val) => acc + val.amount, 0)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Switch
                      size="small"
                      checked={border.status}
                      inputProps={{ 'aria-label': 'status checkbox' }}
                    />
                    {border.status ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell width={10}>
                    <CloseIcon
                      className={classes.deleteIcon}
                    />
                  </StyledTableCell>
                </TableRow>
              )) :
              <Box m={2}>
                Nothing to display
              </Box>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}