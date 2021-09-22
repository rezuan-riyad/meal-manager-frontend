import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
  root: {
    fontSize: "12px",
    padding: "4px 16px",
    fontWeight: "normal",
    lineHeight: "1rem",
    marginBottom: 0,
  }
}))

export default function CustomButton(props) {
  const classes = styles()
  return (
    <Button
      {...props}
      className={classes.root}
      variant="outlined"
      size="small"
      color="primary">
      {props.children}
    </Button>
  )
}