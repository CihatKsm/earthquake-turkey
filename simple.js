const quake = require('./earthquake')
const date = () => new Date()

console.log(date(), 'System opened!')

quake.earthquake.on('quake', (info) => {
    console.log(date(), info)
})

setTimeout(async () => {
    const all = await quake.earthquakes({ count: 3 })
    //console.log(all)

    const min3_8 = await quake.earthquakes.get({ minimum: 3.8, count: 3 })
    //console.log('the latest earthquake of 3.8 and above:', min3_8)
}, 1000);