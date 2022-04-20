import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listNameDay = props.days.map((x) =>
    <DayListItem
       key={x.id}
       name={x.name}
       spots={x.spots}
       selected={x.name === props.day}
       setDay={props.setDay}
    />
  );

    return (
      <ul>
        {listNameDay}
      </ul>
    );
};