const quake = require('./earthquake')
const date = () => new Date()

console.log(date(), 'System opened!')

quake.earthquake.on('quake', (info) => {
    console.log(date(), info)
})

setTimeout(async () => {
    const all = await quake.earthquakes({ count: 1 })
    //console.log('this is latest quake:', all[0])

    const min3_8 = await quake.earthquakes.get({ minimum: 3.8, count: 2 })
    //console.log('the latest earthquake of 3.8 and above:', min3_8)
}, 2000);