import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import CustomTextField from '../../../components/CustomTextField';
import {
  Typography, Checkbox, FormControlLabel, Button, IconButton, Paper,

} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: 300,
    marginRight: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      margin: "0 auto",
      width: "auto"
    }
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.only('xs')]: {
      flexDirection: "column"
    }
  },
  container: {
    margin: "0 auto",
  },
  gridDisplay: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    [theme.breakpoints.down('sm')]:{
      gridTemplateColumns: "auto"
    }
  },
  courseDisplay: {
    minWidth: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: 0,
  },
  header: {
    marginLeft: theme.spacing(2)
  },
  btn: {
    width: "100%"
  }
}))

export default function AddNewCourse() {
  const classes = useStyles()
  const [date, setDate] = useState()
  const [course, setCourse] = useState({ name: "", price: "", default: false })
  const [courses, setCourses] = useState([{ name: "Lunch", price: 30, default: true }])
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!course.name) return;
    setCourses([
      ...courses, {
        name: course.name,
        price: parseInt(course.price) || 0,
        default: course.default
      }
    ])
  }

  return (
    <div className={classes.root}>
      <AddCourseForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        course={course}
        setCourse={setCourse} />
      <DisplayCourse
        courses={courses} />
    </div>
  )
}

const AddCourseForm = (props) => {
  const classes = useStyles()
  const { handleSubmit, handleChange, course, setCourse } = props
  return (
    <form onSubmit={handleSubmit}
      className={classes.form}>
      <h4>Add New Course</h4>
      <CustomTextField
        type="text"
        value={course.name}
        name="name"
        label="Set meal course name*"
        handleChange={handleChange}
      />
      <CustomTextField
        type="number"
        value={course.price}
        name="price"
        label="Set meal price"
        handleChange={handleChange}
      />
      <Typography variant="caption" color="textSecondary">
        If price remain unset, it will be automatically calculated from shopping expences.
      </Typography>
      <FormControlLabel
        className={classes.formControl}
        control={
          <Checkbox checked={course.default}
            onChange={(e) => setCourse({ ...course, default: !course.default })} />
        }
        label={
          <Typography variant="body2">Set as default meal course</Typography>
        }
      />
      <Button
        className={classes.btn}
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        size="small">
        Confirm
      </Button>
    </form>
  )
}

const DisplayCourse = ({ courses }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <h4 className={classes.header}>All Meal Courses</h4>
      <div className={classes.gridDisplay}>
        {
          courses.map((course, i) => (
            <Paper key={i}
              className={classes.courseDisplay}>
              <div>
                <Typography variant="body2">
                  <strong>Course Name: </strong>{course.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Meal Rate: </strong> {course.price}
                </Typography>
                <Typography variant="body2">
                  <strong>Default: </strong>{course.default ? "Yes" : "No"}
                </Typography>
              </div>
              <div className={classes.deleteIcon}>
                <IconButton aria-label="delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </Paper>
          ))
        }
      </div>
    </div>
  )
}

DisplayCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    default: PropTypes.bool
  }))
}