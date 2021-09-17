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
  const { type, value, name, handleChange, label, helperText } = props
  const classes = styles()
  return (
    <TextField
      type={type}
      autoComplete="true"
      size="small"
      variant="outlined"
      fullWidth
      value={value}
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
      name={name}
      label={label}
      onChange={handleChange}
      helperText={helperText}
    />
  )
}
