import React from 'react'
import { Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
  select: {
    fontSize: 14
  }
}))
export default function Selection(props) {
  const { value, handleChange, label, options } = props
  const classes = styles()
  return (
    <TextField
      select
      fullWidth
      size="small"
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      className={classes.textField}
      SelectProps={{ 
        native: true,
        classes: { select: classes.select }
      }}>
      {
        options ?
          options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          )) : null
      }
    </TextField>
  )
}