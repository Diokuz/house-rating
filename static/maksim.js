function getMetroInfo(metro) {
    return '<div class="card__line">' +
        '<div class="card__line-cut">' +
        '<div class="card__line-desc">' +
        metro.distance + ' км, <a href="#nogo">' + nearestTimeFormat(metro.walkTime) + '</a> до метро "' + metro.name + '"' +
        '</div>' +
        '</div>' +
        '</div>';
}

function getSchoolInfo(school) {
    return '<div class="card__line">' +
        '<div class="card__line-cut">' +
        '<div class="card__line-desc">' +
        school.name + ', ' + school.statistics.over150ball + ' учеников сдали ЕГЭ на 150–220 баллов. ' + school.statistics.over220ball + ' ученика — на 220 баллов или выше' +
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
    var schoolsArr = ratingData.education.schoolsNearby;
    var ecology = ratingData.ecology;

    $(".js-transport-summary").html([nearestTimeFormat(metros[0].walkTime), " до м. \"", metros[0].name, "\", ", auto.driveToCenterTime, " мин. до ТТК"]);
    $(".js-traffic-info").html([auto.driveToCenterTime, " мин. до ТТК без пробок и ", auto.driveToCenterInTraffic, " мин с пробками"]);
    $(".js-bus-info").html(["до ближайшей остановки \"", busStop.name, "\" идти ", nearestTimeFormat(busStop.walkTime)]);

    var metroHtml = metros.map(function (i) {
        return getMetroInfo(i);
    }).join("");


    if (schoolsArr.length) {
        $(".js-education-summary").html(["Рядом есть несколько хороших школ"]);


        $(".js-card-section-edu").append(schoolsArr.map(function (i) {
            return getSchoolInfo(i);
        }).join(""));
    } else {
        $(".js-education-summary").html(["До ближайшей школы идти не менее 20 мин"]);
        $(".js-education-summary").parent().next(".fa").hide();
    }

    $(".js-card-section-metro").append(metroHtml);

    if(ecology.plants && ecology.plants.length) {
        $(".js-ecology-summary").html(["По данным экологической службы качество озеленения района — ",ecology.plants[0].plantQuality, " из 100"])
    }

}

setTimeout(
    fillRatingCard({
        "rating": 8.6,
        "ecology": {"plants": [], "noises": []},
        "apartments": {"purchase": 183586, "rent": 807},
        "auto": {"driveToCenterTime": 30, "driveToCenterInTraffic": 33},
        "commodities": {
            "chemists": [{
                "name": "Фармадар, сеть аптек",
                "address": "Исаковского, 33 к1"
            }, {"name": "ГорЗдрав, сеть аптек", "address": "Маршала Катукова, 25"}, {
                "name": "ГорЗдрав, сеть аптек",
                "address": "Маршала Катукова, 23"
            }, {
                "name": "Эко Мир, аптека",
                "address": "Маршала Катукова, 24 к5"
            }, {
                "name": "ЗдравСити, служба заказа товаров аптечного ассортимента",
                "address": "Маршала Катукова, 24 к5"
            }],
            "supermarkets": [{
                "name": "Азбука вкуса, сеть супермаркетов",
                "address": "Исаковского, 33"
            }, {
                "name": "Пятерочка, сеть универсамов",
                "address": "Исаковского, 33 к1"
            }, {"name": "Магнит, сеть универсамов", "address": "Исаковского, 33 к3"}, {
                "name": "888, сеть магазинов",
                "address": "Исаковского, 31"
            }, {
                "name": "Роникс, ООО, продуктовый магазин",
                "address": "Исаковского, 31"
            }, {
                "name": "Перекресток, сеть супермаркетов",
                "address": "Маршала Катукова, 25"
            }, {"name": "Продуктовый магазин", "address": "Исаковского, 27 к1"}, {
                "name": "Кириос, минимаркет",
                "address": "Маршала Катукова, 24 к5"
            }],
            "banks": [{"name": "АКБ Авангард, ПАО", "address": "Исаковского, 33 к1"}, {
                "name": "Сбербанк России, ПАО",
                "address": "Маршала Катукова, 25"
            }],
            "restaurants": [{
                "name": "Мьюзик холл, ресторан-караоке",
                "address": "Исаковского, 33"
            }, {"name": "Сити Пицца, ресторан-пиццерия", "address": "Исаковского, 33 к3"}, {
                "name": "Лоза, кафе",
                "address": "Исаковского, 31"
            }, {"name": "Чайхона №1, сеть ресторанов", "address": "Маршала Катукова, 23"}]
        },
        "education": {
            "schoolsNearby": [{
                "statistics": {"over150ball": 48, "over220ball": 30, "passedTotal": 54},
                "location": [55.806921, 37.419244],
                "name": "ГБОУ СОШ № 1302"
            }, {
                "statistics": {"over150ball": 71, "over220ball": 37, "passedTotal": 80},
                "location": [55.807884, 37.412408],
                "name": "ГБОУ гимназия № 1519"
            }]
        },
        "transport": {
            "nearestMetroStations": [{
                "walkTime": 15,
                "distance": 1.0,
                "name": "Строгино",
                "location": [55.8038, 37.4031]
            }, {"walkTime": 26, "distance": 1.8, "name": "Спартак", "location": [55.8182, 37.4353]}],
            "nearestBusStop": {
                "walkTime": 1,
                "location": [55.804552339724545, 37.419802837004184],
                "name": "Ул. Исаковского, 33"
            },
            "timeToCenter": 66
        }
    }), 1000);