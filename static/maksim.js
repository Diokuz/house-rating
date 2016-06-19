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