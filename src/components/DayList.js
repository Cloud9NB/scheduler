import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listNameDay = props.days.map((x) =>
    <DayListItem
       key={x.id}
       name={x.name}
       spots={x.spots}
       selected={x.name === props.value}
       setDay={props.onChange}
    />
  );

    return (
      <ul>
        {listNameDay}
      </ul>
    );
};