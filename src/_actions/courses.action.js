import { nanoid } from "nanoid"

/**
  * 1. return promise
  * 2. make api call to server
  * 3. if seccess dispatch action and then resolve promise
  * 4. if failed reject promise
  * 5. Error handling variables are set in local state
  */
export const update_course = (dispatch, payload) => {
  if (payload.action === 'update') {
    dispatch({
      type: "UPDATE/SELECTED/COURSES",
      payload: payload
    })
    dispatch({
      type: "UPDATE/COURSE/FROM/RECORDS",
      payload
    })
  }
  if (payload.action === 'add') {
    const courseId = nanoid(10)
    // add to selected courses
    dispatch({
      type: "ADD/SELECTED/COURSES",
      payload: { ...payload, courseId }
    })
    // add to records
    dispatch({
      type: "ADD/COURSE/TO/RECORDS",
      payload: { ...payload, courseId }
    })
  }
}

export const delete_course = (dispatch, payload) => {
  dispatch({
    type: "DELETE/SELECTED/COURSE",
    payload: payload
  })

  dispatch({
    type: "DELETE/COURSE/FROM/RECORDS",
    payload: payload
  })
}