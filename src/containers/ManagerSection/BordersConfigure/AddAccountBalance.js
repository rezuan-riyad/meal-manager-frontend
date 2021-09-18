import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import { Grid, Paper, Typography, Button, Divider, Box, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert';

import CustomTextField from '../../../components/CustomTextField'
import CustomAutocomplete from '../../../components/CustomAutocomplete'
import Selection from '../../../components/Selection'
import { BorderContext } from '../../../_contexts/BorderContext';
import { add_account } from '../../../_actions/borders.action'

const useStyles = makeStyles(theme => ({
  grid: {
    margin: "0 auto",
  },
  gridPaper: {
    padding: "16px",
    textAlign: "center",
    maxWidth: "300px",
    margin: "0 auto"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  form: {
    maxWidth: "300px"
  },
  autocomplete: {
    marginBottom: theme.spacing(2)
  },
  alert: {
    padding: 0,
    paddingLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  },
  successAlert: {
    padding: 0,
    paddingLeft: theme.spacing(2)
  }
}))

AddAccountBalance.propTypes = {
  borders: PropTypes.arrayOf(PropTypes.object),
  setBorders: PropTypes.func
}

export default function AddAccountBalance(props) {
  const { dispatch, bordersState } = useContext(BorderContext)
  const { borders, setBorders } = props
  const classes = useStyles()
  const current_month = new Date().toString().slice(4, 7)
  const monthOptions = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  // local states
  const [month, setMonth] = useState(current_month)
  const [borderOptions, setBorderOptions] = useState([])
  const [selectedBorder, setSelectedBorder] = useState()
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Need to Update Later
    let options = []
    borders.forEach(border => {
      let obj = {
        username: border.username,
        flat: border.flat,
        id: border.id
      }
      options.push(obj)
    });
    setBorderOptions(options)
  }, [bordersState.borders])

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedBorder || !amount) {
      setError("All fields are required.")
      return;
    }
    const payload = {
      id: selectedBorder.id,
      account: {
        date: new Date().toLocaleDateString(),
        amount: parseInt(amount),
        monthFor: month
      }
    }
    await add_account(dispatch, payload)
    setAmount("")
    setError("")
  }
  const handleBorderSelect = (event, value) => {
    setSelectedBorder(value)
  }

  useEffect(() => {
    document.addEventListener("click", handleMessageReset)
    return () => {
      document.removeEventListener("click", handleMessageReset)
    }
  })

  const handleMessageReset = () => {
    dispatch({ type: "MESSAGE/RESET" })
  }

  return (
    <div>
      {
        bordersState.errorMessage ?
          <Alert
            severity="error"
            className={classes.successAlert}>
            {bordersState.errorMessage}
          </Alert> : null
      }
      {
        bordersState.successMessage ?
          <Alert
            severity="success"
            className={classes.successAlert}>
            {bordersState.successMessage}
          </Alert> : null
      }
      <Grid container spacing={2}>
        <Grid item style={{ margin: "0 auto" }}>
          {/* Add Account Balance */}
          <form className={classes.form} onSubmit={handleSubmit}
            onFocus={handleMessageReset}>
            <h4>Add Account Balance</h4>
            {error ?
              <Alert severity="error" className={classes.alert}>
                {error}
              </Alert> :
              null}
            <Box mb={2} pt={.5}>
              <CustomAutocomplete
                options={borderOptions}
                onChange={handleBorderSelect}
                label="Pick Border" />
            </Box>
            <Box mb={2}>
              <Selection
                value={month}
                handleChange={(e) => setMonth(e.target.value)}
                label="Month For"
                options={monthOptions}
              />
            </Box>
            <CustomTextField
              type="number"
              name="account"
              label="Amount"
              value={amount}
              handleChange={(e) => setAmount(e.target.value)}
            />
            <Button variant="contained" color="primary"
              size="small" type="submit" disabled={bordersState.isSaving}>
              ADD Balance
            </Button>
          </form>
        </Grid>
        <Grid item sm={12} md>
          <Grid item xs={12} container direction="column" alignItems="center">
            {/* Heading Section */}
            <Grid item xs
              className={classes.grid}>
              <h4>Balance Records</h4>
            </Grid>
            {/* Display Grid Items / Border's Balance Data */}
            <Grid item sm={12} md container spacing={2}>
              {
                borders.length != 0 ? borders.map(border => (
                  <DisplayGrid border={border} key={border.id} />
                )) : (
                  <NoMatchFound
                    onClick={() => setBorders(bordersState.borders)} />
                )
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const NoMatchFound = ({ onClick }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="body2"
        style={{ textAlign: "center", cursor: "pointer" }}>
        No match found.
        <Link color="secondary"
          onClick={onClick}
        >
          See All
        </Link>
      </Typography>
    </Grid>
  )
}

NoMatchFound.propTypes = {
  onClick: PropTypes.func
}

const DisplayGrid = ({ border }) => {
  const classes = useStyles()
  const totalAmount = border.accounts.reduce((acc, val) => acc + val.amount, 0)

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}
      className={classes.grid} key={border.id}>
      <Paper className={classes.gridPaper} elevation={5}>
        <Typography gutterBottom>
          <strong>{border.username}'s Record</strong>
        </Typography>
        {
          border.accounts.map((data, i) => (
            <TextDecorate
              key={i}
              title={data.date}
              value={data.amount} />
          ))
        }
        <Divider />
        <TextDecorate
          title="Total Deposit"
          value={totalAmount} />
        <TextDecorate
          title="Total Consumption"
          value="0" />
        <Divider />
        <TextDecorate
          title="Net Balance"
          value={totalAmount} />
      </Paper>
    </Grid>
  )
}

DisplayGrid.propTypes = {
  border: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      amount: PropTypes.number
    }))
  })
}

const TextDecorate = ({ title, value }) => {
  return (
    <Typography variant="body2" style={{
      display: "flex", flexDirection: "row",
      justifyContent: "space-between", alignItems: "center"
    }}>
      <span>
        {title} :
      </span>
      <span style={{ alignSelf: "right" }}>
        Tk. <strong>{value}</strong>
      </span>
    </Typography>
  )
}

TextDecorate.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}