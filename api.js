const { default: axios } = require("axios");
let latestData = []

module.exports = async () => {
    const item = async (item, latitude, longitude) => {
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

    const url = 'http://udim.koeri.boun.edu.tr/zeqmap/xmlt/son24saat.xml'
    const api = await axios({ method: 'get', url }).catch((e) => null)
    if (!api || !api.data) return [];
    const _earhquakes = api.data.slice(api.data.indexOf('<eqlist>') + 8, api.data.indexOf('</eqlist>'))
        .split('\r\n')
        .filter(f => f !== '')
        .map(m => m.split('\t').join(' '))
        .reverse()
        .slice(0, 50)

    const earhquakes = await Promise.all(_earhquakes.map(async (m) => {
        const _data = (name) => m.slice(m.indexOf(name) + name.length + 2)
        const data = (name) => _data(name).slice(0, _data(name).indexOf(`"`))

        return {
            date: data('name'),
            latitude: data('lat'),
            longitude: data('lng'),
            ml: data('mag'),
            depth: data('Depth'),
            place: await item('description', data('lat'), data('lng')),
            image: await item('image', data('lat'), data('lng')),
            location: 'https://www.google.com/maps/place/' + data('lat') + ',' + data('lng')
        }
    }))

    latestData = earhquakes;
    return earhquakes;
};