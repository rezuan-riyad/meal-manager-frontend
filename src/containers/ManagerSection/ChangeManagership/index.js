import React from 'react'
import Layout from '../../Layout/index'
import CustomAutocomplete from '../../../components/CustomAutocomplete'
import { Container, Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
  root: {
    margin: "0 auto",
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    }
  },
  background: {
    backgroundImage: `linear-gradient(${theme.palette.primary.light}, #eeeeee)`
  },
  textContainer: {
    maxWidth: 700,
    padding: theme.spacing(2)
  }
}))

export default function index() {
  const classes = styles()
  return (
    <Layout>
      <div className={classes.background}>
        <Container className={classes.textContainer}>
          <h3 style={{ marginTop: "0px" }}>Change Managership</h3>
          <Typography variant="body2" style={{ marginTop: "16px" }}>
            Invite a border who is competent and willing to hold the position of manager for
            next month. It's a great oppurtunity to steal or earn some money by being a manager.
            Who knows what you've done this month, though we are working hard to ensure transparency.
            It's a Joke &#128521;
          </Typography>
          <Typography variant="body2">
            Put someone in charge who seems more honest than you.
            Changing managership should be achieved by mutual understanding and along with
            based on all border's recommendations.
          </Typography>
        </Container>
      </div>
      <Container>
        <Box className={classes.root}>
          <h4>Manager For Next Month</h4>
          <CustomAutocomplete
            options={['Riyad', 'Rezuan', 'Ahmed', 'John Doe', 'Jane Doe']}
            label="Select a border"
          />
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="small">
              Invite
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout >
  )
}
