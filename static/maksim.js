function getMetroInfo(metro) {
    return '<div class="card__line js-metro-item">' +
        '<div class="card__line-cut">' +
        '<div class="card__line-desc">' +
        metro.distance + ' км, <span class="cl__blue">' + nearestTimeFormat(metro.walkTime) + '</span> до метро "' + metro.name + '"' +
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

function getNoiseInfo(noise) {
    return '<div class="card__line">' +
        '<div class="card__line-cut">' +
        '<div class="card__line-desc">' +
        noise.reason +
        '</div>' +
        '</div>' +
        '</div>';
}

function getCommoditiInfo(comm){
    return '<div class="card__line">' +
        '<div class="card__line-cut">' +
        '<div class="card__line-desc">' +
        comm.name + ' адрес <span>'+comm.address+'<span>'+
        '</div>' +
        '</div>' +
        '</div>';
}
function getHeader(name){
    return '<div class="card__line">' +
        '<div class="card__line-cut">' +
        '<div class="card__line-desc">' +
        '<b>'+ name + '</b>' +
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

    var auto = ratingData.auto;
    var transport = ratingData.transport;
    var metros = transport.nearestMetroStations;
    var busStop = transport.nearestBusStop;
    var schoolsArr = ratingData.education.schoolsNearby;
    var ecology = ratingData.ecology;


    $(".js-metro-item").remove();
    $(".js-transport-summary").html([
        '<span class="emodzi man"></span><span class="cl__blue">' + nearestTimeFormat(metros[0].walkTime) + '</span>',
        " до м. \"",
        metros[0].name,
        "\", ",
        '<span class="emodzi car"></span><span class="cl__red"> ' + auto.driveToCenterTime + ' мин. </span>',
        "до ТТК"
    ]);
    $(".js-traffic-info").html([auto.driveToCenterTime, " мин. до центра без пробок и ", auto.driveToCenterInTraffic, " мин. с пробками"]);
    $(".js-bus-info").html(["до ближайшей остановки \"", busStop.name, "\" идти ", nearestTimeFormat(busStop.walkTime)]);

    var metroHtml = metros.map(function (i) {
        return getMetroInfo(i);
    }).join("");


    $(".js-card-section-metro").append(metroHtml);

    if (schoolsArr.length) {
        $(".js-education-summary").parent().next(".fa").show();
        $(".js-education-summary").html(["Рядом есть несколько хороших <span class='emodzi school'></span> <span class='cl__yellow'>школ</span>"]);

        $(".js-card-section-edu").html("");
        $(".js-card-section-edu").append(schoolsArr.map(function (i) {
            return getSchoolInfo(i);
        }).join(""));
    } else {
        $(".js-education-summary").html(["До хорошей школы идти не менее 20 мин пешком"]);
        $(".js-education-summary").parent().next(".fa").removeClass("fa-arrow-up").addClass("fa-arrow-down").hide();
        $(".js-card-section-edu").html("");
    }


    if(ecology.plants && ecology.plants.length) {
        $(".js-ecology-summary").html(["По данным экологической службы качество <span class='emodzi tree'></span> <span class='cl__green'>озеленения</span> района — ",ecology.plants[0].plantQuality, " из 100"])
    } else {
        $(".js-ecology").hide();
    }

    if(ecology.noises && ecology.noises.length) {
        $(".js-noise").find(".fa").show();
        $(".js-noise-summary").html(["есть превышения нормативов допустимого уровня шума"]);

        $(".js-card-section-noise").html("");
        $(".js-card-section-noise").append(ecology.noises.map(function (i) {
            return getNoiseInfo(i);
        }).join(""));
    } else {
        $(".js-noise-summary").html(["Нет превышений нормативов допустимого уровня шума"]);
        $(".js-noise").find(".fa").removeClass("fa-arrow-up").addClass("fa-arrow-down").hide();
        $(".js-card-section-noise").html("");
    }

    var comodoties = ratingData.commodities;

    $(".js-commodities-summary").html([" В 5 минутах ходьбы банков – ", comodoties.banks.length,
                                       ", аптек – ", comodoties.chemists.length,
                                       ", ресторанов – ", comodoties.restaurants.length,
                                       ", супермаркетов – ", comodoties.supermarkets.length]);

    $(".js-card-section-commodities").html("");

    $(".js-card-section-commodities").append(getHeader("Банки"));
    $(".js-card-section-commodities").append(comodoties.banks.map(function (i) {
        return getCommoditiInfo(i);
    }).join(""));


    $(".js-card-section-commodities").append(getHeader("Аптеки"));
    $(".js-card-section-commodities").append(comodoties.chemists.map(function (i) {
        return getCommoditiInfo(i);
    }).join(""));

    $(".js-card-section-commodities").append(getHeader("Рестораны"));
    $(".js-card-section-commodities").append(comodoties.restaurants.map(function (i) {
        return getCommoditiInfo(i);
    }).join(""));

    $(".js-card-section-commodities").append(getHeader("Супермаркеты"));
    $(".js-card-section-commodities").append(comodoties.supermarkets.map(function (i) {
        return getCommoditiInfo(i);
    }).join(""));

    var price = ratingData.apartments;
    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    // var ahaha = price.purchase.toString().

    $(".js-cost").html([numberWithSpaces(price.purchase)," ₽ за м<sup>2</sup>"]);
    $(".js-rent").html([numberWithSpaces(price.rent)," ₽ за м<sup>2</sup>"]);

}