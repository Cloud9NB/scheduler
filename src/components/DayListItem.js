import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0});

    
    const formatSpots = (spots) => {
      if (spots === 0) {
        return <h3 className="text--light">no spots remaining</h3>;
      }
      if (spots === 1) {
        return <h3 className="text--light">{spots} spot remaining</h3>;
      }
      if (spots > 1) {
        return <h3 className="text--light">{spots} spots remaining</h3>;
      }
    };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">Day {props.name}</h2> 
      {formatSpots(props.spots)}
    </li>
  );
}