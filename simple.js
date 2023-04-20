const quake = require('./earthquake')
const date = () => new Date()

console.log(date(), 'System opened!')

quake.earthquake.on('quake', (info) => {
    console.log(date(), info)
})

setTimeout(async () => {
    const quakes = await quake.earthquakes({ minimum: 3, count: 3, controlled: 40 });
    console.log(date(), 'here are the past 3 earthquakes:', quakes)
}, 1000)