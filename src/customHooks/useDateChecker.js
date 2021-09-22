import React, { useEffect, useState } from 'react'

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default function useDateChecker(date) {
  const [isDate, setIsDate] = useState(null)
  const [err, setErr] = useState("")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [value, setValue] = useState("")
  useEffect(() => {
    if (date) {
      try {
        let arr = date.split("/")
        let dd = parseInt(arr[1])
        let mm = parseInt(arr[0]) - 1
        let yy = parseInt(arr[2])

        if (yy < 2000 || yy > 2099) {
          setIsDate(false)
          setErr("Year should be between 2000 and 2099")
          return;
        }
        let _date = new Date(yy, mm, dd)
        if (_date.getDate() == dd && _date.getMonth() == mm && _date.getFullYear() == yy) {
          setIsDate(true)
          setErr("")
          setDay(days[_date.getDay()])
          setMonth(months[_date.getMonth()])
          setValue(_date.getDate())
        }
        else {
          setIsDate(false)
          setErr("Invalid Date Format")
          setDay("")
          setMonth("")
          setValue("")
        }
      } catch (error) {
        setIsDate(false)
        setDay("")
        setMonth("")
      }
    }
  }, [date])

  return {
    valid: isDate,
    error: err,
    day, month, value
  }
}