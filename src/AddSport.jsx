import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedAddSport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      location: "",
      SportSelect: "",
      date: "",
      friends: "",
      NewEvent: []
    };
  }
  handleEvent = event => {
    console.log("New Event", event.target.value);
    this.setState({ eventName: event.target.value });
  };
  handleDescription = event => {
    console.log("description", event.target.value);
    this.setState({ description: event.target.value });
  };
  handleSportSelect = event => {
    console.log("Select Sport", event.target.value);
    this.setState({ sport: event.target.value });
  };
  handleLocation = event => {
    console.log("Select Location", event.target.value);
    this.setState({ location: event.target.value });
  };
  handleDate = event => {
    console.log("Select Date", event.target.value);
    this.setState({ date: event.target.value });
  };
  handleFriend = event => {
    console.log("Select friends", event.target.value);
    this.setState({ friends: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("event created");
    let data = new FormData();
    data.append("title", this.state.eventName);
    data.append("description", this.state.description);
    data.append("Sport Select", this.state.SportSelect);
    data.append("Select Location", this.state.location);
    data.append("Select Date", this.state.date);
    data.append("Select friends", this.state.friends);
    console.log(data);
    let fetcheddata = await fetch("/AddEvent", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let newEvent = await fetcheddata.text();
    console.log("New Event:", newEvent);
    newEvent = JSON.parse(newEvent);
    this.props.dispatch({
      type: "add-event",
      event: newEvent.newEvent
    });
    window.alert("Your event has been created");
    this.props.routerData.push("/GamesBody");
  };
  render = () => {
    return (
      <div>
        <div className="addheader">
          <h1>Start a Game, {this.props.username}</h1>
        </div>
        <form className="addsportform" onSubmit={this.handleSubmit}>
          <div className="addstart">
            <h3>Let's Start By Choosing the Sport</h3>
            <select onClick={this.handleSportSelect}>
              <option value="basketball">Basketball</option>
              <option value="hockey">Hockey</option>
              <option value="football">Football</option>
              <option value="tennis">Tennis</option>
            </select>
          </div>
          <div className="adddate">
            <h3>Next, let's choose the date that you want to play</h3>
            <input type="date" onChange={this.handleDate} />
          </div>
          <div className="addlocation">
            <h3>Now, let's choose where you want to play</h3>
            <div id="locationField">
              <input
                onChange={this.handleLocation}
                placeholder="Choose Location"
              />
            </div>
          </div>
          <div className="addfriend">
            <h3>Lastly, let's choose who you want to play with</h3>
            <input onChange={this.handleFriend} placeholder="Choose Friends" />
          </div>
          <div>
            <input
              onChange={this.handleSubmit}
              type="submit"
              value="Let's Play"
            />
          </div>
        </form>
      </div>
    );
  };
}
let AddSport = connect()(UnconnectedAddSport);

export default AddSport;
