const MongoUrl = 'mongodb+srv://earthquake:turkey@earthquake.pnlqnmv.mongodb.net/earthquake'
const { default: axios } = require('axios');
const EventEmitter = require('events');
const mongoose = require('mongoose');

const earthquakes = mongoose.model("earthquakes", mongoose.Schema({
    date: Date,
    latitude: String,
    longitude: String,
    ml: String,
    depth: String,
    place: String,
    image: String,
    location: String
}))

let latestData = '';

mongoose.set('strictQuery', true)
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(() => console.error)

/**
 * This listener allows you to receive notifications by typing the necessary codes into it when there is any earthquake.
 */
module.exports.earthquake = new EventEmitter();

async function quake(timeout) {
    const _datas = await earthquakes.find().catch((e) => { return [] })
    const datas = _datas?.sort((a, b) => b.date - a.date)
    if (!datas || !datas[0]) return setTimeout(async () => await quake(15), timeout * 1000);
    if (latestData.length == 0) latestData = `${Number(datas[0]?.date)}`;
    if (latestData == `${Number(datas[0]?.date)}`) return setTimeout(async () => await quake(15), timeout * 1000);

    latestData = `${Number(datas[0]?.date)}`
    module.exports.earthquake.emit('quake', datas[0]);
    setTimeout(async () => await quake(timeout), timeout * 1000);
}

setTimeout(async () => await quake(10), 1000);
setTimeout(async () => await checkUpdate(), 1000);

/**
 * 
 * @returns Shows the information of the last 25 earthquakes that have occurred
 */
module.exports.earthquakes = async () => {
    const _datas = await earthquakes.find().catch((e) => { return [] });
    return _datas?.sort((a, b) => b.date - a.date) || [];
}

/**
 * 
 * @param {number} minimum You can use this option to display earthquakes with a number and above. 
 * @param {number} count As a result, you can determine how many earthquake information there will be. a maximum of 25 can be shown.
 * @returns 
 */
module.exports.earthquakes.get = async ({ minimum, count }) => {
    if (!minimum) return [];
    if (isNaN(Number(minimum))) return [];

    const _datas = await earthquakes.find().catch((e) => { return [] })
    const datas = _datas?.sort((a, b) => b.date - a.date)?.filter(f => Number(f.ml) >= Number(minimum));

    if (datas.length == 0) return [];
    if (count) {
        if (isNaN(Number(count))) return [];
        return datas.slice(0, count);
    }

    return datas;
}

async function checkUpdate() {
    const package = require('./package.json')
    const url = 'https://unpkg.com/earthquake-turkey@latest'
    const api = await axios({ method: 'get', url }).catch((e) => null)
    const latest = api.request.path.split('/')[1].split('@')[1] || 0;

    if (Number(latest.split('.').join('')) > Number(package.version.split('.').join(''))) 
        console.log('\x1b[32m%s\x1b[0m',`✅ Please update earthquake-turkey module ${package.version} to ${latest} version.`)
}
