#### Bu modül KANDİLLİ RASATHANESİ VE DEPREM ARAŞTIRMA ENSTİTÜSÜ (KRDAE) BÖLGESEL DEPREM-TSUNAMİ İZLEME VE DEĞERLENDİRME MERKEZİ (BDTİM) tarafından sunulan bilgileri içermektedir. Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.

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