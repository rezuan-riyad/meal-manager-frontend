import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  // date and month selection
  selectGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column"
    }
  },
  selectionBox: {
    width: "200px",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: "300px",
      marginLeft: 0,
      marginBottom: theme.spacing(1.5)
    }
  },
  itemsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column"
    }
  },

  // form section
  formDiv: {
    [theme.breakpoints.only('xs')]: {
      margin: "0 auto",
      maxWidth: "300px"
    }
  },
  formNav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "space-around",
  },
  formNavItem: {
    margin:theme.spacing(0, 1),
    cursor: "pointer"
  },
  addBtn: {
    marginBottom: theme.spacing(1.5)
  },
  item: {
    width: "200px",
    [theme.breakpoints.only('sm')]: {
      display: "inline-block",
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.only('xs')]: {
      display: "inline-block",
      width: "100%"
    }
  },
  table: {
    width: "auto",
    [theme.breakpoints.up('md')]: {
      minWidth: "600px"
    }
  },
  deleteIcon: {
    cursor: "pointer",
    fontSize: 14,
    marginTop: 4,
  },
  confirmBtn: {
    [theme.breakpoints.only('sm')]: {
      width: "200px"
    }
  }
}))