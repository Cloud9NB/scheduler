export function getAppointmentsForDay(state, day) {
  
  const filteredDay = state.days.filter(days => days.name === day);
  
  if (filteredDay.length === 0) {
    return [];
  }
  
  const daysAppointments = filteredDay[0].appointments

  let newArr = [];

  daysAppointments.forEach((x) => {
    newArr.push(state.appointments[x]);
  });

  return newArr;
};