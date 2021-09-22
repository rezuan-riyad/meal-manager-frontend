import { Box, Container, List, ListItem } from '@material-ui/core'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'

import Layout from '../../Layout'
import AddNewCourse from './AddNewCourse';

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  listItem: {
    width: "auto",
    border: "1px solid transparent",
    margin: "0 8px",
    cursor: "pointer",
    "&:hover": {
      border: `1px solid lightgray`
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "14px",
      padding: theme.spacing(.5),
      margin: 0,
    }
  },
  selected: {
    border: `1px solid ${theme.palette.primary.main}`
  }
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CoursesConfigure() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const handleChange = (event) => {
    setValue(event.target.value)
  };
  return (
    <Layout>
      <Container>
        <List className={classes.list}>
          {['Add New Course'].map((item, i) => (
            <ListItem
              key={i}
              value={i}
              className={`${i === value ? classes.selected : null} ${classes.listItem} }`}
              onClick={handleChange}>
              {item}
            </ListItem>
          ))}
        </List>
        <TabPanel value={value} index={0}>
          <AddNewCourse />
        </TabPanel>
      </Container>
    </Layout>
  )
}