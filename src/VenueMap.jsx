import React, { Component } from "react";
import { connect } from "react-redux";

const cityMapInfos = {
  montreal: { iframeSrc: "https://www.google.com/maps/d/embed?mid=1rfbJlM-zEhbQ_rnCcrQCYks6A56oYVOR", },
  toronto:  { iframeSrc: "https://www.google.com/maps/d/embed?mid=1Bcqd0yDhi2NllctGsfygVyz41LbvGJ1t", },
};

class VenueMap extends Component {
  constructor(props) {
    super(props);
    
    this.mapSize = { width: 640, height: 480 };
    this.scriptSrc = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKhHA5Wv4HH6RfgFe21X4hZ3BPAdVWh7w&callback=initMap"
  }

  render = () => {
    return (
      <div className="map">
        <script
          async
          defer
          src={this.scriptSrc}></script>
        <iframe
          width={this.mapSize.width}
          height={this.mapSize.height}
          src={cityMapInfos[this.props.city].iframeSrc}></iframe>
      </div>
    )
  }
}

VenueMap = connect()(VenueMap);
export default VenueMap;
export { cityMapInfos };
