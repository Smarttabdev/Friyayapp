// Component used for searching places using Google Places API
// shows a list of all places
// when a result is selected, two things happen
//   1: sets input value to address and disables search (changing value will trigger new search)
//   2: processes props.onResultClick with an argument {address, latitude, longitude}
// Take Note: This is a "style it yourself" component.
// meaning you provide css implementations for element classNames.

import React, { useEffect, useState, useRef } from 'react';
import Icon from './Icon';
import { useOutsideAlerter } from 'Src/lib/hooks';
import { getUserCurrentLocation } from 'Src/lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { connect } from 'react-redux';
import IconButton from './buttons/IconButton';

const SearchResult = props => {
  const { result, onResultClick, canAddCard } = props;

  const handleAddCardWithLocation = () => {
    const {
      geometry: { location },
      formatted_address
    } = result;
    console.log({ result });
    const latitude = location.lat();
    const longitude = location.lng();

    props.handleAddCardWithLocation({
      address: formatted_address,
      latitude,
      longitude
    });
  };

  return (
    <div className="search_result" onClick={() => onResultClick(result)}>
      <div>
        <Icon
          icon="room"
          size={14}
          containerClasses="result_icon"
          color="#F86D6D"
        />
        <div className="result_details">
          <div className="result_name">{result.name}</div>
          <div className="result_address">{result.formatted_address}</div>
        </div>
      </div>
      {canAddCard && (
        <div className="result_add_button">
          <IconButton
            icon="add"
            onClick={handleAddCardWithLocation}
            fontSize={16}
          />
        </div>
      )}
    </div>
  );
};

const LocationPicker = props => {
  const [placesService, setPlacesService] = useState(null);
  const [searchQuery, setSearchQuery] = useState(props?.address ?? '');
  const [selectedAddress, setSelectedAddress] = useState(
    props?.address ?? null
  );
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const mapRef = useRef(null);
  const dropdownRef = useRef(null);
  const { userLocation } = props;

  if (props.asDropdown) {
    useOutsideAlerter(dropdownRef, () => setShowDropdown(false));
  }

  useEffect(() => {
    setTimeout(async () => {
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      );
      setPlacesService(service);
      if (!selectedAddress && !userLocation) getUserLocation();
    });
  }, []);

  useEffect(() => {
    setSearchQuery(props.searchQuery);
  }, [props.searchQuery]);

  const getUserLocation = () => getUserCurrentLocation();

  useEffect(() => {
    handleSearchQuery();
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(props?.address);
  }, [props.address]);

  const handleSearchQuery = () => {
    if (selectedAddress != searchQuery) {
      searchQuery.length > 0 && setShowDropdown(true);
      if (selectedAddress) setSelectedAddress(null);
      if (placesService) {
        const requestLocation = userLocation
          ? new window.google.maps.LatLng(
              userLocation.latitude,
              userLocation.longitude
            )
          : null;

        let serviceRequest = { query: searchQuery };
        if (requestLocation) {
          serviceRequest.location = requestLocation;
          serviceRequest.radius = '1000';
        }

        placesService.textSearch(serviceRequest, (results, status) => {
          if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            setSearchResults(
              results.map(res => {
                const { formatted_address, geometry, name } = res;
                return { formatted_address, geometry, name };
              })
            );
          }
        });
      }
    }
  };

  const handleResultClick = result => {
    const {
      geometry: { location },
      formatted_address,
      name
    } = result;

    const latitude = location.lat();
    const longitude = location.lng();

    const resultFullAddress = formatted_address.includes(name)
      ? formatted_address
      : `${name}, ${formatted_address}`;

    if (props.asDropdown) {
      setSelectedAddress(resultFullAddress); // By setting this we can disable search
      setSearchQuery(resultFullAddress);
      setShowDropdown(false);
    }

    props.onResultClick &&
      props.onResultClick({ address: resultFullAddress, latitude, longitude });
  };

  const { asDropdown, hideInput, topicId } = props;

  return (
    <div className="location_picker">
      {!hideInput && (
        <input
          placeholder="Search place"
          className="form-control search_input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          // style={{ color: card_font_color }}
        />
      )}

      <div ref={mapRef}></div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`search_results ${asDropdown && 'dropdown-menu'}`}
        >
          {searchResults.length > 0 ? (
            searchResults.map((result, i) => (
              <SearchResult
                key={i}
                result={result}
                onResultClick={handleResultClick}
                handleAddCardWithLocation={props.handleAddCardWithLocation}
                canAddCard={!!topicId}
              />
            ))
          ) : (
            <div className="noResult">No results</div>
          )}
        </div>
      )}
    </div>
  );
};

const mapState = state => {
  const {
    utilities: { userLocation }
  } = stateMappings(state);
  return { userLocation };
};

export default connect(mapState)(LocationPicker);
