const EventEmitter = require('events');
const api = require('./api');
let latestData = '';

module.exports.earthquake = new EventEmitter();

setInterval(async () => {
    const datas = await api()
    if (latestData.length == 0) latestData = datas[0].date;
    if (latestData == datas[0].date) return;
    latestData = datas[0].date
    module.exports.earthquake.emit('quake', datas[0])
}, 10 * 1000);

module.exports.earthquakes = async () => await api()

module.exports.earthquakes.get = async ({ minimum, count }) => {
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