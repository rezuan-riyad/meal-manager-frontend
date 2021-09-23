import React, { } from "react";

import ShoppingCostChart from "./ShoppingCostChart";
import DoughnutChart from "./Doughnut";
import MoneyRecordTable from "./MoneyRecordTable";

import Layout from '../Layout/index'
import { Typography, Box, Container, Paper, Divider, Button } from "@material-ui/core";
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import CustomButton from '../../components/CustomButton'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  headSection: {
    backgroundImage: `linear-gradient(${theme.palette.primary.light}, #eeeeee)`,
    padding: theme.spacing(5, 0),
    textAlign: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      flexDirection: "row"
    }
  },
  iconText: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  paper: {
    minWidth: "40%"
  },
  icon: { color: "gray" },
  divider: {
    margin: "16px 0",
  },
  lineChart: {
    width: "100%",
    [theme.breakpoints.up('md')]: {
      width: "50%"
    }
  },
  doughnut: {
    borderRadius: "8px",
    width: "100%",
    [theme.breakpoints.up('md')]: {
      width: "50%"
    }
  },
  money: {
    width: "250px",
    margin: "3rem auto"
  }
}))


export default function Home() {
  const classes = useStyles()
  return (
    <Layout>
      <Box className={classes.headSection}>
        <Typography variant="h4" gutterBottom>
          Welcome to Dashbord
        </Typography>
        <Typography variant="body1">
          Analyse all of your institution's monthly records.
        </Typography>
      </Box>
      <Container>
        <Box className={classes.content}>
          <TopLeftSection />
          <Box className={classes.lineChart}>
            <ShoppingCostChart />
          </Box>
        </Box>
        <Box className={classes.content}>
          <Paper elevation={20} className={classes.doughnut}>
            <DoughnutChart />
          </Paper>
          <div className={classes.money}>
            <Typography variant="h6">
              Month's Summary
            </Typography>
            <Divider />
            {
              [
                { category: "Money Collected", amount: 12000 },
                { category: "Total Expenses", amount: 7000 },
                { category: "Net Balance", amount: 5000 }
              ].map((elem, i) => (
                <Typography variant="h6"
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{elem.category} :</span>
                  <span>{elem.amount}</span>
                </Typography>
              ))
            }
            <Button fullWidth variant="contained" size="small" color="primary"
              style={{ margin: "16px 0" }}>
              See All Records
            </Button>
          </div>
        </Box>
        <Box mt={7}>
          <Typography variant="h5" gutterBottom>
            Money records of this month
          </Typography>
          <MoneyRecordTable />
        </Box>
      </Container>
    </Layout>
  )
}

const TopLeftSection = () => {
  const classes = useStyles()
  return (
    <Box className={classes.paper}>
      <Box p={3}>
        <Typography variant="body1">
          <u>Manager of Current Month</u>
        </Typography>
        <Typography variant="h6">
          John Doe
        </Typography>
        <Typography variant="body2" gutterBottom>
          Room No, Building No.
        </Typography>
        <Typography variant="body2"
          className={classes.iconText}>
          <EmailIcon fontSize="small" className={classes.icon} />
          <span style={{ marginLeft: "8px", padding: "4px" }}>johndoe@gmail.com</span>
        </Typography>
        <Typography variant="body2"
          className={classes.iconText}>
          <PhoneIphoneIcon fontSize="small" className={classes.icon} />
          <span style={{ marginLeft: "8px" }}>01700-000000</span>
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body2" gutterBottom>
          Total Borders : 25
        </Typography>
        <Typography variant="body2" gutterBottom>
          Active Borders : 21
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Meal rates are calculated for active border only.
        </Typography>
        <Box>
          <CustomButton style={{ marginRight: ".5rem" }}>Write To Manager</CustomButton>
          <CustomButton>How's present managership? </CustomButton>
        </Box>
      </Box>
    </Box>
  )
}