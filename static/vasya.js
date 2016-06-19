function unfocusMap()
{
    gisMap.flyTo({
        lat: 55.752314, 
        lng: 37.623483,
        zoom: 1
    });
}


function focusMap(lat, lng)
{
    gisMap.flyTo({
        lat: lat, 
        lng: lng - 0.0001,
        zoom: 15,
        minZoom: 10        
    });

    DG.marker([lat, lng]).addTo(gisMap);
}