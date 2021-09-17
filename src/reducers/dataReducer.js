export const initState = {
  data: [],
  mealData: []
}

export function dataReducer(state = initState, action) {
  switch (action.type) {
    case "DATA/POPULATION":
      return {
        ...state,
        data: [...action.payload.data],
        mealData: [...action.payload.mealData]
      }
    case "CALCULATE/TOTAL": {
      return {
        ...state
      }
    }
    case "LUNCH/CHANGE":
      return {
        ...state,
        data: state.data.map(elem => {
          if (elem.id === action.payload.userId) {
            elem.records.map(record => {
              //console.log(record)
              if (record.date === action.payload.date) {
                record.lunch += action.payload.change
              }
              return record
            })
          }
          return elem
        })
      }
    case "DINNER/CHANGE":
      return {
        ...state,
        data: state.data.map(elem => {
          if (elem.id === action.payload.userId) {
            elem.records.map(record => {
              //console.log(record)
              if (record.date === action.payload.date) {
                record.dinner += action.payload.change
              }
              return record
            })
          }
          return elem
        })
      }
    case "FITER/BY/DATE":
      return;
    default:
      return state
  }
}