import React, { useState, useContext } from 'react'
import { BorderContext } from '../../../_contexts/BorderContext'

import { Box, Typography, Switch, Button, Link } from '@material-ui/core'
import { nanoid } from 'nanoid'
import CustomTextField from '../../../components/CustomTextField'
import { addNewBorder } from '../../../_actions/borders.action'
import PropTypes from 'prop-types';

AddBorder.propTypes = {
  tablePanelChange: PropTypes.func
}

export default function AddBorder({ tablePanelChange }) {
  const { bordersState, dispatch } = useContext(BorderContext)
  const { username, passcode, flat, account, status } = bordersState.border
  const [inputError, setInputError] = useState("")

  const handleBorderChange = (e) => {
    if (e.target.name === 'status') {
      dispatch({
        type: "FIELD/CHANGE",
        fieldName: e.target.name,
        payload: !status
      })
      return;
    }
    dispatch({
      type: "FIELD/CHANGE",
      fieldName: e.target.name,
      payload: e.target.value
    })
  }

  const renderForm = () => {
    // when bordersState.isSaved = false form will be renderd
    dispatch({ type: "BORDER/RESET" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !passcode) {
      setInputError("Username and Passcode are required.")
      return;
    }
    const isMatched = bordersState.borders.filter(elem => (
      elem.username === username
    ))
    if (isMatched.length !== 0) {
      setInputError("Username must be unique.")
      return;
    }
    const id = nanoid(10)
    const joined = new Date().toISOString()
    const accounts = [{
      date: new Date().toLocaleDateString(),
      amount: parseInt(account)
    }]
    const border = {
      username, flat, passcode, 
      status, id, joined, accounts
    }
    await addNewBorder(dispatch, border)

  }
  return (
    <React.Fragment>
      <Box paddingTop={1.5} maxWidth={350} margin="0 auto">
        <h4><u>Add New Border</u></h4>
        {
          inputError || bordersState.errorMessage ? (
            <>
              <Box marginBottom={1}>
                <Typography variant="caption" color="error">
                  {inputError}
                </Typography>
              </Box>
              <Box marginBottom={1}>
                <Typography variant="caption" color="error">
                  {bordersState.errorMessage}
                </Typography>
              </Box>
            </>
          ) : null
        }
        {
          bordersState.isSaved ?
            <Box>
              <Typography variant="body2">
                Successfully saved <strong>{username}</strong> as new border.
                <Link href="#" color="secondary"
                  display="block" onClick={renderForm}>
                  Add Another One
                </Link>
                <Link href="#" color="secondary"
                  display="block" onClick={tablePanelChange}>
                  See All Borders
                </Link>
              </Typography>
            </Box> :
            <form onSubmit={handleSubmit}>

              <CustomTextField
                type="text"
                value={username}
                name="username"
                label="Border Name"
                handleChange={handleBorderChange}
                helperText="Border name should be unique."
              />
              <CustomTextField
                type="text"
                value={flat}
                name="flat"
                label="Room or Flat"
                handleChange={handleBorderChange}
              />
              <CustomTextField
                type="number"
                value={account}
                name="account"
                label="Initial Account Balance (Tk)"
                handleChange={handleBorderChange}
              />
              <CustomTextField
                type="password"
                value={passcode}
                name="passcode"
                label="Border Passcode"
                handleChange={handleBorderChange}
                helperText="With this passcode border will be able to login."
              />
              <Switch
                size="small"
                checked={status}
                onChange={handleBorderChange}
                name="status"
                inputProps={{ 'aria-label': 'checkbox' }}
              />
              {
                status ? "Active" : "Inactive"
              }
              <Box mt={2}>
                <Button type="submit" variant="contained"
                  size="small" color="primary" fullWidth
                  disabled={bordersState.isSaving}>
                  Confirm
                </Button>
              </Box>
            </form>
        }
      </Box>
    </React.Fragment >
  )
}