export function generateMealData(dates){
  const mealData = dates.map( date => {
    const data = {}
    data.date = date;
    data.course = [
      {
        courseName: "Lunch",
        courseRate: 40
      },
      {
        courseName: "Dinner",
        courseRate: 30
      }
    ];
    return data
  })
  return mealData
}

export function generateData(dates, month){
  const fakeNames = ['John Doe', 'Jane Doe', 'Donald Trump', 'Obaidul Kader', 'Dipu Moni', 'Rezuan Riyad']
  
  var newDate = new Date()
  var current_date = newDate.getDate()
  var current_month = newDate.getMonth()

  const data = fakeNames.map( (name, i) => {
    const _data = { };
    _data.name = name;
    _data.id = i;
    _data.records = dates.map(date => {
      const disabled = (parseInt(date.slice(0,1)) > current_date + 5) || month > current_month;
      const record = { };
      record.date = date;
      record.lunch = disabled ? 0 : parseInt(Math.ceil(Math.random() *10 -1));
      record.dinner = disabled ? 0 : parseInt(Math.ceil(Math.random() *10 -1));
      record.disabled = disabled
      return record;
    })
    return _data;
  })

  return data
}