import React, { useRef, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Button, Box, IconButton, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

import CloseIcon from '@material-ui/icons/Close';

import CustomTextField from '../../../components/CustomTextField'
import { update_border } from '../../../actions/bordersAction';
import { BorderContext } from '../../../contexts/BorderContext';

const editFormStyles = makeStyles(theme => ({
  backdrop: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 100
  },
  form: {
    background: "white",
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%, -50%)",
    minWidth: "300px",
    maxWidth: "400px",
    padding: theme.spacing(3),
    paddingTop: 0,
    margin: "30px auto"
  },
  alert: {
    padding: 0,
    paddingLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  }
}))

UpdateForm.propTypes = {
  border: PropTypes.object,
  setShowEditForm: PropTypes.func
}

export default function UpdateForm(props) {
  const { border, setShowEditForm } = props
  const { bordersState, dispatch } = useContext(BorderContext)
  const classes = editFormStyles()
  const formRef = useRef(null)
  const closeBtnRef = useRef(null)
  const [editableBorder, setEditableBorder] = useState(border)

  const handleClickEvent = (e) => {
    // when user click outside of form or close btn
    if (!formRef.current.contains(e.target) ||
      closeBtnRef.current.contains(e.target)) {
      setShowEditForm(false)
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleClickEvent)
    return () => {
      dispatch({ type: "BORDER/RESET" })
      window.removeEventListener("click", handleClickEvent)
    }
  }, [])

  const handleBorderChange = (e) => {
    setEditableBorder({
      ...editableBorder,
      [e.target.name]: e.target.value
    })
  }

  const handleBorderUpdate = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    update_border(dispatch, editableBorder)
  }

  return (
    <div className={classes.backdrop}>
      <Box ref={formRef} className={classes.form}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h4>Update Border Data</h4>
          <IconButton
            ref={closeBtnRef}
            color="primary">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {bordersState.isSaving ?
          <Typography style={{ marginBottom: "20px" }}>
            Saving ...
          </Typography> : null}
        {bordersState.isSaved ?
          <Alert severity="success" className={classes.alert}>
            Border updated successfully.
          </Alert> : null}
        <form
          onSubmit={(e) => handleBorderUpdate(e, border)}>
          <CustomTextField
            type="text"
            value={editableBorder.username}
            name="username"
            label="Border Name"
            handleChange={handleBorderChange}
            helperText="Border name should be unique."
          />
          <CustomTextField
            type="text"
            value={editableBorder.flat}
            name="flat"
            label="Room or Flat"
            handleChange={handleBorderChange}
          />
          <Switch
            size="small"
            checked={editableBorder.status}
            onChange={() => setEditableBorder({
              ...editableBorder, status: !editableBorder.status
            })}
            name="status"
            inputProps={{ 'aria-label': 'checkbox' }}
          />
          {
            editableBorder.status ? "Active" : "Inactive"
          }
          <Box marginTop={1} minWidth="50%">
            <Button
              variant="contained"
              size="small"
              color="primary"
              fullWidth
              type="submit"
            >
              Confirm
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  )
}
