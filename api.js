const { default: axios } = require("axios");
let latestData = []

module.exports = async () => {
    const url = 'http://www.koeri.boun.edu.tr/scripts/lst1.asp'
    const api = await axios({ method: 'get', url }).catch((e) => null)
    if (!api) return latestData;

    const datas = api.data.match(/<pre>([\s\S]*)<\/pre>/)[1].split("\n").slice(7).slice(0, 500);
    const array = datas.map(m => m.replace(`\r`, '')).map(data => {
        const i = data.split("  ").filter(f => f !== '')
        return {
            date: i[0],
            latitude: i[1],
            longitude: i[2],
            depth: i[3],
            md: i[4],
            ml: i[5],
            mw: i[6],
            place: i[7],
        }
    })

    latestData = array;
    return array;
};