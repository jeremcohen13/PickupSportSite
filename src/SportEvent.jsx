import React from "react";
import { withRouter, useLocation, useParams } from "react-router-dom";

import { postData, geteventApiUrl } from "./requestUtils.js"

let SportEvent = () => {
  const { id: sportEventId } = useParams();

  let { sportEvent } = useLocation();
  // TODO: don't use useLocation() or useParams(); cuz we need a stateful component and this isn't one
  //
  // let response = await (await postDate({ url: geteventApiUrl, sportEventId })).json();
  // if (response.sucess) {
  //   setState (re-render)
  // }

  return (
    <div>
      <h4>event name: {sportEvent.name}</h4>
      <h4>event creator: {sportEvent.username}</h4>
      <h4>{sportEvent.sport}</h4>
      <h4>{sportEvent.location}</h4>
      <h4>{sportEvent.date}</h4>
      <h4>{sportEvent.numPlayers} players</h4>
      <h4>{sportEvent._id}</h4>
    </div>
  )
}

SportEvent = withRouter(SportEvent);
export default SportEvent;
