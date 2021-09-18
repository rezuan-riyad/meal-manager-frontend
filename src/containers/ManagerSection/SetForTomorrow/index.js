import React, { useContext } from 'react'
import Layout from '../../Layout'
import { CourseContext } from '../../../_contexts/CourseContext'
import { Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
const styles = makeStyles(theme => ({
  heading: {
    fontSize: 22
  }
}))

export default function SetForTomorrow() {
  const { coursesState, dispatch } = useContext(CourseContext)
  const classes = styles()
  
  const tomorrow = () => {
    const event = new Date()
    event.setDate(new Date().getDate() + 1)
    let day = days[event.getDay()]
    let date = event.toDateString().slice(4)
    return ` ${day} ${date}`
  }
  const handleNextDayClick = () => {

  }
  const handlePrevDayClick = () => {

  }
  return (
    <Layout>
      <Header 
        tomorrow={tomorrow}
        handleNextDayClick={handleNextDayClick}
        handlePrevDayClick={handlePrevDayClick}
        />
    </Layout>
  )
}

const Header = (props) => {
  const { tomorrow, handlePrevDayClick, handleNextDayClick } = props
  return (
    <Box textAlign="center" mt={2}>
      <Typography variant="h5">
        Set Meal Records For Tomorrow.
        <strong>{tomorrow()}</strong>
      </Typography>
      <Typography variant="caption"
        color="textSecondary">
        Set meal records which includes amount of meal per border and
        all courses along with small description about courses.
      </Typography>
      <div>
        <PrimaryButton
          text="Prev Day"
          onClick={handlePrevDayClick} />
        <PrimaryButton
          text="Next Day"
          onClick={handleNextDayClick} />
      </div>
    </Box>
  )
}

const PrimaryButton = ({ text, onClick }) => {
  const classes = makeStyles(theme => ({
    root: {
      margin: theme.spacing(1.5),
      padding: "2px 16px"
    }
  }))()

  return (
    <Button
      className={classes.root}
      variant="contained"
      size="small"
      color="secondary"
      onClick={onClick}>
      {text}
    </Button>
  )
}