function unfocusMap()
{
    gisMap.flyTo({
        center: { lat: 55.752314, long: 37.623483 },
        zoom: 10,
        minZoom: 10,
        maxZoom: 15
    });
}


function focusMap(lat, lng)
{
    gisMap.flyTo({lat: lat, long: lng}, 15);
}