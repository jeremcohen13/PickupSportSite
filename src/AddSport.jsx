import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { postData, addeventApiUrl } from "./requestUtils.js";
import { ADD_EVENT } from "./store.js";
import VenueMap, { cityMapInfos } from "./VenueMap.jsx";

class AddSport extends Component {
  constructor(props) {
    super(props);

    this.maxNumPlayers = 30;
    this.sports = ["basketball", "hockey", "football", "tennis"];

    this.state = {
      name: "",
      sport: this.sports[0],
      date: "",
      location: "",
      numPlayers: 1,
      city: props.city? props.city : _.keys(cityMapInfos)[0],
    };
  }

  handleName =        event => { this.setState({ name:       event.target.value }); };
  handleSportSelect = event => { this.setState({ sport:      event.target.value }); };
  handleDate =        event => { this.setState({ date:       event.target.value }); };
  handleLocation =    event => { this.setState({ location:   event.target.value }); };
  handleNumPlayers =  event => { this.setState({ numPlayers: event.target.value }); };
  handleCitySelect =  event => { this.setState({ city:       event.target.value }); };

  handleSubmit = async event => {
    event.preventDefault();

    const newEventData = {
      username: this.props.username,
      ...(_.pick(this.state, ["name", "sport", "location", "date", "numPlayers"]))
    };

    let response = await (await postData({url: addeventApiUrl, data: newEventData})).json();
    if (response.success) {
      this.props.dispatch({
        type: ADD_EVENT,
        event: response.newEvent,
      });
      this.props.history.push("/");
    } else {
      alert(response.message);
    }
  };

  render = () => {
    return (
      <div>
        <div className="addheader">
          <h1>Start a Game, {this.props.username}</h1>
        </div>

        <form className="addsportform" onSubmit={this.handleSubmit}>
          <VenueMap city={this.state.city}/>

          <div>
            <h3>Name Your Event</h3>
            <input onChange={this.handleName} placeholder="Enter Name" />
          </div>

          <div className="custom-select">
            <h3>Let's Start By Choosing the Sport</h3>
            <select className="box" defaultValue={this.sports[0]} onChange={this.handleSportSelect}>
              {this.sports.map((sport, i) => (
                <option key={i} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          <div className="adddate">
            <h3>Next, let's choose the date that you want to play</h3>
            <input type="date" onChange={this.handleDate} />
          </div>

          <div className="custom-select">
            <h3>What city will you play in?</h3>
            <select className="box" defaultValue={this.state.city} onChange={this.handleCitySelect}>
              {_.keys(cityMapInfos).map((cityName, i) => (
                <option key={i} value={cityName}>{cityName}</option>
              ))}
            </select>
          </div>

          <div className="addlocation">
            <h3>Now, let's choose where you want to play</h3>
            <div className="locationField">
              <input onChange={this.handleLocation} placeholder="Choose Location"/>
            </div>
          </div>

          <div className="custom-select">
            <h3>Lastly, let's choose how many people you want to play with</h3>
            <select className="box" defaultValue="1" onChange={this.handleNumPlayers}>
              {Array(this.maxNumPlayers).fill().map((_, i) => {
                const num = i+1;
                return <option key={num} value={`${num}`}>{`${num}`}</option>;
              })}
            </select>
          </div>

          <div>
            <input onChange={this.handleSubmit} type="submit" value="Let's Play"/>
          </div>
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => _.pick(state, ["username"]);
AddSport = connect(mapStateToProps)(AddSport);
AddSport = withRouter(AddSport);
export default AddSport;
