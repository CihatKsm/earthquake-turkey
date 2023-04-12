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
    /*
      earthquakes({ minimum: number; count: number; controlled: number; })
      @minimum — Minimum büyüklükteki depremleri gösterir. Varsayılan: 0 ve üzeri.
      @count — Gösterilecek deprem sayısı. Varsayılan: 20 tane.
      @controlled — Kontrollü depremleri gösterir. Varsayılan: 20 tane.
    */

    const all = await quake.earthquakes({ count: 3 })
    console.log('here are the past 3 earthquakes:', all)
}, 2000);
```

#### Örnek Çıktı:
```json
{
    "date": "2023.04.13 02:07:34",
    "latitude": "40.6332",
    "longitude": "29.1290",
    "depth": "10.8",
    "ml": "1.5",
    "place": "Hasanbaba, Hasanbaba Cd. 74, 77300 Çınarcık/Yalova",
    "coordinate": "40°37'59.5\"N 29°07'44.4\"E",
    "image": "https://maps.gstatic.com/tactile/pane/default_geocode-2x.png",
    "location": "https://www.google.com.tr/maps/place/40.6332,29.1290"
},
```

[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

#### Geri Bildirim

**E-posta:** me@cihatksm.com adresinden bana ulaşın.

#### Bilgi

<small>
Kandi̇lli̇ Rasathanesi̇ Ve Deprem Araştirma Ensti̇tüsü, Bölgesel Deprem-Tsunami̇ İzleme Ve Değerlendi̇rme Merkezi̇ tarafından sunulan bilgileri içermektedir.
<br>
Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.
</small>