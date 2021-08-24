//MapBackground, component to display cards on the map
//double click on map would return clicked location latitude and longitude
//single click would clear location gotten from double click

import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { getUserCurrentLocation } from 'Lib/utilities';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCardIconImage } from './utils';

const loader = new Loader({
  apiKey: 'AIzaSyC579-8__jqZnxyCTV8MSRbgB2W7a9MdAs',
  version: 'weekly',
  libraries: ['places']
});

const scaledIconSize = 40;
const labelOrigin_y_axis = 15;
const markerLabelFontSize = '16px';
const markerLabelFontWeight = '400';

class MapBackground extends Component {
  constructor(props) {
    super(props);
    this.mapBackgroundRef = React.createRef();
    this.state = {
      map: null,
      markers: []
    };
  }

  async componentDidMount() {
    if (!this.props.userLocation) getUserCurrentLocation();
    await loader.load().then(this.setUpMap);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cards != this.props.cards) this.assignCardsToMarkers();
    if (prevProps.userLocation != this.props.userLocation) this.setUpMap();
    if (prevProps.cardInFocus != this.props.cardInFocus) {
      if (this.props.cardInFocus) {
        this.focusMarker({});
      }
    }
    if (prevProps.locationInFocus != this.props.locationInFocus) {
      if (this.props.locationInFocus) {
        const { latitude, longitude } = this.props.locationInFocus;
        this.focusLocation({ latitude, longitude });
      }
    }
  }

  setUpMap = () => {
    //MAP
    const { userLocation } = this.props;

    let mapOptions = { zoom: 12 };
    if (userLocation)
      mapOptions.center = {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      };

    const map = new window.google.maps.Map(
      this.mapBackgroundRef.current,
      mapOptions
    );

    //ON DOUBLE CLICK LOCATION
    map.addListener('dblclick', mapsMouseEvent => {
      const lng = mapsMouseEvent.latLng.lng();
      const lat = mapsMouseEvent.latLng.lat();
      const seletedLocation = {
        longitude: lng,
        latitude: lat
      };

      this.setState({ seletedLocation });
      this.props.setSelectedLocation(seletedLocation);
    });

    //ONCLICK MAP
    map.addListener('click', () => {
      //clear double click here
      this.props.setSelectedLocation(null);
    });

    //ON CHANGE MAPTYPE
    map.addListener('maptypeid_changed', () => {
      //Used to change label color when map type changes
      const { markers, userMarker } = this.state;
      let allMarkers = [...markers];
      if (userMarker) allMarkers.push(userMarker);
      allMarkers.forEach(marker => {
        const { map } = this.state;
        const mapType = map.getMapTypeId();
        const label = marker.getLabel();
        if (mapType == 'hybrid' || mapType == 'satellite') label.color = '#FFF';
        else label.color = '#000';
        marker.setLabel(label);
      });
    });

    if (userLocation) {
      //Display user on map
      const userMarker = new window.google.maps.Marker({
        position: mapOptions.center,
        map,
        icon: {
          //For more url icons visit: https://sites.google.com/site/gmapsdevelopment/
          url: 'http://maps.google.com/mapfiles/ms/micons/man.png',
          labelOrigin: new window.google.maps.Point(51, labelOrigin_y_axis),
          scaledSize: new window.google.maps.Size(
            scaledIconSize,
            scaledIconSize
          ),
          a: window.Marker
        },
        label: {
          text: 'You',
          color: '#000',
          fontWeight: markerLabelFontWeight,
          fontSize: markerLabelFontSize
        }
      });

      this.setState({ userMarker });
    }

    this.setState({ map }, this.assignCardsToMarkers);
  };

  assignCardsToMarkers = () => {
    //MARKERS
    let { cards } = this.props;
    const { map } = this.state;
    cards = cards
      .filter(c => c.longitude && c.latitude)
      .map(c => ({
        ...c,
        location: { lat: c.latitude, lng: c.longitude }
      }));

    const cardsWithLocation = cards.filter(card => !!card?.location);

    let markers = [];
    cardsWithLocation.forEach(card => {
      let cardTitle = card.title;
      cardTitle =
        cardTitle.length > 20 ? cardTitle.substr(0, 20) + '...' : cardTitle;

      const labelOrigin_x_axis = 38 + cardTitle.length * 4.5; // This is used to make sure label stays beside the icon

      const marker = new window.google.maps.Marker({
        position: card.location,
        map,
        icon: {
          //For more url icons visit: https://sites.google.com/site/gmapsdevelopment/
          url: getCardIconImage(card.cardType),
          // url: 'http://maps.google.com/mapfiles/ms/micons/red-pushpin.png',
          labelOrigin: new window.google.maps.Point(
            labelOrigin_x_axis,
            labelOrigin_y_axis
          ),
          scaledSize: new window.google.maps.Size(
            scaledIconSize,
            scaledIconSize
          )
        },
        label: {
          text: cardTitle,
          color: '#000',
          fontWeight: markerLabelFontWeight,
          fontSize: markerLabelFontSize
        }
      });

      //ONCLICK MARKER
      marker.addListener('click', () => {
        this.props.handleOpenCard(card);
      });

      markers.push(marker);
    });
    this.setState({ markers });
  };

  focusMarker = () => {
    //Find the marker from the cardInFocus
    const { cardInFocus } = this.props;
    const { map, markers } = this.state;

    let latitude;
    let longitude;

    //If the marker exists, proceed with focus

    const cardMarker = markers.find(marker => {
      let { lat, lng } = marker.getPosition();
      latitude = lat();
      longitude = lng();
      return (
        cardInFocus.latitude == latitude && cardInFocus.longitude == longitude
      );
    });

    if (cardMarker) {
      this.focusLocation({ latitude, longitude });
    }
  };

  focusLocation = ({ latitude, longitude }) =>
    this.state.map.setCenter(
      new window.google.maps.LatLng(latitude, longitude)
    );

  render() {
    const { userLocation } = this.props;
    return (
      <>
        {!userLocation && (
          <div className="map_background noLocation">
            Kindly allow access to location for better search suggestions
          </div>
        )}
        <div className="map_background" ref={this.mapBackgroundRef}></div>
      </>
    );
  }
}

const mapState = state => {
  const {
    utilities: { userLocation }
  } = stateMappings(state);
  return { userLocation };
};

export default connect(mapState)(MapBackground);
