const { default: axios } = require("axios");
const cheerio = require('cheerio');

async function getPlace(lat, long) {
    let data = { coordinate: null, place: null, image: null, location: null };
    data.location = 'https://www.google.com.tr/maps/place/' + lat + ',' + long;
    const googleApi = await axios({ method: 'get', url: data.location }).catch((e) => null);
    try {
        const $ = cheerio.load(googleApi?.data) || null;
        if (!googleApi?.data || !$) return data;
        $('meta').filter((i, e) => $(e)?.attr('itemprop')).each((i, e) => {
            const isNotImage = $(e).attr('content').startsWith('https://maps.google.com/');
            if ($(e).attr('itemprop') == 'name') data.coordinate = $(e).attr('content').split(' · ')[0];
            if ($(e).attr('itemprop') == 'description') data.place = $(e).attr('content');
            if ($(e).attr('itemprop') == 'image')
                data.image = isNotImage ? 'https://maps.gstatic.com/tactile/pane/default_geocode-2x.png' : $(e).attr('content');
        })
    } catch (e) { }
    return data;
}

module.exports = async (datas) => {
    let earthquakes = new Array();
    const minimum = datas?.minimum || 0, count = datas?.count || 20, controlled = datas?.controlled || 20;

    if (isNaN(Number(controlled))) return new Error('controlled option must be a number.');
    if (Number(controlled) > 500) return new Error('controlled option must be less than 500.');
    if (isNaN(Number(minimum))) return new Error('minimum option must be a number.');
    if (isNaN(Number(count))) return new Error('count option must be a number.');
    if (Number(count) > 50) return new Error('count option must be less than 50.');

    const url = 'http://www.koeri.boun.edu.tr/scripts/lst0.asp'
    const response = await axios({ method: 'get', url }).catch((e) => null);

    const earthquakesX = response?.data?.slice(response?.data?.indexOf('<pre>') + 5, response?.data?.indexOf('</pre>'))?.split('\r\n') || [];
    const earthquakesY = earthquakesX?.filter(f => f.includes(':')).map(m => m.split(' ').filter(f => f != '').slice(0, 8)) || [];
    
    if (earthquakesY.length == 0) return [];
    
    const earthquakesZ = earthquakesY.slice(0, Number(controlled))
        .map(m => ({
            date: m[0] + ' ' + m[1], depth: String(Number(m[4])), latitude: m[2], longitude: m[3],
            ml: [m[5], m[6], m[7]].filter(f => f !== '-.-').sort((a, b) => Number(b) - Number(a))[0]
        }));

    for (let earthquake of earthquakesZ.filter(f => Number(f.ml) >= Number(minimum))) {
        const { date, latitude, longitude, depth, ml } = earthquake;
        const fixedDate = new Date(date.replaceAll('.', '-')).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
        const { coordinate, place, image, location } = await getPlace(latitude, longitude);
        earthquakes.push({ date: fixedDate, latitude, longitude, depth, ml, place, coordinate, image, location });
    }

    return earthquakes.slice(0, Number(count))
}