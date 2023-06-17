const { earthquake, earthquakes } = require('./earthquake');
const date = () => new Date();

console.log(date(), 'System opened!');

earthquake.on('quake', (info) => {
    console.log(date(), info)
})

const startTime = Date.now();
earthquakes({ minimum: 2, count: 20 }).then((quakes) => {
    const endTime = Date.now();
    console.log(date(), `It took ${endTime - startTime}ms to get the earthquake information.`)
    console.log(date(), quakes.length, quakes[0])
})

// setTimeout(async () => {
//     const quakes = await quake.earthquakes({ minimum: 3.5, count: 50, controlled: 500 });
//     console.log(date(), 'Here are the past 3 earthquakes:', quakes)
// }, 1000)