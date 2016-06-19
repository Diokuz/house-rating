function unfocusMap()
{
    gisMap.flyTo({
        lat: 55.752314, 
        lng: 37.623483,
        zoom: 5,
        minZoom: 10        
    });
}


function focusMap(lat, lng)
{
    gisMap.flyTo({
        lat: lat, 
        lng: lng,
        zoom: 15,
        minZoom: 10        
    });
}