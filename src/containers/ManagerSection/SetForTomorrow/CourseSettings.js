import React, { useState, useContext, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { CourseContext } from '../../../_contexts/CourseContext'
import {
  Paper, TableHead, IconButton,
  TableRow, Table, TableBody, TableContainer,
  Switch, Box, makeStyles, Typography, Button
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { StyledTableCell, StyledTableRow, Title, ParaText, HeadText } from './styles';
import useDateChecker from '../../../customHooks/useDateChecker'
import CustomButton from '../../../components/CustomButton';

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "auto",
    width: "100%"
  },
  table: { minWidth: 600 },
  cell: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  cellChild: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cellChildContent: {
    width: "50%",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  icon: { fontSize: 14 },
  border: { borderLeft: "1px solid lightgray" }
}))

export default function () {
  const classes = useStyles()
  const { coursesState, dispatch } = useContext(CourseContext)
  const { records } = coursesState
  const date = useDateChecker(coursesState.selectedDate)

  const handleMealsChange = (courseId) => {
    if (window.confirm('All meals will be on. Wanna Proceed?')) {
      dispatch({
        type: "UPDATE/ALL_MEALS",
        payload: { courseId }
      })
    }
  }

  return (
    <>
      <div className={classes.root}>
        <TableContainer component={Paper} className={classes.table}>
          <Box display="flex" justifyContent="space-between">
            <HeadText>Update Records</HeadText>
            <HeadText>{date.day}, {date.value}, {date.month}</HeadText>
          </Box>
          <Table size="small" >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Title>No</Title>
                </StyledTableCell>
                <StyledTableCell>
                  <Title>Border Name</Title>
                </StyledTableCell>
                {
                  records[0].courseDetails.map((course, i) => (
                    <StyledTableCell key={i}>
                      <Box className={classes.cell}>
                        <Title>{course.courseName}</Title>
                        <Box className={classes.cellChild}>
                          <Title>On/Off</Title>
                          <Title>Gest Meal</Title>
                        </Box>
                      </Box>
                    </StyledTableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                records.length !== 0 ?
                  records.map((record, i) => {
                    return (<StyledTableRow key={record.borderId}>
                      <StyledTableCell>
                        <Title>{i + 1}</Title>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Title>{record.borderName}</Title>
                      </StyledTableCell>
                      {
                        record.courseDetails.map((elem, i) => (
                          <DisplayGrid key={i}
                            courseDetail={elem}
                            borderId={record.borderId} />
                        ))
                      }
                    </StyledTableRow>
                    )
                  }) :
                  <Box m={2}>
                    Nothing to display
                  </Box>
              }
            </TableBody>
          </Table>
          <Box>
            <Typography variant="caption" color="textSecondary">
              You can on/off a meal for particular border.
              Guest meal can be set between 0 and 9.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            {
              records[0].courseDetails.map(course => (
                <CustomButton
                  style={{ marginLeft: "16px", marginBottom: "32px" }}
                  key={course.courseId}
                  onClick={() => handleMealsChange(course.courseId)}>

                  On {course.courseName} for all
                </CustomButton>
              ))
            }
          </Box>
        </TableContainer >
      </div >
      <Box maxWidth="350px" margin="12px auto">
        <Button
          fullWidth
          size="small"
          color="primary"
          variant="contained">
          Save Data To Server
        </Button>
      </Box>
    </>
  )
}

const DisplayGrid = ({ courseDetail, borderId }) => {
  const { dispatch } = useContext(CourseContext)
  const classes = useStyles()

  const handleStatusChange = () => {
    const payload = {
      borderId,
      courseId: courseDetail.courseId,
      action: 'update-meal-status'
    }
    dispatch({ type: "UPDATE/RECORDS", payload })
  }

  const handleGuestMealChange = (e, change) => {
    let newamount = courseDetail.guestMeal + change
    if (newamount < 0 || newamount > 9) return;

    const payload = {
      borderId, change,
      courseId: courseDetail.courseId,
      action: 'update-guest-meal'
    }
    dispatch({ type: "UPDATE/RECORDS", payload })
  }

  return (
    <React.Fragment>
      <StyledTableCell className={classes.border}>
        <div className={classes.cellChild}>
          <div className={classes.cellChildContent}>
            <ParaText style={{ paddingTop: "3px", display: "inline-block" }}>
              {courseDetail.mealStatus ? "On" : "Off"}
            </ParaText>
            <Switch
              color="primary"
              size="small"
              onChange={handleStatusChange}
              checked={courseDetail.mealStatus}
              inputProps={{ 'aria-label': 'status checkbox' }}
            />
          </div>
          <div className={classes.cellChildContent} >
            <IconButton size="small"
              onClick={(e) => handleGuestMealChange(e, -1)}>
              <RemoveIcon className={classes.icon} />
            </IconButton>
            <ParaText>{courseDetail.guestMeal}</ParaText>
            <IconButton size="small"
              onClick={(e) => handleGuestMealChange(e, 1)}>
              <AddIcon className={classes.icon} />
            </IconButton>
          </div >
        </div>
      </StyledTableCell>
    </React.Fragment>
  )
}