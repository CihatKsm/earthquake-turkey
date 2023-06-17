const { default: axios } = require("axios");

module.exports = async (datas) => {
    const minimum = datas?.minimum || 0, count = datas?.count || 20;

    if (isNaN(Number(minimum))) return new Error('minimum option must be a number.');
    if (isNaN(Number(count))) return new Error('count option must be a number.');
    if (Number(count) > 200) return new Error('count option must be less than 200.');

    const url = 'http://earthquake-api.cihatksm.com/'
    const response = await axios({ method: 'get', url }).catch((e) => null) || null;
    let earthquakes = response?.data;
    
    if (minimum) earthquakes = earthquakes?.filter(f => Number(f.ml) >= Number(minimum));
    if (count) earthquakes = earthquakes?.slice(0, Number(count));

    return earthquakes;
}