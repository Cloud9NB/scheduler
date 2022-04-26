import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  const bookInterview = (id, interview) => {
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
  };

  const cancelInterview = (id) => {
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
  };

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
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};