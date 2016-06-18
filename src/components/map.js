import React, { Component, PropTypes } from 'react';

export default class MapComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="map" />
    );
  }
}

MapComponent.propTypes = {};
