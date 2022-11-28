/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables & switches
let myMapVis

let selectedTimeRange = [];


// load data using promises
let promises = [

    // d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),  // not projected -> you need to do it
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"), // already projected -> you can just scale it to fit your browser window
    d3.csv("data/USCSTrendMap.csv"),
    d3.csv("data/SurvivalByStage.csv"),
    d3.csv("data/Prevalence.csv")
];

Promise.all(promises)
    .then(function (data) {
        initMainPage(data)
    })
    .catch(function (err) {
        console.log(err)
    });

// initMainPage
function initMainPage(dataArray) {

    // log data
    // console.log('check out the data', dataArray);

    // TODO - init map
    myMapVis = new MapVis('mapDiv', dataArray[0], dataArray[1]);
    myBarVis = new BarVis('barDiv', dataArray[2]);
    myCircleVis = new CircleVis('circleDiv')
    myRectVis = new RectVis('rectDiv')
    myMatrixVis = new MatrixVis('matrixDiv')
    myRadarVis = new RadarVis('radarDiv', dataArray[3])
    myClockVis = new ClockVis('clockDiv')
}

let selectedCategory =  document.getElementById('categorySelector').value;


function categoryChange() {
    selectedCategory =  document.getElementById('categorySelector').value;
    myMatrixVis.wrangleData();
}



