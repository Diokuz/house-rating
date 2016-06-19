function unfocusMap()
{
}

function focusMap(lat, lng)
{
    gisMap.flyTo({
        lat: lat, 
        lng: lng - 0.004,
        zoom: 15,
        minZoom: 10        
    });

    DG.marker([lat, lng]).addTo(gisMap);
}