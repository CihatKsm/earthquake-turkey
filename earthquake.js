const { default: axios } = require('axios');
const EventEmitter = require('events');
const api = require('./api');
let latestData = []
/**
 * This listener allows you to receive notifications by typing the necessary codes into it when there is any earthquake.
 */
module.exports.earthquake = new EventEmitter();

async function quake(timeout) {
    const refresh = async (x) => setTimeout(async () => await quake(x), timeout * 1000);
    const datas = await api({ all: false })

    if (!datas || !datas[0]) return refresh(30)
    if (latestData.length == 0) latestData = datas.map(m => m.date);
    if (latestData.includes(datas[0]?.date)) return refresh(30);

    latestData = [datas[0]?.date, ...latestData];

    module.exports.earthquake.emit('quake', datas[0]);
    latestData = [];
    setTimeout(async () => await quake(timeout), timeout * 1000);
}

setTimeout(async () => await quake(30), 1000);

/**
 * 
 * @returns Shows the information of the last ~100 (max) earthquakes that have occurred.
 */
module.exports.earthquakes = async ({ count }) => {
    let datas = await api({ all: true });
    if (!count) return datas;
    else return datas.slice(0, count);
};

/**
 * 
 * @param {number} minimum You can use this option to display earthquakes with a number and above. 
 * @param {number} count As a result, you can determine how many earthquake information there will be. a maximum of 25 can be shown.
 * @returns 
 */
module.exports.earthquakes.get = async ({ minimum, count }) => {
    if (!minimum) return [];
    if (isNaN(Number(minimum))) return [];

    const _datas = await api({ all: true })
    const datas = _datas.filter(f => Number(f.ml) >= Number(minimum));

    if (datas.length == 0) return [];
    if (!count) return datas;
    if (isNaN(Number(count))) return [];
    return datas.slice(0, count);
}