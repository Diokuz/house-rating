function unfocusMap()
{
    gisMap.flyTo({
        center: [55.752314, 37.623483],
        zoom: 10,
        minZoom: 10,
        maxZoom: 15
    });
}


function focusMap(lat, lng)
{
    gisMap.flyTo([lat, lng], 15);
}