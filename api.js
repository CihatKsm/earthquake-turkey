const { default: axios } = require("axios");
let latestData = []

module.exports = async () => {
    const url = 'http://www.koeri.boun.edu.tr/scripts/lst1.asp'
    const api = await axios({ method: 'get', url }).catch((e) => null)
    if (!api) return latestData;

    const datas = api.data.match(/<pre>([\s\S]*)<\/pre>/)[1].split("\n").slice(7).slice(0, 25);
    const array = await Promise.all(datas.map(m => m.replace(`\r`, '')).map(async (data) => {
        const i = data.split(" ").filter(f => f !== '')
        return {
            date: i[0] + ' ' + i[1],
            latitude: i[2],
            longitude: i[3],
            depth: i[4],
            md: i[5],
            ml: i[6],
            mw: i[7],
            place: await item('description', i[2], i[3]),
            image: await item('image', i[2], i[3]),
            location: 'https://www.google.com/maps/place/' + i[2] + ',' + i[3]
        }
    }))

    latestData = array;
    return array;
};

async function item(item, latitude, longitude) {
    const api = await axios({ method: 'get', url: 'https://www.google.com/maps/place/' + latitude + ',' + longitude }).catch((e) => null)
    if (!api || !api?.data) return null;
    const _Finded = (itemprop) => api.data.split('<meta').filter(f => f.includes(`itemprop="${itemprop}"`))[0].replace(` content="`, '')
    const Finded = (itemprop) => _Finded(itemprop).slice(0, _Finded(itemprop).indexOf(`"`))
    if (item == 'image') {
        if (Finded(item).startsWith('https://maps.google.com/')) return 'https://maps.gstatic.com/tactile/pane/default_geocode-2x.png'
        else if (Finded(item).includes('w256-h256')) return Finded(item).replace('w256-h256', 'w4096-h4096')
    }
    return Finded(item)
}