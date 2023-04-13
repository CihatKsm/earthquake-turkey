const quake = require('./earthquake')
const date = () => new Date()

console.log(date(), 'System opened!')

quake.earthquake.on('quake', (info) => {
    console.log(date(), info)
})

quake.earthquakes({ minimum: 3, count: 3 }).then(all => {
    console.log(date(), 'here are the past 3 earthquakes:', all)
}).catch(err => {
    console.log(date(), 'error:', err)
})