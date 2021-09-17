import React from 'react'
import { TableFooter, TableRow, Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles( (theme) => ({
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    margin: "0 10"
  }
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.btnGroup}>
      <Button variant="text" size="small" color="primary" className={classes.btn}>
        Previous Week
      </Button>
      <Divider orientation="vertical" flexItem variant="fullWidth"/>
      <Button variant="filled" size="small"  className={classes.btn}>
        Save Edit
      </Button>
      <Divider orientation="vertical" flexItem variant="fullWidth"/>
      <Button variant="text" size="small" color="primary" className={classes.btn}>
        Next Week
      </Button>
    </div>
  )
}