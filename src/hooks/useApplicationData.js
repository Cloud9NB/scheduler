import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  // const findDay = (day) => {
  //   const daysOfWeek = {
  //     Monday: 0,
  //     Tuesday: 1,
  //     Wednesday: 2,
  //     Thursday: 3,
  //     Friday: 4
  //   };
  //   return daysOfWeek[day]
  // };

  const updateSpots = (days, appointments) => {
    const daysArray = days.map((day) => {
      let counter = 0;
      const appointmentsArray = day.appointments;
      for (const number of appointmentsArray) {
        if (!appointments[number].interview) {
          counter++;
        }
      }
      return { ...day, spots: counter };
    });
    return daysArray;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.days, appointments);
    // const dayOfWeek = findDay(state.day);

    // let day = {
    //   ...state.days[dayOfWeek],
    //   spots: state.days[dayOfWeek]
    // };

    // if (!state.appointments[id].interview) {
    //   day = {
    //     ...state.days[dayOfWeek],
    //     spots: state.days[dayOfWeek].spots - 1
    //   };
    // } else {
    //   day = {
    //     ...state.days[dayOfWeek],
    //     spots: state.days[dayOfWeek].spots
    //   };
    // }

    // let days = state.days;
    // days[dayOfWeek] = day;

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments, days });
        return res;
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.days, appointments);
    // const dayOfWeek = findDay(state.day);

    // const day = {
    //   ...state.days[dayOfWeek],
    //   spots: state.days[dayOfWeek].spots + 1
    // };

    // let days = state.days;
    // days[dayOfWeek] = day;

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({ ...state, appointments, days });
        return res;
      });
  };

  useEffect(() => {
    const apiDays = "http://localhost:8001/api/days";
    const apiAppointment = "http://localhost:8001/api/appointments";
    const apiInterview = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(apiDays),
      axios.get(apiAppointment),
      axios.get(apiInterview),
      // ,axios.get('/api/debug/reset')
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
