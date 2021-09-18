export const addNewBorder = async (dispatch, border) => {
  dispatch({
    type: "IS/SAVING",
    payload: { message: "Border is being Saved..." }
  })
  try {
    const data = await fakeApiCall(border)
    if (data) {
      dispatch({ type: "ADD/BORDER", payload: border })
      dispatch({
        type: "SAVE/SUCCESS",
        payload: {
          successMessage: "New border saved successfully.."
        }
      })
    }
  } catch (error) {
    dispatch({
      type: "SAVE/FAILED",
      payload: {
        errorMessage: "New Border Save Failed."
      }
    })
  }
}

export const update_border = async (dispatch, border) => {
  dispatch({
    type: "IS/SAVING",
    payload: {
      message: "Border is being updated..."
    }
  })
  try {
    const data = await fakeApiCall()
    if (data) {
      dispatch({
        type: "UPDATE/BORDER",
        payload: border
      })
      dispatch({
        type: "SAVE/SUCCESS",
        payload: {
          successMessage: "Border updated successfully.."
        }
      })
    }
  } catch (error) {
    dispatch({
      type: "SAVE/FAILED",
      payload: {
        errorMessage: "Border update failed."
      }
    })
  }
}

export const add_account = async (dispatch, payload) => {
  dispatch({
    type: "IS/SAVING",
    payload: {
      message: "Account Balance is being added..."
    }
  })

  try {
    const data = await fake_add_account(payload)
    if (data) {
      dispatch({ type: "ADD/ACCOUNT", payload })
      dispatch({
        type: "SAVE/SUCCESS",
        payload: {
          successMessage: "Account balance successfully.."
        }
      })
    }
  } catch (error) {
    dispatch({
      type: "SAVE/FAILED",
      payload: {
        errorMessage: error
      }
    })
  }
}

const fakeApiCall = (border) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved")
    }, 1000)
  })
}

const fake_add_account = (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.account.monthFor === new Date().toString().slice(4, 7)) {
        resolve("Resolved")
      } else {
        reject("Invalid Month Selection")
      }
    }, 1000)
  })
}