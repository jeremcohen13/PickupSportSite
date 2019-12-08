import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import {
  postData,
  geteventApiUrl,
  getparticipantsApiUrl,
  getusernamesApiUrl,
  joineventApiUrl,
  leaveeventApiUrl
} from "./requestUtils.js";

class SportEvent extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      userId: props.userId,
      sportEventId: props.match.params.sportEventId,
      sportEvent: undefined,
      participations: undefined,
      participantsById: undefined
    };

    this.state = { ...this.defaultState };
  }

  asyncLoadUserNames = async participantIds => {
    const usernamesByIdResponse = await postData({
      url: getusernamesApiUrl,
      data: { userIds: participantIds }
    });
    this.setState({ participantsById: usernamesByIdResponse.usernamesById });
  };

  asyncLoadSportEventAndParticipations = async sportEventId => {
    const [sportEventResponse, participationsResponse] = await Promise.all([
      postData({ url: geteventApiUrl, data: { sportEventId } }),
      postData({ url: getparticipantsApiUrl, data: { sportEventId } })
    ]);

    if (sportEventResponse.success && participationsResponse.participations) {
      this.setState({
        sportEvent: sportEventResponse.sportEvent,
        participations: participationsResponse.participations
      });
      this.asyncLoadUserNames(
        _.map(participationsResponse.participations, p => p.userId)
      );
    } else if (!sportEventResponse.sucess) {
      alert(sportEventResponse.message);
    }
  };

  joinHandler = async () => {
    const data = {
      eventId: this.state.sportEventId,
      userId: this.state.userId
    };
    const joinResponse = await postData({ url: joineventApiUrl, data });
    if (joinResponse.success) {
      this.setState({ ...this.defaultState });
    } else {
      alert(joinResponse.message);
    }
  };

  leaveHandler = async () => {
    const data = {
      eventId: this.state.sportEventId,
      userId: this.state.userId
    };
    const leaveResponse = await postData({ url: leaveeventApiUrl, data });
    if (leaveResponse.success) {
      this.setState({ ...this.defaultState });
    } else {
      alert(leaveResponse.message);
    }
  };

  render = () => {
    const { sportEvent, sportEventId, participations } = this.state;

    if (sportEvent && participations) {
      return (
        <Fragment>
          <div className="card-special container">
            <h4>event name: {sportEvent.name}</h4>
            <h4>event creator: {sportEvent.username}</h4>
            <h4>{sportEvent.sport}</h4>
            <h4>{sportEvent.location}</h4>
            <h4>{sportEvent.date}</h4>
            <h4>{sportEvent.numPlayers} players</h4>
            <h4>{sportEvent._id}</h4>
          </div>
          <div className="card-special">
            <h2 style={{ display: "inline" }}>Join this game?</h2>
            {_.keyBy(this.state.participations, "userId")[this.state.userId] ? (
              <input
                type="button"
                value="LEAVE"
                id="leavebutton"
                onClick={this.leaveHandler}
              />
            ) : (
              <input
                type="button"
                value="JOIN"
                id="joinbutton"
                onClick={this.joinHandler}
              />
            )}
          </div>
          <div className="card-special">
            <p>Players:</p>
            {participations.map(({ userId }, i) => (
              <div key={i} className="card-players">
                {this.state.participantsById ? (
                  <h4>{this.state.participantsById[userId]}</h4>
                ) : (
                  <p>Loading user info</p>
                )}
                <h6>{`userId: ${userId}`}</h6>
              </div>
            ))}
          </div>
        </Fragment>
      );
    } else {
      this.asyncLoadSportEventAndParticipations(sportEventId);

      return (
        <div>
          <p>loading event information</p>
        </div>
      );
    }
  };
}

const mapStateToProps = state => _.pick(state, ["userId"]);
SportEvent = connect(mapStateToProps)(SportEvent);
SportEvent = withRouter(SportEvent);
export default SportEvent;
