import React, { setState, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';

const styles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(2)
  },
  labelRoot: {
    fontSize: 14
  },
  labelFocused: {
    fontSize: 16,
  },
  inputRoot: {
    fontSize: 14,
  }
}))

export default function CustomAutocomplete({ options, label, onChange }) {
  const classes = styles()
  return (
    <Autocomplete
      autoSelect
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => `${option.username}, ${option.flat}`}
      renderOption={(option) => {
        return (
          <Typography variant="body2">
            {option.username}, {option.flat}
          </Typography>
        )
      }}
      renderInput={(params) => <TextField {...params}
          label={label}
          variant="outlined"
          size="small"
          InputLabelProps={{
            classes: {
              root: classes.labelRoot,
              focused: classes.labelFocused
            }
          }}
          InputProps={{
            ...params.InputProps,
            classes: {
              root: classes.inputRoot
            }
          }}
        />}
    />
  );
}
