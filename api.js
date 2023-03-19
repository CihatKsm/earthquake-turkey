const { default: axios } = require("axios");

const places = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın",
    "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
    "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir",
    "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir",
    "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya",
    "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize",
    "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop", "Sivas", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli",
    "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
]

module.exports = async ({ all }) => {
    const item = async (api, item) => {
        if (!api || !api?.data) return null;
        const _Finded = (itemprop) => api?.data?.split('<meta')?.filter(f => f?.includes(`itemprop="${itemprop}"`))[0]?.replace(` content="`, '')
        const Finded = (itemprop) => _Finded(itemprop)?.slice(0, _Finded(itemprop)?.indexOf(`"`))
        if (item == 'image') {
            if (Finded(item).startsWith('https://maps.google.com/')) return 'https://maps.gstatic.com/tactile/pane/default_geocode-2x.png'
            else if (Finded(item).includes('w256-h256')) return Finded(item).replace('w256-h256', 'w4096-h4096')
        }
        return Finded(item)
    }

    const url = 'http://www.koeri.boun.edu.tr/scripts/lst0.asp'
    const api = await axios({ method: 'get', url }).catch((e) => null)

    if (!api || !api.data) return [];
    const __earthquakes = api?.data?.slice(api?.data?.indexOf('<pre>') + 5, api?.data?.indexOf('</pre>'))?.split('\r\n')?.slice(7)
    const _earthquakes = all ? __earthquakes?.slice(0, 100) : __earthquakes?.slice(0, 20)
    const earthquakes = await Promise.all(_earthquakes.map(async (text) => {
        let datas = text.split(' ').filter(f => f !== '').slice(0, 8);

        let location = 'https://www.google.com/maps/place/' + datas[2] + ',' + datas[3]
        const googleApi = await axios({ method: 'get', url: location }).catch((e) => null)

        let place = await item(googleApi, 'description');

        if (place?.includes('Sea')) {
            const x = 'window.APP_INITIALIZATION_STATE=', y = 'window.APP_FLAGS='
            const apiData = googleApi?.data?.slice(googleApi.data.indexOf(x) + x.length, googleApi.data.indexOf(y)).split('[')
            if (apiData?.length) {
                for (let index = 0; index < apiData.length; index++) {
                    const e = apiData[index];
                    const finded = e.split('\\"').filter(f => f !== '' && !f.includes('null') && f.length > 1)[0]?.slice(9) || null;
                    if (places.filter(f => e.includes(f))[0]) place = place + ' - ' + finded
                }
            }
        }

        if (place?.includes('Sea')) {
            if (place?.includes('Marmara')) place = 'Marmara Denizi'
            if (place?.includes('Black')) place = 'Karadeniz'
            if (place?.includes('Mediterranean')) place = 'Akdeniz'
            if (place?.includes('Aegean')) place = 'Ege Denizi'
        }
        
        return {
            date: datas[0] + ' ' + datas[1],
            latitude: datas[2],
            longitude: datas[3],
            depth: datas[4],
            ml: [datas[5], datas[6], datas[7]].filter(f => f !== '-.-').sort((a, b) => Number(b) - Number(a))[0],
            place,
            image: await item(googleApi, 'image'),
            location
        }
    }))
    
    return earthquakes;
};