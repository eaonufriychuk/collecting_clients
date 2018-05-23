"use strict";

const EARTH_RADIUS = 6372795;

/**
 * Функция, которая рассчитывает расстояние (в км) между клиентом и московским офисом Яндекса.
 * @param {object} pointFrom Объект координат московского офиса Яндекса.
 * @param {object} pointTo Объект координат клиента.
 * @return {number} Расстояние (в км) между клиентом и московским офисом Яндекса.
 */
module.exports = function calculateDistance(pointFrom, pointTo) {
    if (pointFrom === undefined || pointTo === undefined) {
        throw new Error('expected more arguments');
    }

    const {lat: latFrom, long: longFrom} = pointFrom;
    const {lat: latTo, long: longTo} = pointTo;

    // переводим координаты московским офисом Яндекса в радианы
    const latRadFrom = converseDegToRad(latFrom);
    const longRadFrom = converseDegToRad(longFrom);

    //расчет косинусов и синусов широты московского офиса Яндекса
    const sinLatRadFrom = Math.sin(latRadFrom);
    const cosLatRadFrom = Math.cos(latRadFrom);

    //переводим координаты клиента в радианы
    const latRadTo = converseDegToRad(latTo);
    const longRadTo = converseDegToRad(longTo);

    //расчет косинусов и синусов широты клиента и разницы долгот московского офиса Яндекса и клиента
    const cosLatRadTo = Math.cos(latRadTo);
    const sinLatRadTo = Math.sin(latRadTo);
    const deltaLong = longRadFrom - longRadTo;
    const cosDeltaLong = Math.cos(deltaLong);
    const sinDeltaLong = Math.sin(deltaLong);

    //расчет сферического расстояния большого круга
    const sphericalDistance = Math.atan(Math.sqrt(
        (cosLatRadFrom * sinDeltaLong) ** 2 +
        (cosLatRadTo * sinLatRadFrom - sinLatRadTo * cosLatRadFrom * cosDeltaLong) ** 2) /
        (sinLatRadTo * sinLatRadFrom + cosLatRadTo * cosLatRadFrom * cosDeltaLong));

    return sphericalDistance * EARTH_RADIUS / 1000;
};

/**
 * Функция, которая переводит градусы в радианы.
 * @param {number} deg Число в градусах.
 * @return {number} Число в радианах
 */
function converseDegToRad(deg) {
    return deg * Math.PI / 180;
}
