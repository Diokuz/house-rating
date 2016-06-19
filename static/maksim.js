function getMetroInfo(metro) {
    return '<div class="card__line">' +
        '<div class="card__line-cut">' +
        '<div class="card__line-desc">' +
        metro.distance + ' км, <a href="#nogo">' + nearestTimeFormat(metro.walkTime) + '</a> до метро ' + metro.name +
        '</div>' +
        '</div>' +
        '</div>';
}

function nearestTimeFormat(time) {
    if (!time) {
        return "меньше минуты"
    }
    return time + " мин."
}

function fillRatingCard(ratingData) {

    $(".js-rating-value").text(ratingData.rating);
    $(".js-card-header").text($(".js-find-input").val());
    $(".js-find-input").val("");


    var auto = ratingData.auto;
    var transport = ratingData.transport;
    var metros = transport.nearestMetroStations
    var busStop = transport.nearestBusStop;
    $(".js-transport-summary").html([nearestTimeFormat(metros[0].walkTime), " до м. ", metros[0].name, ", ", auto.driveToCenterTime, " мин. до ТТК"]);
    $(".js-traffic-info").html([auto.driveToCenterTime, " мин. до ТТК без пробок и ", auto.driveToCenterInTraffic, " мин с пробками"]);
    $(".js-bus-info").html(["до ближайшей остановки " ,busStop.name, " идти ", nearestTimeFormat(busStop.walkTime)]);

    var metroHtml = metros.map(function (i) {
        return getMetroInfo(i);
    }).join("");

    $(".js-card-section").append(metroHtml);

}

setTimeout(
    fillRatingCard({
        "rating": 5.7,
        "ecology": {"plants": [], "noises": []},
        "apartments": {"purchase": 136719, "rent": 682},
        "auto": {"driveToCenterTime": 33, "driveToCenterInTraffic": 37},
        "commodities": {
            "chemists": [{
                "name": "Ковиаф, аптека",
                "address": "Исаковского, 4 к2"
            }, {
                "name": "ЗдравСити, служба заказа товаров аптечного ассортимента",
                "address": "Исаковского, 6 к2"
            }, {"name": "Аструмфарм, ООО, аптека", "address": "Исаковского, 6 к2"}],
            "supermarkets": [{
                "name": "Дикси, сеть супермаркетов",
                "address": "Исаковского, 6 к1"
            }, {
                "name": "BILLA, сеть супермаркетов",
                "address": "Исаковского, 6 к2"
            }, {
                "name": "ЛАЗ-Сервис, ООО, продуктовый магазин",
                "address": "Исаковского, 2 к1"
            }, {
                "name": "Монетка, сеть универсамов",
                "address": "Исаковского, 8 к4"
            }, {"name": "МТ и К, ООО, продуктовый магазин", "address": "Исаковского, 2 к2"}],
            "banks": [{"name": "Сбербанк России, ПАО", "address": "Исаковского, 2 к1"}],
            "restaurants": []
        },
        "education": {"schoolsNearby": []},
        "transport": {
            "nearestMetroStations": [{
                "walkTime": 18,
                "distance": 1.3,
                "name": "Мякинино",
                "location": [55.8252, 37.3852]
            }, {"walkTime": 24, "distance": 1.6, "name": "Строгино", "location": [55.8038, 37.4031]}],
            "nearestBusStop": {
                "walkTime": 0,
                "location": [55.818651913961354, 37.400285016858625],
                "name": "Ул. Исаковского, 6"
            },
            "timeToCenter": 75
        }
    }), 1000);