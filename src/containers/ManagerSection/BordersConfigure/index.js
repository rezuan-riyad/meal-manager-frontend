import React, { useContext, useRef, useState } from 'react'
import BorderContextProvider from '../../../_contexts/BorderContext'

import { Box, Container, List, ListItem } from '@material-ui/core'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../../Layout'
import AddBorder from './AddBorder'
import UpdateBorder from './UpdateBorder';
import DisplayBorder from './DisplayBorder';
import AddAccountBalance from './AddAccountBalance';
import SearchWrapper from './SearchWrapper';

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundImage: `linear-gradient(${theme.palette.primary.light}, #eeeeee)`,
    padding: theme.spacing(3, 0)
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
    <div role="tabpanel"
      hidden={value !== index}>
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

export default function BordersConfigure() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const handleChange = (event) => {
    setValue(event.target.value)
  };
  return (
    <Layout>
      <BorderContextProvider>
        <List className={classes.list}>
          {['Add New Border', 'Update Border',
            'Account Balance', 'All Borders'].map((item, i) => (
              <ListItem
                key={i}
                value={i}
                className={`${i === value ? classes.selected : null} ${classes.listItem} }`}
                onClick={handleChange}>
                {item}
              </ListItem>
            ))}
        </List>
        <Container>
          <TabPanel value={value} index={0}>
            <AddBorder tablePanelChange={() => setValue(3)} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SearchWrapper render={(borders, setBorders, all_borders) => (
              <UpdateBorder
                borders={borders}
                setBorders={setBorders}
                all_borders={all_borders}
              />
            )} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SearchWrapper render={(borders, setBorders, all_borders) => (
              <AddAccountBalance
                borders={borders}
                setBorders={setBorders}
              />
            )} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DisplayBorder />
          </TabPanel>
        </Container>
      </BorderContextProvider>
    </Layout>
  )
}