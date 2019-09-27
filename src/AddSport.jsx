import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedAddSport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      location: "",
      Sport: "basketball",
      date: "",
      friends: "",
      NewEvent: []
    };
  }
  handleTitle = event => {
    console.log("New Title", event.target.value);
    this.setState({ title: event.target.value });
  };
  handleSportSelect = event => {
    console.log("Select Sport", event.target.value);
    this.setState({ sport: event.target.value });
  };
  handleDate = event => {
    console.log("Select Date", event.target.value);
    this.setState({ date: event.target.value });
  };
  handleLocation = event => {
    console.log("Select Location", event.target.value);
    this.setState({ location: event.target.value });
  };
  handleAmount = event => {
    console.log("Select amount", event.target.value);
    this.setState({ amount: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("event created");
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("sport", this.state.sport);
    data.append("location", this.state.location);
    data.append("date", this.state.date);
    data.append("amount", this.state.amount);
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
    this.props.history.push("/GamesBody");
  };
  render = () => {
    return (
      <div>
        <div className="addheader">
          <h1>Start a Game, {this.props.username}</h1>
        </div>
        <div>
          <h3>Name Your Event</h3>
          <input onChange={this.handleTitle} placeholder="Enter Name" />
        </div>
        <form className="addsportform" onSubmit={this.handleSubmit}>
          <div className="custom-select">
            <h3>Let's Start By Choosing the Sport</h3>
            <select className="box" onChange={this.handleSportSelect}>
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
            <div className="locationField">
              <input
                onChange={this.handleLocation}
                placeholder="Choose Location"
              />
            </div>
          </div>
          <div className="custom-select">
            <h3>Lastly, let's choose how many people you want to play with</h3>
            <select className="box" onChange={this.handleAmount}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
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

export default withRouter(AddSport);
