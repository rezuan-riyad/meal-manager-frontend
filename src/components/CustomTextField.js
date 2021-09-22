import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(2)
  },
  labelRoot: {
    fontSize: 14
  },
  labelFocused: {
    fontSize: 14,
  },
  inputRoot: {
    fontSize: 14,
  }
}))

export default function CustomTextField(props) {
  const classes = styles()
  return (
    <TextField
      {...props}
      autoComplete="true"
      size="small"
      variant="outlined"
      fullWidth
      className={classes.input}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused
        }
      }}
      InputProps={{
        classes: {
          root: classes.inputRoot
        }
      }}
      onChange={props.handleChange}
    />
  )
}
