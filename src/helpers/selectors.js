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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
};