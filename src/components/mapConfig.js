export default {
    map: {
        /*
         * Controls
         */
        zoomControl: false,
        attributionControl: false,
        /*
         * Keyboard
         */
        keyboardZoomOffset: 0,
        keyboardPanOffset: 0,
        /*
         * Mouse & Touch
         */
        // dragging: false,
        // touchZoom: false,
        // scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        tap: false,
        /*
         * Zoom
         */
        // minZoom: 11,
        maxZoom: 15
    },
    tilesUrl: '//square1.maps.2gis.com/tiles?x={x}&y={y}&z={z}',
    tiles: {
        errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGP6DwABBQECz6AuzQAAAABJRU5ErkJggg==',
        subdomains: ['1', '2', '3', '4']
    },
    geometries: {  // Настраивать стили геомтерий тут, когда появятся требования.
        stroke: false,
        fill: false
    },
    markers: {
        mapWidget: {
            iconSize: 0,
            className: 'map__widgetMarker',
            popupAnchor: [0, -40]
        },
        mapWidgetHovered: {
            iconSize: 0,
            className: 'map__widgetMarkerHovered',
            popupAnchor: [0, -40]
        },
        mapPlace: {
            iconSize: 0,
            className: 'map__placeMarker'
        }
    }
};
