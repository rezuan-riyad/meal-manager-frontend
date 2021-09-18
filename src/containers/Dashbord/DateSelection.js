import React, { useEffect, useContext } from 'react'
import { TextField, Box } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { GlobalContext } from '../../_contexts/GlobalContext'
import { getDatesInWeek, getWeekOptions, months } from '../../utilities/dateMonthYear'
import { daysPerMonth, formateDate } from '../../utilities/dateMonthYear'

const useStyles = makeStyles((theme) => ({
  textfield: {
    minWidth: 100,
    marginRight: 10,
  },
  resize: {
    fontSize: 14,
  }
}))

export default function DateSelection() {
  const classes = useStyles()
  const { state, setState } = useContext(GlobalContext)
  const totalDates = daysPerMonth(state.year, state.month)
  const handleChange = (e) => {
    let date = e.target.value
    let month = state.month
    let year = state.year
    setState({
      ...state,
      date: date,
      selectedDates: [formateDate(date, month, year)]
    })
  }

  return (
    <Box>
      <TextField
        select
        className={classes.textfield}
        label="Select Date"
        value={state.date}
        onChange={handleChange}
        SelectProps={{ native: true }}>
          {
            [... new Array(totalDates)].map( (elem, i)=> (
              <option key={i} value={i+1}>{i+1}</option>
            ))
          }
      </TextField>
    </Box>
  )
}