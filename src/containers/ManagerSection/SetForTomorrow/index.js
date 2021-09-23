import React from 'react'
import Layout from '../../Layout'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import { StyledContainer } from '../../../styles/customComponent'
import Header from './Header'
import Courses from './Courses'
import CourseSettings from './CourseSettings'

const styles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  background: {
    backgroundImage: `linear-gradient(${theme.palette.primary.light}, #eeeeee)`
  }
}))

export default function SetForTomorrow() {
  const classes = styles()
  return (
    <Layout>
      <Box className={classes.background}>
        <Header />
      </Box>
      <StyledContainer>
        <Courses />
        <CourseSettings />
      </StyledContainer>
    </Layout>
  )
}