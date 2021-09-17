import React, { useReducer, createContext } from 'react'
import { bordersReducer, initState } from '../reducers/borderReducer'

export const BorderContext = createContext(null)

function BorderContextProvider ({ children }){
  const [bordersState, dispatch] = useReducer(bordersReducer, initState)

  const values = { bordersState, dispatch }
  return (
    <BorderContext.Provider value={values}>
      {children}
    </BorderContext.Provider>
  )
}

export default BorderContextProvider