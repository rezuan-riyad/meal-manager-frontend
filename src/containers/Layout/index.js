import { Typography, Box } from '@material-ui/core'
import React from 'react'
import Navbar from './Navbar'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles(theme => ({
  copyright: {
    position: "static",
    bottom: "20px",
  }
}))

export default function Layout({ children }) {
  const classes = styles()
  return (
    <>
      <Navbar />
      {children}
      <Box textAlign="center" m={3}>
        <Typography variant="caption" gutterBottom
          className={classes.copyright}>
          copyright &copy; all rights reserved by meal manager
        </Typography>
      </Box>
    </>
  )
}