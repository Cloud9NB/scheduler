import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  function remove() {
    if (mode === CONFIRM) {
      transition(DELETE);
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
    } else {
      transition(CONFIRM);
    }
  };

  function edit() {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={remove}
        onEdit={edit}
      />
      )}
      {mode === CREATE &&
      <Form
        name={props.name}
        value={props.value}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === SAVE && <Status message="SAVING"/>}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && 
        <Confirm 
          onCancel={back}
          onConfirm={remove}
          message="Are you sure you would like to delete?" 
        />}
        {mode === EDIT &&
        <Form
          // name={props.name ? props.name : props.interview.student}
          // value={props.value ? props.value: props.interview.interviewer.id}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />}
    </article>
  );
};