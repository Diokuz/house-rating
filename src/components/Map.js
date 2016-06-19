import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
import config from './mapConfig';

class MapComponent extends React.Component {
    componentDidMount() {
        this.initMap();
        // this.setView();
    }

    initMap() {
        setTimeout(() => {
            const tilesLayer = L.tileLayer(config.tilesUrl, config.tiles);

            const map = L.map(this.refs.mapLayout, config.map);
            map.addLayer(tilesLayer).setView([55.75, 37.54], 13);
        }, 0);
    }

    setView() {
        const markersLayer = this.map.markers;
        const polygonLayer = this.map.polygon;
        const fitLayer = polygonLayer ? polygonLayer : markersLayer;

        if (fitLayer) {
            this.map.self.fitBounds(fitLayer.getBounds());
        }
    }

    componentDidUpdate() {
        const { coords } = this.props;

        if (this.map) {
            this.map.setView(coords, 15);
        }
    }

    initMap() {
        const { coords } = this.props;

        setTimeout(() => {
            const tilesLayer = L.tileLayer(config.tilesUrl, config.tiles);

            this.map = L.map(this.refs.mapLayout, config.map);
            this.map.addLayer(tilesLayer).setView(coords, 13);
        }, 100);
    }

    render() {
        return (
            <div className="map-container">
                <div className="map-container__ll" ref="mapLayout" />
            </div>
        );
    }
}

MapComponent.defaultProps = {
    coords: [55.75, 37.54]
}

export default MapComponent;
