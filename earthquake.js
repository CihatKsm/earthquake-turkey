const EventEmitter = require('events');
const api = require('./api');
let latestData = '';

/**
 * This listener allows you to receive notifications by typing the necessary codes into it when there is any earthquake.
 */
module.exports.earthquake = new EventEmitter();

async function quake(timeout) {
    const datas = await api();
    if (latestData.length == 0) latestData = datas[0].date;
    if (latestData == datas[0].date) return setTimeout(async () => await quake(timeout), timeout);
    latestData = datas[0].date
    module.exports.earthquake.emit('quake', datas[0])
    setTimeout(async () => await quake(timeout), timeout);
}

setTimeout(async () => await quake(30), 1000);
/**
 * 
 * @returns Shows the information of the last 25 earthquakes that have occurred
 */
module.exports.earthquakes = async () => await api()

/**
 * 
 * @param {number} minimum You can use this option to display earthquakes with a number and above. 
 * @param {number} count As a result, you can determine how many earthquake information there will be. a maximum of 25 can be shown.
 * @returns 
 */
module.exports.earthquakes.get = async ({ minimum: Number, count }) => {
    if (!minimum) return [];
    if (isNaN(Number(minimum))) return [];

    const all = await api()
    const datas = all.filter(f => Number(f.ml) >= Number(minimum))

    if (datas.length == 0) return [];
    if (count) {
        if (isNaN(Number(count))) return [];
        return datas.slice(0, count)
    }

    return datas;
}