import React, { useContext, useEffect } from 'react'
import { Box, TextField } from '@material-ui/core'
import { GlobalContext } from '../../_contexts/GlobalContext'
import { makeStyles } from '@material-ui/core/styles'
import { getWeekOptions, daysPerMonth, getDatesInWeek } from '../../utilities/dateMonthYear'

const useStyles = makeStyles((theme) => {
  return {
    textfield: {
      minWidth: 200,
    }
  }
})

export default function WeekSelection() {
  const { state, setState } = useContext(GlobalContext)
  const classes = useStyles()

  const handleChange = (e) => {
    const weekIndex = parseInt(e.target.value)
    const monthIndex = parseInt(state.month)
    const year = parseInt(state.year)
    const dates = getDatesInWeek(weekIndex, monthIndex, year)
    setState({
      ...state,
      week: weekIndex,
      selectedDates: dates
    })
  }
  return (
    <Box>
      <TextField
        select
        className={classes.textfield}
        label="Select Week"
        value={state.week}
        onChange={handleChange}
        SelectProps={{ native: true }}>
        {
          state.weekOptions ?
            state.weekOptions.map((option, i) => (
              <option key={i} value={i}>
                {option}
              </option>
            )) : null
        }
      </TextField>
    </Box>
  )
}