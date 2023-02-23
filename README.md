#### Kandi̇lli̇ Rasathanesi̇ Ve Deprem Araştirma Ensti̇tüsü, Bölgesel Deprem-tsunami̇ İzleme Ve Değerlendi̇rme Merkezi̇ tarafından sunulan bilgileri içermektedir. 
### Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.

## Modül İndirme:

```bash
  npm install earthquake-turkey
```

## Örnek Kullanım:
```js
const quake = require('earthquake-turkey')
const date = () => new Date()

console.log(date(), 'System opened!')

quake.earthquake.on('quake', (info) => {
    console.log(date(), info)
    /*
      {
          date: '2023.01.01 12:34:56',
          latitude: '12.3456',
          longitude: ' 78,9123',
          depth: '1.2',
          md: '1.2',
          ml: '1.2', -> The measurement is usually performed.
          mw: '1.2',
          place: '< LOCATION INFORMATION >',
          image: '< IMAGE URL >',
          location: '< LOCATION URL >',
      }
    */
})

setTimeout(async () => {
    const all = await quake.earthquakes({ count: 1 })
    console.log('this is latest quake:', all[0])

    const min3_8 = await quake.earthquakes.get({ minimum: 3.8, count: 2 })
    console.log('the latest earthquake of 3.8 and above:', min3_8)
}, 2000);
```

[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

## Geri Bildirim

Herhangi bir geri bildiriminiz varsa, lütfen me@cihatksm.com adresinden bana ulaşın.