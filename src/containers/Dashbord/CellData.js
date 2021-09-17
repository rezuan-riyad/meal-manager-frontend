import React, { useContext, useRef, useState } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { GlobalContext } from '../../contexts/GlobalContext';

const useStyles = makeStyles((theme) => ({
  cell: {
    width: "inherit",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cellChild: {
    width: "50%",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  icon: {
    fontSize: 14,
  }
}))


export default function CellData({ record, userId }) {
  const classes = useStyles()
  return (
    <>
      <div className={classes.cell}>
        <Field
          amount={record.lunch}
          courseName="lunch"
          userId={userId}
          btnDisabled={record.disabled}
          date={record.date} />
        <Field
          amount={record.dinner}
          courseName="dinner"
          userId={userId}
          btnDisabled={record.disabled}
          date={record.date} />
      </div>
    </>
  )
}

const Field = ({btnDisabled, amount, userId, courseName, date }) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const { dataRecord, dispatch } = useContext(GlobalContext)

  const handleDecrease = async () => {
    let actionType;
    courseName === "lunch" ? actionType = "LUNCH/CHANGE" : actionType = "DINNER/CHANGE"
    if (amount > 0) {
      await dispatch({
        type: actionType,
        payload: {
          userId, courseName, date,
          change: -1
        }
      })
    }
  }
  const handleIncrease = async () => {
    let actionType
    courseName === "lunch" ? actionType = "LUNCH/CHANGE" : actionType = "DINNER/CHANGE"
    if (amount < 9 ) {
      await dispatch({
        type: actionType,
        payload: {
          userId, courseName, date,
          change: 1
        }
      })
    }
  }

  return (
    <div className={classes.cellChild}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {
        show && !btnDisabled ?
          <IconButton size="small" onClick={handleDecrease}>
            <RemoveIcon className={classes.icon}/>
          </IconButton> : null
      }
      <Typography variant="body2">{amount}</Typography>
      {
        show && !btnDisabled ?
          <IconButton size="small" onClick={handleIncrease}>
            <AddIcon className={classes.icon}/>
          </IconButton> : null
      }
    </div >
  )
}