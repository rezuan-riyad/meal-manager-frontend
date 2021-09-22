import React, { useState, useEffect, useRef, useContext } from 'react'
import { CourseContext } from '../../../_contexts/CourseContext'
import { Typography, Box, TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DateRangeIcon from '@material-ui/icons/DateRange';

import Calender from '../../../components/Calender'
import useDateChecker from '../../../customHooks/useDateChecker'

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
const styles = makeStyles(theme => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  labelRoot: { fontSize: 14 },
  labelFocused: { fontSize: 14 },
  inputRoot: { fontSize: 14 },
  dateSelection: {

  },
  calender: {
    zIndex: 10,
    position: "absolute",
    marginLeft: theme.spacing(.8),
  }
}))

const tomorrow = () => {
  const event = new Date()
  event.setDate(new Date().getDate() + 1)
  return event
}
const formatDateString = (event) => {
  // event is a date-string
  let day = days[event.getDay()]
  let _date = event.toDateString().slice(4)
  return ` ${day} ${_date}`
}


export default function Header(props) {
  const { coursesState, dispatch } = useContext(CourseContext)
  const [date, setDate] = useState(tomorrow().toLocaleDateString())
  const [formatedDate, setFormatedDate] = useState(
    formatDateString(tomorrow())
  )
  const dateValidity = useDateChecker(date)
  const [showCalender, setShowCalender] = useState(false)
  const [calenderWidth, setCalenderWidth] = useState(null)
  const calenderRef = useRef(null)
  const classes = styles()

  // Setting Width of Calender
  useEffect(() => {
    const handleCalenderWidth = () => {
      let selectForm = document.getElementById("select-date")
      let width = selectForm.clientWidth
      setCalenderWidth(width)
    }
    window.addEventListener('resize', handleCalenderWidth)
    return () => {
      window.removeEventListener('resize', handleCalenderWidth)
    }
  })

  // Calender Display Handling
  const handleCalenderDisplay = (e) => {
    try {
      if (!calenderRef.current.contains(e.target) && showCalender)
        setShowCalender(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleCalenderDisplay)
    return () => {
      window.removeEventListener("click", handleCalenderDisplay)
    }
  })

  useEffect(() => {
    dispatch({
      type: "CHANGE/SELECTED_DATE",
      payload: { date }
    })
  }, [date])

  const getDate = (value) => {
    setDate(value.toLocaleDateString())
    setFormatedDate(formatDateString(value))
  }

  return (
    <Box className={classes.header}>
      <Typography variant="h5">
        Set Meal Records For Tomorrow.
        <strong>{formatedDate}</strong>
      </Typography>
      <Typography variant="caption"
        color="textSecondary">
        Set meal records which includes amount of meal per border and
        all courses along with small description about courses.
      </Typography>

      <Box mt={2} ref={calenderRef} className={classes.dateSelection}>
        <Typography
          style={{
            color: "red",
            fontSize: "12px",
            marginBottom: "16px"
          }}>
          {dateValidity.error}
        </Typography>
        <TextField
          fullWidth
          id="select-date"
          variant="outlined"
          size="small"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          label="Select Date"
          helperText="Valid date format is MM/DD/YYYY or you can select from calender."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowCalender(!showCalender)} />
              </InputAdornment>
            ),
            classes: {
              root: classes.inputRoot
            }
          }}
          InputLabelProps={{
            classes: {
              root: classes.labelRoot,
              focused: classes.labelFocused
            }
          }} />
        {
          showCalender ?
            <Box className={classes.calender}>
              <Calender
                preSelectedDate={tomorrow()}
                getDate={getDate}
                width={calenderWidth} />
            </Box> : null
        }
      </Box>
    </Box>
  )
}