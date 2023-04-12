const { default: axios } = require("axios");
const cheerio = require('cheerio');

async function getPlace(lat, long) {
    const location = 'https://www.google.com.tr/maps/place/' + lat + ',' + long;
    const googleApi = await axios({ method: 'get', url: location }).catch((e) => null);
    const $ = cheerio.load(googleApi.data);
    let place, image, coordinate;
    $('meta').filter((i, e) => $(e)?.attr('itemprop')).each((i, e) => {
        const isNotImage = $(e).attr('content').startsWith('https://maps.google.com/');
        if ($(e).attr('itemprop') == 'name') coordinate = $(e).attr('content').split(' · ')[0];
        if ($(e).attr('itemprop') == 'description') place = $(e).attr('content');
        if ($(e).attr('itemprop') == 'image')
            image = isNotImage ? 'https://maps.gstatic.com/tactile/pane/default_geocode-2x.png' : $(e).attr('content');
    })
    return { coordinate, place, image, location }
}

async function getEarthquakes(datas) {
    const minimum = datas?.minimum || 0,
        count = datas?.count || 20,
        controlled = datas?.controlled || 20;
    if (isNaN(Number(controlled))) return new Error('controlled option must be a number.');
    if (Number(controlled) > 500) return new Error('controlled option must be less than 500.');
    if (isNaN(Number(minimum))) return new Error('minimum option must be a number.');
    if (isNaN(Number(count))) return new Error('count option must be a number.');
    if (Number(count) > 50) return new Error('count option must be less than 50.');

    const url = 'http://www.koeri.boun.edu.tr/scripts/lst0.asp'
    const response = await axios({ method: 'get', url }).catch((e) => null);
    const $ = cheerio.load(response?.data);
    const _earthquakes = $('pre').text().split('\n').filter(f => f.includes(':')).map(m => m.split(' ').filter(f => f != '').slice(0, 8));
    let earthquakes = [];

    for (let quake of _earthquakes.slice(0, Number(controlled))) {
        const ml = [quake[5], quake[6], quake[7]].filter(f => f !== '-.-').sort((a, b) => Number(b) - Number(a))[0];
        if (Number(ml) < Number(minimum)) continue;
        const { coordinate, place, image, location } = await getPlace(quake[2], quake[3]);
        earthquakes.push({
            date: quake[0] + ' ' + quake[1],
            latitude: quake[2],
            longitude: quake[3],
            depth: String(Number(quake[4])),
            ml, place, coordinate, image, location
        });
    }

    return earthquakes.slice(0, Number(count))
}

module.exports = getEarthquakes;