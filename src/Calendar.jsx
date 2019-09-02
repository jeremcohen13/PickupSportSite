import React, { Component } from "react";

class Calendar extends Component {
  render = () => {
    return (
      <div>
        <iframe
          className="calendar"
          src="https://calendar.google.com/calendar/embed?src=da73br67los58hkg42vg8u0h6o%40group.calendar.google.com&ctz=America%2FToronto"
        ></iframe>
      </div>
    );
  };
}
export default Calendar;
