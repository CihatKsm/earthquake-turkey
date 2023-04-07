#### Kandi̇lli̇ Rasathanesi̇ Ve Deprem Araştirma Ensti̇tüsü, Bölgesel Deprem-Tsunami̇ İzleme Ve Değerlendi̇rme Merkezi̇ tarafından sunulan bilgileri içermektedir.

#### Modül İndirme:

```bash
  npm install earthquake-turkey
```

#### Örnek Kullanım:
```js
const quake = require('earthquake-turkey')
const date = () => new Date()

console.log(date(), 'System opened!')

//Eğer bir deprem olursa alttaki kod ile bunu görüntüleyebileceksiniz.
quake.earthquake.on('quake', (info) => {
    console.log(date(), info)
})

setTimeout(async () => {
    //Geçmiş depremlerin listesini alttaki kod ile görebilirsiniz.
    //count opsiyonu kaç adet veri görüntüleyeceğinizi yazabilirsiniz.
    const all = await quake.earthquakes({ count: 3 })
    console.log('here are the past 3 earthquakes:', all)

    /*
      minimum opsiyonu depremlerin şiddetini filtrelemek için kullanılır, 
      eğer 3 değeri verilirse 3 ve üzeri şiddette olan son depremler listelenir.
    */
    const min3_8 = await quake.earthquakes.get({ minimum: 3.8, count: 3 })
    console.log('the latest earthquake of 3.8 and above:', min3_8)
}, 2000);
```

#### Örnek Çıktı:
```json
{
    "date": "2023.01.01 12:34:56",
    "latitude": "12.3456",
    "longitude": "78.9123",
    "depth": "12.3",
    "ml": "1.2",
    "place": "<lokasyon>",
    "image": "<google-lokasyon-resim-linki>",
    "location": "<google-lokasyon-linki>"
}
```

[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

#### Geri Bildirim

**E-posta:** me@cihatksm.com adresinden bana ulaşın.
<small>
Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.
</small>