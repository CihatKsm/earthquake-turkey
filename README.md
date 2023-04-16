#### Modül İndirme:

```bash
  npm install earthquake-turkey
```

#### Bildirim Almak İçin Örnek Kullanım:
```js
const quake = require('earthquake-turkey')
const date = () => new Date()

console.log(date(), 'System opened!')

quake.earthquake.on('quake', object => {
    console.log(date(), 'Yeni bir deprem oldu!', object)
})
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
}
```
#### Doğrudan Veri Almak İçin Örnek Kullanım:

| Seçenek | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `minimum` | `number` | Minimum büyüklükteki depremleri gösterir. Varsayılan: 0 ve üzeri. |
| `count`   | `number` | Gösterilecek deprem sayısı. Varsayılan: 20 tane. |
| `controlled` | `number` | Kontrol edilecek deprem sayısı. Varsayılan: 20 tane. |

```js
const quake = require('earthquake-turkey')
const date = () => new Date()

console.log(date(), 'System opened!')

setTimeout(async () => {
    const all = await quake.earthquakes({ count: 3 })
    console.log('here are the past 3 earthquakes:', all)
}, 2000);
```

#### Örnek Çıktı:
```json
  [{...}, {...}, {...}]
```

#### Lisans
[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

#### Geri Bildirim

**E-posta:** me@cihatksm.com adresinden bana ulaşın.

#### Bilgi
    
[Kandillii Rasathanesi Ve Deprem Araştırma Enstitüsü, Bölgesel Deprem-Tsunami İzleme Ve Değerlendirme Merkezi](https://www.koeri.boun.edu.tr/) tarafından sunulan bilgileri içermektedir.
<br>
Herhangi bir sorun teşkil ediyorsa, problem oluşturuyorsa ya da oluşturduysa önce tarafıma bilgi verilmesi rica olunur.
