import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedTorontoMaps extends Component {
  initMaptoggle() {
    var options = {
      zoom: 8,
      center: { lat: 43.6532, lng: -79.3832 }
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
          src="https://www.google.com/maps/d/embed?mid=1Bcqd0yDhi2NllctGsfygVyz41LbvGJ1t"
          width="640"
          height="480"
        ></iframe>
      </div>
    );
  };
}
let TorontoMaps = connect()(UnconnectedTorontoMaps);
export default TorontoMaps;
