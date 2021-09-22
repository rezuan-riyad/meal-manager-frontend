import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

export const Title = withStyles(theme => ({
  root: {
    fontSize: 14,
    fontWeight: 500,
  }
}))(Typography)

export const ParaText = withStyles(theme => ({
  root: {
    fontSize: 12,
  }
}))(Typography)

export const HeadText = withStyles(theme => ({
  root: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  }
}))(Typography)

export const StyledTableCell = withStyles(theme => ({
  root: {
    padding: theme.spacing(.5, 1),
  },
  head: {
    background: theme.palette.primary.main,
    color: "white",
  },
  body: {
    fontSize: 14
    // "&:nth-of-type(odd)": {
    //   background: theme.palette.action.selected
    // }
  }
}))(TableCell)

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  },
}))(TableRow);