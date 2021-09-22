import { nanoid } from "nanoid";
export const initState = {
  allCourses: [
    {
      id: 1,
      name: "Lunch",
      cost: 50,
      serveTime: "",
      default: true
    },
    {
      id: 2,
      name: "Lunch",
      cost: 50,
      serveTime: "",
      default: true
    },
    {
      id: 3,
      name: "Breakfast",
      cost: 40,
      serveTime: "",
      default: false
    }
  ],
  selected: [
    {
      courseId: 1,
      name: "Lunch",
      description: "Special meal cooked with rice, dal",
      cost: 40,
      date: new Date(),
      serveTime: "Morning"
    },
    {
      courseId: 2,
      name: "Dinner",
      description: "No description",
      cost: 40,
      date: new Date(),
      serveTime: "Night"
    }
  ],
  records: [
    {
      borderId: 1,
      borderName: "Riyad",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: true, guestMeal: 0 },
        { courseId: 2, courseName: "Dinner", mealStatus: true, guestMeal: 0 },
      ]
    },
    {
      borderId: 2,
      borderName: "Ahmed",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: false, guestMeal: 1 },
        { courseId: 2, courseName: "Dinner", mealStatus: false, guestMeal: 0 },
      ]
    },
    {
      borderId: 3,
      borderName: "Rezuan",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: true, guestMeal: 0 },
        { courseId: 2, courseName: "Dinner", mealStatus: true, guestMeal: 0 },
      ]
    },
    {
      borderId: 4,
      borderName: "Yasin",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: true, guestMeal: 0 },
        { courseId: 2, courseName: "Dinner", mealStatus: true, guestMeal: 0 },
      ]
    },
    {
      borderId: 5,
      borderName: "Riyad",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: true, guestMeal: 0 },
        { courseId: 2, courseName: "Dinner", mealStatus: true, guestMeal: 0 },
      ]
    },
    {
      borderId: 6,
      borderName: "Ahmed",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: false, guestMeal: 1 },
        { courseId: 2, courseName: "Dinner", mealStatus: false, guestMeal: 0 },
      ]
    },
    {
      borderId: 7,
      borderName: "Rezuan",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: true, guestMeal: 0 },
        { courseId: 2, courseName: "Dinner", mealStatus: true, guestMeal: 0 },
      ]
    },
    {
      borderId: 8,
      borderName: "Yasin",
      courseDetails: [
        { courseId: 1, courseName: "Lunch", mealStatus: true, guestMeal: 0 },
        { courseId: 2, courseName: "Dinner", mealStatus: true, guestMeal: 0 },
      ]
    }
  ],
  selectedDate: ""
}

export function coursesReducer(state = initState, action) {
  switch (action.type) {
    case "CHANGE/SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload.date
      }
    case "ADD/SELECTED/COURSES":
      return {
        ...state,
        selected: [
          ...state.selected, {
            name: action.payload.name,
            description: action.payload.description,
            cost: action.payload.cost,
            serveTime: action.payload.serveTime
          }
        ]
      }
    case "UPDATE/SELECTED/COURSES":
      return {
        ...state,
        selected: state.selected.map(item => {
          if (item.courseId === action.payload.courseId) {
            item = {
              ...item,
              name: action.payload.name,
              description: action.payload.description,
              cost: action.payload.cost,
              serveTime: action.payload.serveTime
            }
          }
          return item
        })
      }
    case "DELETE/SELECTED/COURSE":
      return {
        ...state,
        selected: state.selected
          .filter(item => item.courseId !== action.payload.courseId)
      }
    case "UPDATE/COURSE/FROM/RECORDS":
      return {
        ...state,
        records: state.records.map(record => {
          record.courseDetails = record.courseDetails.map(item => {
            if (item.courseId === action.payload.courseId) {
              item = {
                ...item, courseName: action.payload.name
              }
            }
            return item
          })
          return record
        })
      }
    case "ADD/COURSE/TO/RECORDS":
      return {
        ...state,
        records: state.records.map(record => {
          // if all status are false(meal-off), new one is also false
          let allStatus;
          if (record.courseDetails.length === 0) allStatus = 1;
          else allStatus = record.courseDetails
            .reduce((acc, item) => acc + item.mealStatus, 0);

          record = {
            ...record,
            courseDetails: [
              ...record.courseDetails,
              {
                courseName: action.payload.name,
                mealStatus: Boolean(allStatus),
                guestMeal: 0
              }
            ]
          }
          return record
        })
      }
    case "DELETE/COURSE/FROM/RECORDS":
      return {
        ...state,
        records: state.records.map(record => {
          record = {
            ...record,
            courseDetails: record.courseDetails
              .filter(item => item.courseId != action.payload.courseId)
          }
          return record
        })
      }
    case "UPDATE/RECORDS": {
      return {
        ...state,
        records: state.records.map(record => {
          if (record.borderId === action.payload.borderId) {
            record = {
              ...record,
              courseDetails: record.courseDetails.map(course => {
                if (course.courseId === action.payload.courseId) {
                  if (action.payload.action === 'update-guest-meal')
                    course = {
                      ...course,
                      guestMeal: course.guestMeal + action.payload.change
                    }
                  else if (action.payload.action === 'update-meal-status')
                    course = {
                      ...course,
                      mealStatus: !course.mealStatus
                    }
                };
                return course;
              })
            };
          }
          return record;
        })
      }
    }
    case "UPDATE/ALL_MEALS": {
      return {
        ...state,
        records: state.records.map(record => {
          record = {
            ...record,
            courseDetails: record.courseDetails.map(course => {
              if(course.courseId === action.payload.courseId){
                course = {
                  ...course,
                  mealStatus: true
                }
              }
              return course
            })
          }
          return record
        })
      }
    }
    default:
      break;
  }
}