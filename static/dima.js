$(function() {
    var suggestApi = 'https://catalog.api.2gis.ru/2.0/suggest/list?key=ruczoy1743&region_id=32&lang=ru';
    var geoApi = 'http://catalog.api.2gis.ru/geo/get';
    var geoSearchApi = 'http://catalog.api.2gis.ru/geo/search';
    var backend = 'http://139.59.141.142/rating';

    function sendRequest(lng, lat) {
        unfocusMap();
        $('.card__home').html('Загружаю...');

        $.getJSON(backend, { lng: lng, lat: lat }, function(data) {
            console.log('data', data);
            fillRatingCard(data);
            focusMap(lat, lng);
            fillGreen(data);
        });
    }

    function fillGreen(ratingData) {
        $(".card__header").text($(".js-find-input").val());
        $(".card__value").html(
            ratingData.rating + '<span class="cl__trans"> из 10</span>'
        );
        $(".js-find-input").val("");

        var mod = '_bad';

        if (ratingData.rating > 4) mod = '_normal';
        if (ratingData.rating > 7) mod = '_good';

        $('.card')
            .removeClass('_home')
            .removeClass('_bad')
            .removeClass('_normal')
            .removeClass('_normal')
            .addClass('_rating')
            .addClass(mod);
    }

    $('.js-find-input').autoComplete({
        minChars: 2,
        source: function(term, response){
            console.log('source');
            $.getJSON(suggestApi, { q: term }, function(data) {
                if (data && data.result && data.result.items && data.result.items.length) {
                    console.log('data.result.items', data.result.items);
                    response(data.result.items.map(function(item) {
                        return item;
                    }));
                }
            });
        },
        renderItem: function(item) {
            var id = '';

            if (item.id && item.hint.hint_type == 'building') {
                id = item.id;
            }

            return '<div class="autocomplete-suggestion" data-id="' + id + '" data-val="' + item.hint.text + '">' + item.hint.text + '</div>';
        },
        onSelect: function(event, term, item) {
            var id = $(item).attr('data-id');
            var text = $(item).text();

            if (id) {
                console.log('id', id);
                $.getJSON(geoApi, { key: 'ruczoy1743', id: id, version: '1.3' }, function(data) {
                    var code = data.response_code;

                    if (code == 200) {
                        var house = data.result[0];

                        if (house) {
                            var centroid = house.centroid; // POINT(37.578468 55.761139)
                            var lonlat = centroid.substr(6, 18).split(' '); // 37.578468 55.761139
                            var lon = lonlat[0];
                            var lat = lonlat[1];

                            sendRequest(lon, lat);
                        }
                    }
                });
            } else {
                $.getJSON(geoSearchApi, { key: 'ruczoy1743', version: '1.3', q: text, project: 32 }, function(data) {
                    var code = data.response_code;

                    if (code == 200) {
                        var house = data.result.find(function(geoItem) {
                            return geoItem.type == 'house';
                        });

                        if (house) {
                            var centroid = house.centroid; // POINT(37.578468 55.761139)
                            var lonlat = centroid.substr(6, 18).split(' '); // 37.578468 55.761139
                            var lon = lonlat[0];
                            var lat = lonlat[1];

                            sendRequest(lon, lat);
                        }
                    }
                });
            }
        }
    });
});