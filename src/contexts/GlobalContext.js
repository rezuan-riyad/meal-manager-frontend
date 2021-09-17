import React, { createContext, useState, useReducer, useEffect } from 'react'
import { initState, dataReducer } from '../reducers/dataReducer'
import { getWeekOptions, getDatesInWeek, formateDate } from '../utilities/dateMonthYear'
import { generateData, generateMealData} from '../json/fakeDataQuery' 

export const GlobalContext = createContext(null)

export default function GlobalContextProvider({ children }) {
  const [state, setState] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    date: new Date().getDate(),
    week: 0,
    weekOptions: [],
    selectedDates: [],
    dateBasedDisplay: false
  })

  const [dataRecord, dispatch] = useReducer(dataReducer, initState)

  useEffect(() => {
    const year = new Date().getFullYear();
    const current_month = new Date().getMonth()
    const date = new Date().getDate()
    const weekOptions = getWeekOptions(year, current_month)
    const weekIndex = Math.round(new Date().getDate()/7)
    let selectedDates = [];
    let breakpoint = 960 // breakpoint for mobile screen
    if(window.innerWidth < breakpoint){
      selectedDates = [formateDate(date, current_month, year)]
    } else {
      selectedDates = getDatesInWeek(weekIndex, current_month, year)
    }
    setState({
      ...state,
      month: current_month,
      weekOptions: weekOptions,
      week: weekIndex,
      selectedDates: selectedDates
    })
  },[])

  useEffect(() => {
    // fake API call
    // data contains all list of objects, 
    // each object contain user name, id and records of meal orderd
    const data = generateData(state.selectedDates, state.month)
    
    // meal data contains all course with price
    const mealData = generateMealData(state.selectedDates)
    
    dispatch({
      type: "DATA/POPULATION",
      payload: { data, mealData }
    })
  },[state.selectedDates])
  
  const values = { state, setState, dataRecord, dispatch }

  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  )
}
