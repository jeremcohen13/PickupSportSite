import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedMontrealMaps extends Component {
  initMaptoggle() {
    var options = {
      zoom: 8,
      center: { lat: 45.5017, lng: -73.5673 }
    };
    var map = new google.maps.Map(document.getElementById("map"), options);
  }
  render = () => {
    return (
      <div className="map">
        <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKhHA5Wv4HH6RfgFe21X4hZ3BPAdVWh7w&callback=initMap"
        ></script>
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1rfbJlM-zEhbQ_rnCcrQCYks6A56oYVOR"
          width="640"
          height="480"
        ></iframe>
      </div>
    );
  };
}
let MontrealMaps = connect()(UnconnectedMontrealMaps);
export default MontrealMaps;
