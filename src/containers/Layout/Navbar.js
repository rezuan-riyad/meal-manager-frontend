import React, { useState, useRef } from 'react'
import clsx from 'clsx';
import {
  Toolbar, Typography, Box, Container, Drawer,
  List, ListItem, ListItemText, Divider
} from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles, makeStyles } from '@material-ui/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useEffect } from 'react'

import image from '../../background.jpg'
import { Link } from 'react-router-dom';

const StyledToolBar = withStyles((theme) => {
  return {
    root: {
      background: theme.palette.primary.main,
      color: "white"
    }
  }
})(Toolbar)

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  drawerItem: {
    width: "250px",
    height: "100%",

  },
  imageDiv: {
    height: 100,
    width: "inherit"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
}))

export default function Navbar() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const drawerRef = useRef(null)
  const btnRef = useRef(null)

  const handleOpen = (e) => {
    setOpen(true)
  }
  const handleClose = (e) => {
    setOpen(false)
  }
  const clickHandler = (e) => {
    if (drawerRef.current == null) {
      return;
    }
    if (
      !drawerRef.current.contains(e.target) &&
      !btnRef.current.contains(e.target) &&
      open) {
      setOpen(false)
    }
  }
  useEffect(() => {
    window.addEventListener('click', clickHandler)
    return () => {
      window.removeEventListener('click', clickHandler)
    }
  })
  return (
    <>
      <StyledToolBar>
        <Container className={classes.container}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            ref={btnRef}
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">
            Monthly Cost Management
          </Typography>
        </Container>
      </StyledToolBar>
      <Drawer
        anchor="left"
        open={open}
      >
        <div ref={drawerRef} className={classes.drawerItem}>
          <div className={classes.imageDiv}>
            <img src={image} className={classes.img} />
          </div>
          <List>
            <ListItem>
              <strong>Manager Section</strong>
            </ListItem>
            {[{ field: 'Configure Courses', link: "/configure-courses" },
            { field: 'Configure Borders', link: "/configure-borders" },
            { field: 'Add Shopping Data', link: "/add-shopping-data"},
            { field: 'Change Managership', link: "/change-managership"},
            { field: 'Set For Tomorrow', link: "/set-for-tomorrow"}].map((item, i) => (
              <ListItem key={i} onClick={handleClose}>
                <Link to={item.link}>
                  <Typography variant="body2">{item.field}</Typography>
                </Link>
              </ListItem>))}
            <Divider />
            <ListItem>
              <strong>Border Section</strong>
            </ListItem>

            {[{ field: 'All Records', link: "/dashbord" },
            { field: 'My Record', link: "/" },
            { field: 'Shopping History', link: "/" },
            { field: 'About', link: "/" }].map((item, i) => (
              <ListItem key={i} onClick={handleClose}>
                <Link to={item.link}>
                  <Typography variant="body2">{item.field}</Typography>
                </Link>
              </ListItem>))}
            <Divider />
            <ListItem>
              <ExitToAppIcon />
              <Link to="#">
                <Typography variant="body2">Logout</Typography>
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  )
}