import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Container, Paper, Button, Typography, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { CourseContext } from '../../../_contexts/CourseContext'
import { TextDecorate } from '../BordersConfigure/UpdateBorder'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import CustomButton from '../../../components/CustomButton'
import Backdrop from '../../../components/Backdrop'
import CustomTextField from '../../../components/CustomTextField'
import CustomAutocomplete from '../../../components/CustomAutocomplete'
import CourseSettings from './CourseSettings';

import { delete_course, update_course } from '../../../_actions/courses.action'
import { Alert } from '@material-ui/lab'
import { HeadText, Title } from './styles';
import useDateChecker from '../../../customHooks/useDateChecker';

const useStyles = makeStyles(theme => ({
  // Courses
  root: {
    margin: "0 auto"
  },
  paperParent: {
    width: "calc(100%/3)",
    display: "inline-block",
    [theme.breakpoints.only('sm')]: {
      width: "calc(100%/2)"
    },
    [theme.breakpoints.only('xs')]: {
      width: "100%"
    }
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 1),
    marginTop: 0,
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      marginRight: 0
    }
  },
  // Update Form
  form: {
    padding: theme.spacing(1.5),
    paddingTop: 0,
    width: 400,
  },
  confirmBtn: {
    marginTop: theme.spacing(1.5)
  },
  alert: {
    marginBottom: 15,
  },
  btnGroup: {
    "&>:nth-child(n)": {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.only('xs')]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      "&>:nth-child(n)": {
        marginRight: 0,
        width: "45%"
      }
    }
  }
}))

export default function Courses() {
  const { coursesState, dispatch } = useContext(CourseContext)
  const date = useDateChecker(coursesState.selectedDate)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editableCourse, setEditableCourse] = useState()
  const [action, setAction] = useState("")

  const classes = useStyles()

  const handleDeleteBtnClick = (course) => {
    let payload = {
      courseId: course.courseId
    }
    try {
      delete_course(dispatch, payload)
    } catch (error) {
      console.log("ERROR: ", error)
    }
  }
  const handleEditBtnClick = (course) => {
    setAction("update")
    setShowEditForm(true)
    setEditableCourse(course)
  }
  const handleAddBtnClick = () => {
    setAction("add")
    setShowEditForm(true)
    setEditableCourse({ name: "", description: "", cost: "", serveTime: "" })
  }
  return (
    <React.Fragment>
      <HeadText>Meal Courses</HeadText>
      <div className={classes.root}>
        {
          coursesState.selected.length === 0 ?
          <Typography>
            No meal courses for {date.day}, {date.value} {date.month}
            <span style={{ fontSize: "22px" }}>   &#128543;</span>
          </Typography> : null
        }
        {
          coursesState.selected.map((course, i) => (
            <div key={i} className={classes.paperParent}>
              <Paper elevation={4}
                className={classes.paper}>
                <Box mb={1}>
                  <Typography>
                    <strong>{course.name}</strong>
                  </Typography>
                  <Typography variant="caption"
                    color="textSecondary">
                    {course.description}
                  </Typography>
                </Box>
                <TextDecorate
                  title="Cost (App.)"
                  value={"Tk " + course.cost} />
                <TextDecorate
                  title="Serve Time"
                  value={course.serveTime} />
                <div className={classes.btnGroup}>
                  <CustomButton
                    onClick={() => handleEditBtnClick(course)}>
                    Edit Course
                  </CustomButton>
                  <CustomButton
                    onClick={() => handleDeleteBtnClick(course)}>
                    Delete
                  </CustomButton>
                </div>
              </Paper>
            </div>
          ))
        }
        {
          showEditForm ?
            <UpdateForm
              onClose={() => setShowEditForm(false)}
              course={editableCourse}
              action={action} /> : null
        }
      </div>
      <Box maxWidth="350px" margin="12px auto">
        <Button
          fullWidth
          size="small"
          color="primary"
          variant="contained"
          onClick={handleAddBtnClick}>
          Add New Course
        </Button>
      </Box>
    </React.Fragment>
  )
}

const UpdateForm = ({ course, onClose, action }) => {
  const { dispatch } = useContext(CourseContext)
  const [state, setState] = useState({ name: "", description: "", cost: "", serveTime: "" })

  useEffect(() => {
    setState({
      name: course.name,
      description: course.description,
      cost: course.cost,
      serveTime: course.serveTime
    })
  }, [course])

  const [isUpdating, setIsUpdating] = useState(false)
  const [updated, setUpdated] = useState(false)
  const classes = useStyles()
  const formRef = useRef(null)
  const closeBtnRef = useRef(null)

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let payload = {
      ...state,
      courseId: course.courseId,
      action: action
    }
    try {
      update_course(dispatch, payload)
      setIsUpdating(false)
      setUpdated(true)
      setTimeout(() => {
        setUpdated(false)
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Backdrop
      onClose={onClose}
      childRef={formRef}
      closeButtonRef={closeBtnRef}>
      <form className={classes.form} ref={formRef}
        onSubmit={(e) => {
          setIsUpdating(true)
          handleSubmit(e)
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <HeadText>
            {action === 'add' ? "Add Meal Course" : "Update Meal Course"}
          </HeadText>
          <IconButton
            ref={closeBtnRef}
            color="primary">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {updated ?
          <Alert className={classes.alert}>
            {action === 'add' ? "Add Successful" : "Update Successful"}
          </Alert> : null
        }
        <CustomTextField
          type="text"
          value={state.name}
          name="name"
          label="Course Name"
          handleChange={handleChange}
        />
        <CustomTextField
          type="text"
          value={state.description}
          name="description"
          label="Description"
          handleChange={handleChange}
        />
        <CustomTextField
          type="number"
          value={state.cost}
          name="cost"
          label="Approximate Cost"
          handleChange={handleChange}
        />
        <CustomAutocomplete
          options={["Morning", "Late Morning", "Noon", "Afternoon", "Twilight", "Night"]}
          label="Serve Time"
          name="serveTime"
          defaultValue={course.serveTime}
          onChange={(e, value) => {
            setState({ ...state, serveTime: value })
          }}
        />
        <Button size="small" type="submit"
          variant="contained" color="primary"
          className={classes.confirmBtn}
          disabled={isUpdating}>
          Confirm
        </Button>
      </form>
    </Backdrop>
  )
}