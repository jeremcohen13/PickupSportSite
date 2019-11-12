import React, { Component } from "react";
import { withRouter, useLocation, useParams } from "react-router-dom";

import { postData, geteventApiUrl } from "./requestUtils.js"

class SportEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sportEventId: props.match.params.sportEventId,
      sportEvent:   undefined,
    }
  }

  asyncLoadSportEvent = async sportEventId => {
    const data = { sportEventId };
    const response = await (await postData({ url: geteventApiUrl, data })).json();
    if (response.success) {
      this.setState({ sportEvent: response.sportEvent });
    } else {
      alert(response.message);
    }
  }

  render = () => {
    const { sportEvent, sportEventId } = this.state;

    if (sportEvent) {
      return (
        <div className="card">
          <h4>event name: {sportEvent.name}</h4>
          <h4>event creator: {sportEvent.username}</h4>
          <h4>{sportEvent.sport}</h4>
          <h4>{sportEvent.location}</h4>
          <h4>{sportEvent.date}</h4>
          <h4>{sportEvent.numPlayers} players</h4>
          <h4>{sportEvent._id}</h4>
        </div>
      )
    } else {
      this.asyncLoadSportEvent(sportEventId);
      
      return (
        <div>
          <p>loading event information</p>
        </div>
      )
    }
  }
}

SportEvent = withRouter(SportEvent);
export default SportEvent;
