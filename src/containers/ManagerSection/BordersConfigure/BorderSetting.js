import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import CloseIcon from '@material-ui/icons/Close';
import { nanoid } from 'nanoid';
import {
  Divider, Typography, Paper, Button, TableHead,
  TableRow, Table, TableCell, TableBody, TableContainer,
  withStyles, Switch
} from '@material-ui/core'
import CustomTextField from '../../../components/CustomTextField'
import { useStyles } from './styles'

export default function BorderSetting() {
  const classes = useStyles()
  const [border, setBorder] = useState({
    id: "", name: "", password: "", active: true, joined: ""
  })
  const [borders, setBorders] = useState([
    { id: "1", name: "Riyad", password: "xdf", active: true, joined: new Date().toISOString() }
  ])
  const [borderInputErr, setBorderInputErr] = useState("")

  const handleBorderChange = (e) => {
    setBorder({ ...border, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!border.name || !border.password) {
      setBorderInputErr("Name and Password are required to add new border.")
      return;
    }

    setBorders([
      ...borders, {
        ...border,
        id: nanoid(),
        joined: new Date().toISOString()
      }
    ])

    setBorder({ id: "", name: "", password: "", joined: "", active: true })
  }
  const deleteBorder = (border) => {
    setBorders(borders.filter(elem => elem.id != border.id))
  }
  return (
    <React.Fragment>
      <Box paddingTop={1.5} className={classes.itemsBox}>
        {/********* FORM *******/}
        <div className={classes.formDiv}>
          <h4><u>Add New Border</u></h4>
          {
            borderInputErr ?
              <Typography variant="caption" color="error">
                {borderInputErr}
              </Typography> : null
          }
          <form onSubmit={handleSubmit}>
            <Box className={classes.item} mt={2}>
              <CustomTextField
                type="text"
                value={border.name}
                name="name"
                label="Border Name"
                handleChange={handleBorderChange}
                helperText="Border name should be unique."
              />
            </Box>
            <Box className={classes.item}>
              <CustomTextField
                type="password"
                value={border.password}
                name="password"
                label="Border Passcode"
                handleChange={handleBorderChange}
                helperText="With this passcode border will be able to login."
              />
            </Box>
            <Box float="right" mb={2} className={classes.confirmBtn}>
              <Button type="submit" variant="contained"
                size="small" color="primary" fullWidth>
                Confirm
              </Button>
            </Box>
          </form>

        </div>
        {/* Display Borders List */}
        <div>
          <h4><u>All Borders</u></h4>

          <BordersTable
            borders={borders}
            deleteBorder={deleteBorder} />
        </div>
      </Box>
    </React.Fragment >
  )
}

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: theme.spacing(.5, 1)
  },
  head: {
    background: theme.palette.text.primary,
    color: "white",
  },
  body: {
    fontSize: 14,
  }
}))(TableCell)

const BordersTable = ({ borders, deleteBorder }) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper} className={classes.table} >
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Border Name</StyledTableCell>
            <StyledTableCell>Joined Date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            borders.map((border, i) => (
              <TableRow key={border.id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>{border.name}</StyledTableCell>
                <StyledTableCell>
                  {new Date(border.joined).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Switch
                    size="small"
                    checked={border.active}
                    // onChange={() => handleActiveness(border)}
                    name="active"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  {
                    border.active ? "Active" : "Inactive"
                  }
                </StyledTableCell>
                <StyledTableCell width={10}>
                  <CloseIcon
                    className={classes.deleteIcon}
                    onClick={() => deleteBorder(border)} />
                </StyledTableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}