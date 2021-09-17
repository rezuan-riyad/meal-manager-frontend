import React, { useState } from 'react'

export default function useDebounce(func, delay) {
  const [timer, setTimer] = useState(null)
  return (...args) => {
    clearTimeout(timer)
    let _temp = setTimeout(() => {
      func(...args)
    }, delay)
    setTimer(_temp)
  }
}

// export default function useDebounce(value, delay = 1000) {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(timer)
//     }
//   }, [value, delay])

//   return debouncedValue
// }