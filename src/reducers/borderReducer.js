export const initState = {
  borders: [{
    username: "Rezuan", passcode: "8768768", flat: "31, Sornali",
    id: "1", joined: "01/03/2021", status: true,
    accounts: [
      {
        date: "01/03/2021",
        amount: 500,
      },
      {
        date: "03/03/2021",
        amount: 700,
      },
      {
        date: "05/03/2021",
        amount: 1000,
      }
    ]
  }, {
    username: "Ahmed", passcode: "768678", flat: "Prottoy",
    id: "2", joined: "01/03/2021", status: true,
    accounts: [
      {
        date: "01/03/2021",
        amount: 500,
      },
      {
        date: "03/03/2021",
        amount: 700,
      },
      {
        date: "05/03/2021",
        amount: 1000,
      }
    ]
  }, {
    username: "Rezuan", passcode: "8768768", flat: "31, Sornali",
    id: "3", joined: "01/03/2021", status: true,
    accounts: [
      {
        date: "01/03/2021",
        amount: 500,
      },
      {
        date: "03/03/2021",
        amount: 700,
      },
      {
        date: "05/03/2021",
        amount: 1000,
      }
    ]
  }],
  border: {
    username: "", passcode: "", flat: "",
    account: "", id: "", joined: "", status: true
  },
  isSaving: false,
  isSaved: false,
  errorMessage: "",
  successMessage: "",
  message: ""
}

export function bordersReducer(state = initState, action) {
  switch (action.type) {
    case 'FIELD/CHANGE':
      return {
        ...state,
        border: {
          ...state.border,
          [action.fieldName]: action.payload
        }
      }
    case 'ADD/BORDER':
      return {
        ...state,
        borders: [...state.borders, action.payload]
      }
    case "IS/SAVING":
      return {
        ...state,
        errorMessage: "",
        successMessage: "",
        isSaving: true,
        message: action.payload.message
      }
    case "SAVE/SUCCESS":
      return {
        ...state,
        isSaving: false,
        isSaved: true,
        message: "",
        successMessage: action.payload.successMessage
      }
    case "SAVE/FAILED":
      return {
        ...state,
        isSaving: false,
        isSaved: false,
        message: "",
        errorMessage: action.payload.errorMessage
      }
    case "MESSAGE/RESET":
      return {
        ...state,
        isSaved: false,
        isSaving: false,
        message: "",
        errorMessage: "",
        successMessage: ""
      }
    case "BORDER/RESET":
      return {
        ...state,
        isSaving: false,
        isSaved: false,
        border: {
          username: "", passcode: "", flat: "",
          account: "", id: "", joined: "", status: true
        }
      }
    case "UPDATE/BORDER":
      return {
        ...state,
        borders: state.borders.map(elem => {
          if (elem.id === action.payload.id) {
            elem.username = action.payload.username
            elem.flat = action.payload.flat
            elem.status = action.payload.status
          }
          return elem
        })
      }
    case "ADD/ACCOUNT":
      console.log(action.payload)
      return {
        ...state,
        borders: state.borders.map(border => {
          if (border.id === action.payload.id) {
            border = {
              ...border,
              accounts: [...border.accounts, action.payload.account]
            }
          }
          return border
        })
      }
    default:
      break;
  }
}