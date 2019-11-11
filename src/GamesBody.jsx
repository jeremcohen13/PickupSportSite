import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { postData, geteventsApiUrl } from "./requestUtils.js";

import { initialData } from "./Data.js";

class GamesBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsLoaded: false,
      sportEvents: [],
      redirect: false,
    }
  }

  render = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/SportEvent/${this.state.redirect.sportEvent._id}`,
            sportEvent: this.state.redirect.sportEvent
          }}
        />
      )
    }

    (async () => {
      if (!this.state.eventsLoaded) {
        const sportEvents = await (await postData({ url: geteventsApiUrl })).json();
        this.setState({ sportEvents, eventsLoaded: !this.state.eventsLoaded });
      }
    })();

    return (
      <div className="frontpage">
        <div>
          <h1 alight="centre">All Sport Events</h1>
          {this.state.sportEvents.map((sportEvent, i) => (
            <div key={i} className="card" onClick={() => this.setState({ redirect: {sportEvent} })}>
              <div> <h1 style={{margin: "3px"}}>{sportEvent.name}</h1> </div>
              <div> <h2>created by {sportEvent.username}</h2> </div>
              <div> <h2>{sportEvent.location}</h2> </div>
              <div> <h3>{sportEvent.date}</h3> </div>
              <div> <h4>{sportEvent.sport}</h4> </div>
              <div> <h4>{sportEvent.numPlayers} players</h4> </div>
              <div> <h6>id: {sportEvent._id}</h6> </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
}
export default GamesBody;
