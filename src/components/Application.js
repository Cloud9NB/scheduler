import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview } )
    .then((res) => {
      setState({...state, appointments});
      return res;
    })
    // .catch(err => console.log('err: ', err));
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments});
      return res;
    })
    // .catch(err => console.log('err: ', err));
  }

  const schedule = appointments.map((appt) => {
    const interview = getInterview(state, appt.interview)  
    return (
      <Appointment
        key={appt.id}
        {...appt}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )}
  );


  useEffect(() => {
    const apiDays = 'http://localhost:8001/api/days';
    const apiAppointment = 'http://localhost:8001/api/appointments';
    const apiInterview = 'http://localhost:8001/api/interviewers';
    Promise.all([
      axios.get(apiDays),
      axios.get(apiAppointment),
      axios.get(apiInterview)
      // ,axios.get('/api/debug/reset'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
