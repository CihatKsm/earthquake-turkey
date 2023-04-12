const quake = require('./earthquake')
const date = () => new Date()

console.log(date(), 'System opened!')

quake.earthquake.on('quake', (info) => {
    console.log(date(), info)
})

setTimeout(async () => {
    const all = await quake.earthquakes({ count: 3 })
    //console.log(all)
}, 1000);