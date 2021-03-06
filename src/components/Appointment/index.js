import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVE = "SAVE";
    const DELETE = "DELETE";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";
    const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVE);
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
    };

    function remove() {
      if (mode === CONFIRM) {
        transition(DELETE, true);
        props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true))
      } else {
        transition(CONFIRM);
      }
    };

    function edit() {
      transition(EDIT);
    };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={remove}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVE && <Status message="SAVING" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={remove}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={"Could not delete appointment"} />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message={"Could not create appointment"} />
      )}
    </article>
  );
}
