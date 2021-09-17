import React, { useEffect, useContext } from 'react'
import { TextField, Box } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { GlobalContext } from '../../contexts/GlobalContext'
import { getDatesInWeek, getWeekOptions } from '../../utilities/dateMonthYear'
import { months } from '../../utilities/dateMonthYear'

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginRight: 10,
  },
  resize: {
    fontSize: 14,
  }
}))

export default function MonthSelection() {
  const classes = useStyles()
  const { state, setState } = useContext(GlobalContext)

  const handleChange = (e) => {
    let val = e.target.value
    let weekOptions = getWeekOptions(state.year, val)
    setState({
      ...state,
      month: val,
      weekOptions: weekOptions,
    })
  }

  // set week = first_week and update dates when month value changes
  // useEffect(() => {
  //   let weekIndex = 0;
  //   let dates = getDatesInWeek(weekIndex, state.month, state.year)
  //   setState({
  //     ...state,
  //     week: 0,
  //     selectedDates: dates
  //   })
  // },[state.month])

  return (
    <Box>
      <TextField
        select
        className={classes.textfield}
        label="Select Month"
        value={state.month}
        onChange={handleChange}
        SelectProps={{ native: true }}>
        {
          months.map((option, i) => (
            <option key={i} value={i}>
              {option.label}
            </option>
          ))
        }
      </TextField>
    </Box>
  )
}