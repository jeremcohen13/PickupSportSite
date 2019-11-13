import React, { Component, Fragment } from "react";
import { withRouter, useLocation, useParams } from "react-router-dom";

import { postData, geteventApiUrl, getparticipantsApiUrl } from "./requestUtils.js"

class SportEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sportEventId:   props.match.params.sportEventId,
      sportEvent:     undefined,
      participations: undefined,
    }
  }

  asyncLoadSportEventAndParticipations = async sportEventId => {
    const [sportEventResponse, participationsResponse] = await Promise.all([
      postData({ url: geteventApiUrl,        data: { sportEventId } }),
      postData({ url: getparticipantsApiUrl, data: { sportEventId } })
    ]);

    if (sportEventResponse.success && participationsResponse.participations) {
      this.setState({
        sportEvent:     sportEventResponse.sportEvent,
        participations: participationsResponse.participations,
      });
    } else if (!sportEventResponse.sucess) {
      alert(sportEventResponse.message);
    }
  }

  joinHandler = () => {
    // TODO: try and join. if succeeds, refresh, else, alert
  }

  render = () => {
    const { sportEvent, sportEventId, participations } = this.state;

    if (sportEvent && participations) {
      return (
        <Fragment>
          <div className="card-special">
            <h4>event name: {sportEvent.name}</h4>
            <h4>event creator: {sportEvent.username}</h4>
            <h4>{sportEvent.sport}</h4>
            <h4>{sportEvent.location}</h4>
            <h4>{sportEvent.date}</h4>
            <h4>{sportEvent.numPlayers} players</h4>
            <h4>{sportEvent._id}</h4>
          </div>
          <div className="card-special">
            <h2 style={{display: "inline"}}>Join this game?</h2>
            <input type="button" value="JOIN" id="joinbutton" onClick={this.joinHandler}/>
          </div>
          <div className="card-special">
            <p>Players:</p>
            {participations.map(({userId, eventId}, i) => (
              <div key={i} className="card-players">
                <h4>{`userId: ${userId}`}</h4>
                {/* TODO: show all user info, not just userId */}
              </div>
            ))}
          </div>
        </Fragment>
      )
    } else {
      this.asyncLoadSportEventAndParticipations(sportEventId);
      
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
