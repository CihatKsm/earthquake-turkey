const EventEmitter = require('events');
const api = require('./api');
const { default: axios } = require('axios');
let latestDatas = [];

/**
 * This function allows you to get the latest earthquakes.
 * @param {Object} data
 * @param {Number} data.minimum Minimum magnitude of earthquakes to be returned.
 * @param {Number} data.count Number of earthquakes to be returned.
 * @param {Number} data.controlled Number of earthquakes to be controlled.
 * @returns {Array} Returns an array of earthquakes.
 */
module.exports.earthquakes = async (data) => await api(data);

/**
 * This listener allows you to receive notifications by typing the necessary codes into it when there is any earthquake.
 */
module.exports.earthquake = new EventEmitter();

(async function quake(timeout) {
    const refresh = async (x) => setTimeout(async () => await quake(x), timeout * 1000);
    const datas = await api();
    if (!datas || !datas[0]?.id) return refresh(15);
    console.log(latestDatas.includes(datas[0].id))
    if (latestDatas.length == 0) latestDatas = datas.map(m => m.id);
    if (latestDatas.includes(datas[0].id)) return refresh(15);
    latestDatas = [datas[0].id, ...latestDatas.slice(0, 19)];
    module.exports.earthquake.emit('quake', datas[0]);
    return refresh(15);
})(10);

(async () => {
    const package = require('./package.json');
    const requestUrl = `http://registry.npmjs.org/${package.name}`;
    const { data } = await axios.get(requestUrl).catch((e) => ({ data: null })) || { data: null };
    if (!data) return;
    const latest = data['dist-tags'].latest;
    if (package.version !== latest) {
        console.log(new Date(), `(${package.name}) New version available! (${latest})`);
        console.log(new Date(), `(${package.name}) Please update your package with "npm i ${package.name}@latest"`);
    }
})();