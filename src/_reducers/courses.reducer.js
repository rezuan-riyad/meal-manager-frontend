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
      description: "",
      date: new Date().toLocaleDateString(),
      serveTime: new Date().toLocaleTimeString()
    }
  ]
}

export function coursesReducer(state = initState, action){
  switch (action.type){
    case "ADD": 
      break;
    default:
      break;
  }
}