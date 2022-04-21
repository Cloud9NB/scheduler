import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList (props) {
  
  const listOfInterviewers = props.interviewers.map((x) =>
    <InterviewerListItem
      key={x.id}
      name={x.name}
      avatar={x.avatar}
      selected={props.interviewer === x.id}
      setInterviewer={() => props.setInterviewer(x.id)}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listOfInterviewers}
      </ul>
    </section>
  )
};