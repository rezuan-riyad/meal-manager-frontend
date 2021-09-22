import React, { useState, useEffect } from 'react'
import { IconButton, makeStyles, Paper, Typography, Box } from '@material-ui/core'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import PropTypes from 'prop-types'

const styles = makeStyles(theme => ({
  calender: {
    border: "1px solid lightgray",
    padding: "0 16px",
    borderLeft: "1px solid lightgray",
    borderTop: "1px solid lightgray",
    margin: "0 auto",
  },
  calenderTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  arrowIcon: {
    margin: "0 16px"
  },
  weekDays: {
    listStyleType: "none",
    padding: 0,
  },
  date: {
    display: "inline-block",
    width: "14.2%",
    textAlign: "center",
    marginBottom: "8px",
  },
  dateText: {
    cursor: "pointer"
  },
  selected: {
    background: "yellow"
  },
  graySelected: {
    background: "lightgray"
  }
}))

Calender.propTypes = {
  width: PropTypes.number,
  getDate: PropTypes.func
}

Calender.defaultProps = {
  width: 300,
}


export default function Calender({ width, getDate, preSelectedDate }) {
  const classes = styles()
  const [weekStartDay, setWeekStartDay] = useState()
  const [date, setDate] = useState(new Date())
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [daysInMonth, setDaysInMonth] = useState(new Date(year, month + 1, 0))

  useEffect(() => {
    if(preSelectedDate){
      setDate(preSelectedDate)
    }
  },[])

  useEffect(() => {
    let temp = new Date(year, parseInt(month) + 1, 0)
    setDaysInMonth(temp.getDate())
    setYear(temp.getFullYear())
  }, [month])

  useEffect(() => {
    let temp = new Date(year, parseInt(month), 1)
    setWeekStartDay(temp.getDay())
  }, [month])

  const monthName = () => {
    let dd = new Date(year, month + 1, 0)
    let mm = dd.toLocaleString('default', { month: 'long' })
    return mm
  }

  const onLeftArrowClick = () => {
    let mm = parseInt(month)
    if (mm === 0) setYear(year - 1)
    mm = (mm + 12 - 1) % 12
    setMonth(mm)
  }
  const onRightArrowClick = () => {
    let mm = parseInt(month)
    if (mm === 11) setYear(year + 1)
    mm = (mm + 12 + 1) % 12
    setMonth(mm)
  }

  const handleDateSelection = (e) => {
    let dd = parseInt(e.target.textContent)
    setDate(new Date(year, month, dd))
    // after date selection , send date value to parent
    getDate(new Date(year, month, dd))
  }
  const dateStylingClass = (payload) => {
    let _classes = `${classes.date} `
    let selected = date.getDate() === payload && date.getMonth() === month
    let graySelected = date.getDate() === payload && date.getMonth() !== month
    if (selected) _classes = _classes + `${classes.selected}`
    else if (graySelected) _classes = _classes + `${classes.graySelected}`
    return _classes
  }

  return (
    <div>
      <Paper className={classes.calender} 
        elevation={10}
        style={ width ? { width } : { width: "350px" }}>
        <div className={classes.calenderTitle}>
          <IconButton
            className={classes.arrowIcon}
            size="small"
            onClick={onLeftArrowClick}>
            <ArrowLeft />
          </IconButton>
          <h4 style={{ textAlign: "center", margin: "0px" }}>
            {monthName()}, {year}
          </h4>
          <IconButton
            className={classes.arrowIcon}
            size="small"
            onClick={onRightArrowClick}>
            <ArrowRight />
          </IconButton>
        </div>
        <ul className={classes.weekDays}>
          {
            ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day, i) => (
              <li key={i} className={classes.date}>
                <Typography variant="caption">
                  {day.toUpperCase()}
                </Typography>
              </li>
            ))
          }
          {
            [...new Array(weekStartDay)].map((elem, i) => (
              <li className={classes.date} key={i}></li>
            ))
          }
          {
            [...new Array(daysInMonth)].map((elem, i) => (
              <li
                className={dateStylingClass(i + 1)}
                key={i}
                onClick={handleDateSelection}>
                <Typography variant="caption" className={classes.dateText}>
                  {i + 1}
                </Typography>
              </li>
            ))
          }
        </ul>
      </Paper>
    </div>
  )
}
