import React, { useEffect, useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import Selection from '../../../components/Selection'
import CloseIcon from '@material-ui/icons/Close';
import { nanoid } from 'nanoid';
import {
  Divider, Typography, Paper, Button, TableHead,
  TableRow, Table, TableCell, TableBody, TableContainer,
  IconButton,
  withStyles
} from '@material-ui/core'
import CustomTextField from '../../../components/CustomTextField'
import { useStyles } from './styles'
import Layout from '../../Layout';

export default function ShoppingData() {
  const classes = useStyles()
  const [date, setDate] = useState("1")
  const [month, setMonth] = useState("Jan")
  const [inputError, setInputError] = useState("")
  const [item, setItem] = useState({
    name: "", amount: "", rate: "", cost: "", unit: "kg", id: ""
  })
  const [items, setItems] = useState([
    { name: "Rice", amount: "2", rate: "50", cost: "100", unit: "kg", id: "2xyU" }
  ])

  // extras are miscellaneous expenses
  const [extra, setExtra] = useState({ title: "", cost: "" })
  const [extras, setExtras] = useState([])
  const [showExtraForm, setShowExtraForm] = useState(false)

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  const costChanging = useRef(false)

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }
  const handleMonthChange = (e) => {
    setMonth(e.target.value)
  }

  const handleItemChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  // add item to items array
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!item.name || !item.amount || !item.rate) {
      setInputError("All fields are required.")
      return;
    }
    setItems([...items, { ...item, id: nanoid(10) }])
    setItem({
      ...item,
      name: "", amount: "", cost: "", rate: ""
    })
    setInputError("")
  }
  const deleteItem = (item) => {
    setItems(items.filter(elem => elem.id != item.id))
  }

  useEffect(() => {
    // when cost is not changing, 
    // update cost based on rate and amount
    if (item.amount && item.rate && !costChanging.current) {
      const cost = (parseFloat(item.amount) * parseFloat(item.rate)).toFixed(2)
      setItem({
        ...item, cost: cost
      })
    }
    // when cost is changing, update rate
    if (costChanging.current && item.amount) {
      const rate = (parseFloat(item.cost) / parseFloat(item.amount)).toFixed(2)
      setItem({
        ...item,
        rate: rate
      })
    }
  }, [item.amount, item.rate, item.cost])

  // Miscellanious expenses handling
  const handleExtraExpenseChange = (e) => {
    setExtra({
      ...extra, [e.target.name]: e.target.value
    })
  }
  const handleExtraSubmit = (e) => {
    e.preventDefault()
    if (!extra.title || !extra.cost) {
      setInputError("All fields are required.")
      return;
    }
    setExtras([...extras, extra])
    setInputError("")
  }
  const deleteExtras = (extra) => {
    setExtras(extras.filter(item => item.id != extra.id))
  }

  return (
    <React.Fragment>
      <Layout>
      {/* Date and Month Selection Section */}
      <Box className={classes.root}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Grocery Shopping List Insertion for {month}, {date}.
          </Typography>
        </Box>
        <div className={classes.selectGroup}>
          <Box className={classes.selectionBox}>
            <Selection
              value={month}
              handleChange={handleMonthChange}
              label="Select Month"
              options={months}
            />
          </Box>
          <Box className={classes.selectionBox}>
            <Selection
              value={date}
              handleChange={handleDateChange}
              label="Select Date"
              options={["1", "2", "3"]}
            />
          </Box>
        </div>
      </Box>
      <Divider />
      <Box paddingTop={1.5} className={classes.itemsBox}>
        {/********* FORM *******/}
        <div className={classes.formDiv}>
          {/** Form Navigation */}
          <div className={classes.formNav}>
            <Typography variant="body2" gutterBottom
              className={classes.formNavItem}
              color={showExtraForm ? "textSecondary" : "textPrimary"}
              onClick={() => setShowExtraForm(false)}>
              <strong>Add Product</strong>
            </Typography>
            <Typography variant="body2" gutterBottom
              className={classes.formNavItem}
              color={showExtraForm ? "textPrimary" : "textSecondary"}
              onClick={() => setShowExtraForm(true)}>
              <strong>Extra Expense</strong>
            </Typography>
          </div>

          {
            inputError ?
              <Typography variant="caption" color="error">
                {inputError}
              </Typography> : null
          }
          {
            !showExtraForm ?
              // Form fields for adding grocery Items
              <form onSubmit={handleSubmit}>
                <Box className={classes.item} mt={2}>
                  <CustomTextField
                    type="text"
                    value={item.name}
                    name="name"
                    label="Product Name"
                    handleChange={handleItemChange}
                  />
                </Box>
                <Box className={classes.item}>
                  <Selection
                    value={item.unit}
                    handleChange={(e) => setItem({ ...item, unit: e.target.value })}
                    label="Select Unit"
                    options={["kg", "gm", "litter", 'ml', 'pices']}
                  />
                </Box>
                <Box className={classes.item} mt={2}>
                  <CustomTextField
                    type="number"
                    value={item.amount}
                    name="amount"
                    label="Product Amount"
                    handleChange={handleItemChange}
                  />
                </Box>
                <Box className={classes.item}>
                  <CustomTextField
                    type="number"
                    value={item.rate}
                    name="rate"
                    label={item.unit ? `Price/${item.unit}` : `Price/Unit`}
                    handleChange={handleItemChange}
                  />
                </Box>
                <Box className={classes.item}
                  onMouseEnter={() => costChanging.current = true}
                  onMouseLeave={() => costChanging.current = false}>
                  <CustomTextField
                    type="number"
                    value={item.cost}
                    name="cost"
                    label="Cost in Tk."
                    handleChange={handleItemChange}
                  />
                </Box>

                <Box float="right" mb={2}>
                  <Button type="submit" variant="contained"
                    size="small" color="primary">
                    Add
                  </Button>
                </Box>
              </form> :
              // form fields to add extra expenses
              <form onSubmit={handleExtraSubmit}>
                <Box className={classes.item} mt={2}>
                  <CustomTextField
                    type="text"
                    value={extra.title}
                    name="title"
                    label="Title"
                    handleChange={handleExtraExpenseChange}
                  />
                </Box>
                <Box className={classes.item}>
                  <CustomTextField
                    type="number"
                    value={extra.cost}
                    name="cost"
                    label="Cost"
                    handleChange={handleExtraExpenseChange}
                  />
                </Box>
                <Box float="right" mb={2}>
                  <Button type="submit" variant="contained"
                    size="small" color="primary">
                    Add
                  </Button>
                </Box>
              </form>
          }

        </div>
        {/* Display Added Shopping List */}
        <div>
          <Typography variant="body2" gutterBottom>
            <strong><u>Today's Bazar</u></strong>
          </Typography>

          <ShoppingListTable items={items} deleteItem={deleteItem} />
          {
            extras.length != 0 ? (
              <Box mt={2}>
                <Typography variant="body2" gutterBottom>
                  <strong><u>Extra Expenses</u></strong>
                </Typography>

                <ExtraExpenseTable extras={extras} deleteExtras={deleteExtras} />
              </Box>
            ) : null
          }

          <Box mt={2}>
            <StyledButton text="Save To Server" />
          </Box>
        </div>
      </Box>
      </Layout>
    </React.Fragment >
  )
}

const StyledButton = ({ text }) => {
  return (
    <Button variant="contained" size="small" color="primary">
      {text}
    </Button>
  )
}

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: theme.spacing(.5, 1)
  },
  head: {
    background: theme.palette.primary.main,
    color: "white",
  },
  body: {
    fontSize: 14,
  }
}))(TableCell)

const ShoppingListTable = ({ items, deleteItem }) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper} className={classes.table} >
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell>Price/Unit</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell align="right">Cost</StyledTableCell>
            <StyledTableCell>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            items.map((item, i) => (
              <TableRow key={item.id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell>Tk {item.rate}/{item.unit}</StyledTableCell>
                <StyledTableCell>{item.amount} {item.unit}</StyledTableCell>
                <StyledTableCell align="right">Tk {item.cost}</StyledTableCell>
                <StyledTableCell width={10}>
                  <CloseIcon
                    className={classes.deleteIcon}
                    onClick={() => deleteItem(item)} />
                </StyledTableCell>
              </TableRow>
            ))
          }
          {
            items.length != 0 ?
              (
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    Total
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="right">
                    Tk {items
                      .reduce((accumulator, item) => accumulator + parseFloat(item.cost), 0)
                      .toFixed(2)
                    }
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>
                    <Typography variant="body2"
                      color="textSecondary">
                      Nothing has been added yet..
                    </Typography>
                  </TableCell>
                </TableRow>
              )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const ExtraExpenseTable = ({ extras, deleteExtras }) => {

  const classes = useStyles()
  return (
    <TableContainer component={Paper} className={classes.table} >
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Cost</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            extras.map((item, i) => (
              <TableRow key={i}>
                <StyledTableCell>{item.title}</StyledTableCell>
                <StyledTableCell align="right">Tk {item.cost}</StyledTableCell>
                <StyledTableCell width={10}>
                  <CloseIcon
                    className={classes.deleteIcon}
                    onClick={() => deleteExtras(item)} />
                </StyledTableCell>
              </TableRow>
            ))
          }
          <TableRow>
            <StyledTableCell>
              Total
            </StyledTableCell>
            <StyledTableCell align="right">
              Tk {extras
                .reduce((accumulator, item) => accumulator + parseFloat(item.cost), 0)
                .toFixed(2)
              }
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}