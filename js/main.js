/* * * * * * * * * * * * * *
 *           MAIN           *
 * * * * * * * * * * * * * */

// init global variables & switches
let myMapVis;
let myClockVis = new ClockVis("clockDiv");

let selectedTimeRange = [];

// load data using promises
let promises = [
    // d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),  // not projected -> you need to do it
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"), // already projected -> you can just scale it to fit your browser window
    d3.csv("data/USCSTrendMap.csv"),
    d3.csv("data/SurvivalByStage.csv"),
    d3.csv("data/Prevalence.csv"),
];

let lintVis;
// initMainPage
function initMainPage(dataArray) {
    // log data
    // console.log('check out the data', dataArray);

    // TODO - init map
    myMapVis = new MapVis("mapDiv", dataArray[0], dataArray[1]);
    myBarVis = new BarVis("barDiv", dataArray[2]);
    myCircleVis = new CircleVis("circleDiv");
    myRectVis = new RectVis("rectDiv");
    myRadarVis = new RadarVis('radarDiv', dataArray[3]);

    lintVis = new LineVis("line-chart");

    AOS.init();
}

let selectedCategory = document.getElementById("categorySelector").value;

function categoryChange() {
    selectedCategory = document.getElementById("categorySelector").value;
    myMatrixVis.wrangleData();
}

let myMatrixVis = new MatrixVis("matrixDiv");

function RedrawLine() {
    lintVis.RedrawLine();
}

function Actual() {
    const data = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 200, 300, 1500, 3000, 5000, 12000, 18000,
        27000, 54000, 108000,
    ];
    lintVis.Actual(data);
}

function selectImg(str) {
    if (str == "boy") {
        d3.select(".choose-boy").classed("active", true);
        d3.select(".choose-girl").classed("active", false);
    } else {
        d3.select(".choose-boy").classed("active", false);
        d3.select(".choose-girl").classed("active", true);
    }

    d3.selectAll(".sex-show").attr("src", (d, i) => {
        return `./image/${str}-${i * 10}.png`;
    });
}

function clickShowWord(str) {
    if (str == "yes") {
        d3.select(".showYes").style("opacity", "1");
        d3.select(".showNo").style("opacity", "0");
    } else {
        d3.select(".showYes").style("opacity", "0");
        d3.select(".showNo").style("opacity", "1");
    }

    setTimeout(() => {
        d3.select(".haveCancer").style("opacity", "1");
        d3.select(".operation-box").style("display", "block");

        AOS.init();
    }, 1000);
}

function loadingPage() {
    const selectBoy = d3.select(".choose-boy").classed("active");
    const selectGirl = d3.select(".choose-girl").classed("active");

    if (!(selectBoy || selectGirl)) {
        alert("Please select male or female by the image");
        return;
    }

    d3.select(".cover").style("left", 0);

    d3.select(".text-box").html("Downloading");

    setTimeout(() => {
        d3.select(".information-wrapper").style("display", "block");
        d3.select(".cover").style("display", "none");
        d3.select(".text-box").html("Downloaded");

        Promise.all(promises)
            .then(function (data) {
                initMainPage(data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, 5000);
}
