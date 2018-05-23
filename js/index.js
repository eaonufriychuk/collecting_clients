"use strict";

const fs = require('fs');
const calculateDistance = require('./calculateDistance');

/**
 * Функция, которая выводит в консоль список клиентов, которые находятся на расстоянии не более 100км от офиса Яндекса.
 * @param {array} clientList Массив клиентов.
 */
function printClients(clientList) {
    clientList.forEach(({user_id, name}) => console.log(`${user_id.toString().padStart(3)} ${name}`));
}

const YANDEX_COORDS = {lat: 55.734156, long: 37.587606};

fs.readFile('../clients.json', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    const clientList = JSON.parse(data);
    const clientListFiltered = clientList
        .filter(value => calculateDistance(YANDEX_COORDS, {lat: +value.latitude, long: +value.longitude}) <= 100)
        .sort((a, b) => a.user_id - b.user_id);

    printClients(clientListFiltered);
});