import React, { useRef, useEffect, Children } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  backdrop: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 100
  },
  container: {
    position: "absolute",
    background: "white",
    padding: theme.spacing(1),
    top: "50%",
    right: "50%",
    transform: "translate(50%, -50%)",
  }
}))

Backdrop.propTypes = {
  onClose: PropTypes.func.isRequired,
  childRef: PropTypes.object.isRequired,
  closeButtonRef: PropTypes.object
}

/**
 * @desc Transparent Backgrond with close functionality
 * @param {onClose} props - function to close backdrop
 * @param {childRef} props - reference obj to Backdrop's child
 * @param {closeButtonRef} props - ref to close button 
 * @returns Backdrop Element
 */

export default function Backdrop(props) {
  const backdropRef = useRef(null)
  const classes = useStyles()

  const handleClose = (e) => {
    let shouldClose =
      backdropRef.current.contains(e.target) &&
      !props.childRef.current.contains(e.target);
    if (props.closeButtonRef) {
      if (shouldClose ||
        props.closeButtonRef.current.contains(e.target))
        props.onClose();
    } else {
      if (shouldClose) props.onClose()
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClose)
    return () => {
      window.removeEventListener("click", handleClose)
    }
  })

  return (
    <div className={classes.backdrop} ref={backdropRef}>
      <div className={classes.container}>
        {props.children}
      </div>
    </div>
  )
}