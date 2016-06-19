function unfocusMap()
{
}

function focusMap(lat, lng)
{
    gisMap.flyTo({
        lat: lat,
        lng: lng - (2.7 / (window.innerWidth - 640)),
        zoom: 13,
    });

    if (gisMarker == null) {
        gisMarker = DG.marker([lat, lng]);
        gisMarker.addTo(gisMap);
    } else {
        gisMarker.setLatLng({'lat': lat, 'lng': lng});
    }
    
}