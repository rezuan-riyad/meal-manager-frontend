import React, { useReducer, createContext } from 'react'
import { coursesReducer, initState } from '../_reducers/courses.reducer'

export const CourseContext = createContext(null)

function CourseContextProvider ({ children }){
  const [coursesState, dispatch] = useReducer(coursesReducer, initState)

  const values = { coursesState, dispatch }
  return (
    <CourseContext.Provider value={values}>
      {children}
    </CourseContext.Provider>
  )
}

export default CourseContextProvider