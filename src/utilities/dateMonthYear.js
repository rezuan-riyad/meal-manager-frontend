export const months = [
  { label: 'January' },
  { label: 'February' },
  { label: 'March' },
  { label: 'April' },
  { label: 'May' },
  { label: 'June' },
  { label: 'July' },
  { label: 'August' },
  { label: 'September' },
  { label: 'October' },
  { label: 'November' },
  { label: 'December' }
]

/**
 * find days in given month
 * @param {*number} year 
 * @param {*number} month 
 * @returns {number}
 */
export function daysPerMonth(year, month) {
  let isLeapYear = (year % 4 === 0 && (!(year % 100 === 0) || year % 400 === 0));
  const array = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (isLeapYear) {
    array[1] = 29
  }
  return array[month]
}

/**
 * dateName function return name of a date e,g. "SAT"
 * @param {int} dd 
 * @param {int} mm 
 * @param {int} yyyy
 * @returns {string} 
 */
export function dateName(dd, mm, yy) {
  const centuryCode = 6; // for 21st century 
  const monthsCode = [0, 0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]
  const daysInWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  let _yy = parseInt(yy.toString().slice(-2))
  const val = dd + monthsCode[mm] + _yy + Math.trunc(_yy / 4) + centuryCode
  const dateCode = val % 7
  return daysInWeek[dateCode]
}

export function getWeekOptions(year, monthNo) {
  const options = [];
  const daysInMonth = daysPerMonth(year, monthNo)
  const weeks = Math.ceil(daysInMonth / 7);
  let weekNo = 1;
  while (weekNo < weeks + 1) {
    let option = generateWeekOption(daysInMonth, weekNo, monthNo)
    options.push(option)
    weekNo++
  }
  return options
}

// Generating Options for week selection depending on month and weekNo
function generateWeekOption(daysInMonth, weekNo, month) {
  var startingDate, endingDate;
  const monthName = months[month].label.toUpperCase().slice(0, 3)
  // week no starts from 1 and continues as 2,3,4
  startingDate = (weekNo * 7) - 6

  if (weekNo <= 4) endingDate = startingDate + 6
  else endingDate = startingDate + (daysInMonth - startingDate)

  if (startingDate < 10) {
    startingDate = "0" + startingDate.toString()
  }
  if (endingDate < 10) {
    endingDate = "0" + endingDate.toString()
  }
  return `${startingDate} ${monthName} - ${endingDate} ${monthName}`
}

export function getDatesInWeek(weekIndex, monthIndex, year) {
  const daysInMonth = daysPerMonth(year, monthIndex)
  const arr = []
  // weekIndex starts from 0
  const startingDate = getStartingDay(weekIndex) // for week 2, startingDate = 8
  const endingDate = getEndingDate(startingDate, daysInMonth, weekIndex)

  for (let i = startingDate; i < endingDate + 1; i++) {
    const d = generateFormattedDate(i, monthIndex, year)
    arr.push(d)
  }
  return arr
}

export function formateDate(date, month, year) {
  const mon = months[month].label.slice(0,3).toUpperCase()
  const d = date.toString()
  const y = year.toString()
  return `${d}/${mon}/${y}`
}

function generateFormattedDate(date, monthIndex, year) {
  let d;
  const monthName = months[monthIndex].label.toUpperCase().slice(0, 3)
  if (date < 10) d = "0" + date.toString()
  else d = date.toString()
  d = `${d}/${monthName}/${year.toString()}`
  return d;
}

function getStartingDay(weekIndex) {
  let d; //date
  if (weekIndex == null) {
    d = new Date().getDate()
  } else {
    d = ((weekIndex + 1) * 7) - 6
  }
  return d;
}

function getEndingDate(startingDate, daysInMonth, weekIndex) {
  let d;
  if (weekIndex <= 3) {
    d = startingDate + 6
  } else{
    d = daysInMonth
  }
  return d;
}