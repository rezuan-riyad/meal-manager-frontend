import { withStyles } from "@material-ui/core/styles";
import { TableCell, TableRow, Container } from "@material-ui/core";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const StyledContainer = withStyles((theme) => ({
  root: {
    [theme.breakpoints.only('xs')]:{
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    }
  }
}))(Container);