import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Paper, Button, Grid, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import UpdateForm from './UpdateForm';
import CustomButton from '../../../components/CustomButton';
import { makeStyles } from '@material-ui/core';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grid: {
    margin: "0 auto",
  },
  gridPaper: {
    padding: "16px"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  }
}))

UpdateBorder.propTypes = {
  borders: PropTypes.array,
  setBorders: PropTypes.func,
  all_borders: PropTypes.array
}

export default function UpdateBorder(props) {
  const { borders, setBorders, all_borders } = props
  return (
    <div>
      <Grid container spacing={2}>
        {
          borders.length != 0 ?
            borders.map(border => (
              <DisplayGrid border={border} key={border.id} />
            )) :
            (
              <Grid item xs={12}>
                <Typography variant="body2"
                  style={{ textAlign: "center", cursor: "pointer" }}>
                  No match found.
                  <Link color="secondary"
                    onClick={() => setBorders(all_borders)}
                  >
                    See All
                  </Link>
                </Typography>
              </Grid>
            )
        }
      </Grid>
    </div>
  )
}

const DisplayGrid = ({ border }) => {
  const classes = useStyles()
  const [showEditForm, setShowEditForm] = useState(false)
  const { username, flat, joined, accounts, status } = border
  const deposits = accounts.reduce((acc, val) => acc + val.amount, 0)
  const joinDate = new Date(joined)

  if (showEditForm) {
    return <UpdateForm
      border={border}
      setShowEditForm={setShowEditForm}
      showEditForm={showEditForm} />
  }
  return (
    <Grid item xs={12} sm={8} md={6} lg={4}
      className={classes.grid}>
      <Paper className={classes.gridPaper} elevation={5}>
        <TextDecorate
          title="Border Name"
          value={username} />
        <TextDecorate
          title="Flat/Room"
          value={flat} />
        <TextDecorate
          title="Joined Date"
          value={joinDate.toLocaleDateString()} />
        <TextDecorate
          title="Account Balance"
          value={deposits} />
        <TextDecorate
          title="Total Expenses"
          value="0" />
        <TextDecorate
          title="Remaining Balance"
          value={deposits} />
        <TextDecorate
          title="Status"
          value={status ? "Active" : "Inactive"} />
        <CustomButton
          onClick={() => setShowEditForm(true)}
          startIcon={<EditIcon />}>
          Edit
        </CustomButton>
        <CustomButton
          className={classes.button}
          startIcon={<DeleteIcon />}>
          Delete
        </CustomButton>
      </Paper>
    </Grid>
  )
}

DisplayGrid.propTypes = {
  border: PropTypes.object
}

export const TextDecorate = ({ title, value }) => {
  return (
    <Typography variant="body2" style={{
      display: "flex", flexDirection: "row",
      justifyContent: "space-between"
    }}>
      <span>
        <strong>{title} : </strong>
      </span>
      <span style={{ width: "40%", marginTop: "4px" }}>
        {value}
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