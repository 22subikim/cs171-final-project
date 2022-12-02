/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */

class MapVis {

    constructor(parentElement, geoData, covidData){
        this.parentElement = parentElement;
        this.geoData = geoData;
        this.covidData = covidData;
        this.displayData = [];

        // parse date method
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 100, bottom: 20, left: 100};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        // document.getElementById(vis.parentElement).style.height =
        //     (vis.width * 610) / 970 + 50 + "px";
        vis.height = (vis.width * 610) / 970;
        // vis.width = 600
        // vis.height = 1000
        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title')
            .attr('id', 'map-title')
            .append('text')
            .text('Cancer Map')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        vis.usa = topojson.feature(vis.geoData, vis.geoData.objects.states).features

        vis.path = d3.geoPath()

        vis.viewpoint = {'width': 975, 'height': 610};
        vis.zoom = vis.width / vis.viewpoint.width;

        vis.map = vis.svg.append('g')
            .attr('transform',`scale(${vis.zoom} ${vis.zoom})`)

        vis.states = vis.map.selectAll(".states")
            .data(vis.usa)
            .enter()
            .append('path')
            .attr('class','states')
            .attr('stroke','')
            .attr('fill','transparent')
            .attr('d',(d) => vis.path(d))

        vis.colorScale = d3.scaleLinear()
            .range(["#FFFFFF", "#5B4A3F"])

        vis.xScale = d3.scaleLinear()
            .range([0,vis.width/4])

        vis.xAxis = d3.axisBottom()
            .scale(vis.xScale)
            .ticks(3)

        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(${vis.width/2}, ${vis.height-25})`)

        vis.legend = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.width/2}, ${vis.height-20})`)

        vis.linearGradient = vis.legend.append('defs').append('linearGradient')
            .attr('id', "grad3")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")

        vis.linearGradient.append('stop')
            .attr("offset", "0%")
            .style("stop-color", "#ffffff")
            .style("stop-opacity", "1")

        vis.linearGradient.append('stop')
            .attr("offset", "100%")
            .style("stop-color", "#5B4A3F")
            .style("stop-opacity", "1")

        vis.legend
            .append('rect')
            .attr('width', vis.width / 4)
            .attr('height', 15)
            .attr('x', 0)
            .attr('y', -20)
            .attr('fill', "url(#grad3)")

        vis.tooltip = d3.select('body').append('div')
            .attr('class','tooltip')
            .attr('id','mapTooltip')

        vis.selectedYear = '2019';

        this.createSlider()
        this.wrangleData()
    }

    wrangleData() {
        let vis = this

        vis.filteredData = [];

        vis.covidData.forEach(row => {
            if (row['Year'] == vis.selectedYear) {
                vis.filteredData.push(
                    {
                        year: row['Year'],
                        area: row['Area'],
                        caseCount: +row['Case Count'],
                        population: +row['Population'],
                        relative: +row['Case Count']/+row['Population'] * 100
                    }
                )
            }
        })

        vis.updateVis()
    }

    updateVis() {
        let vis = this

        vis.colorScale
            .domain([0,d3.max(vis.filteredData, d=>d['relative'])])
        // console.log(d3.max(vis.filteredData, d=>d['relative']))

        vis.xScale
            .domain([0,d3.max(vis.filteredData, d=>d['relative'])])

        vis.states.attr('fill', function(d,i) {
            let assignColor = ''
            vis.filteredData.forEach(state => {
                if (state['area'] === d.properties.name) {
                    if (state['population'] == 0) {
                        assignColor = 'url(#circles-6)'
                    }
                    else {
                        assignColor = vis.colorScale(state['relative'])
                    }

                }

            })
            // console.log(assignColor)
            return assignColor
        })

        vis.states.on('mouseover', function(event,d) {
            vis.filteredData.forEach(state => {
                if (state['area'] == d.properties.name) {
                    vis.year = state['year']
                    vis.area = state['area']
                    vis.caseCount = state['caseCount']
                    vis.population = state['population']
                    vis.relative = state.relative.toFixed(2).toString() + '%'
                }
            })
            d3.select(this)
                .attr('stroke-width', '1px')
                .style('fill', 'gray')
            vis.tooltip
                .style("opacity", 1)
                .style("left", event.pageX + 20 + "px")
                .style("top", event.pageY + "px")
                .html(`
                        <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                         <h3>${d.properties.name}</h3>
                         <h4>Year: ${vis.year}<h4>
                         <h4>Case Count: ${vis.caseCount}</h4>
                         <h4>Population: ${vis.population}</h4>
                         <h4>Relative Case Count: ${vis.relative}</h4>
                     </div>`);})
            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '1px')
                    .attr('stroke','')
                    .style('fill', function(d,i) {
                    let assignColor = ''
                    vis.filteredData.forEach(state => {
                        if (state['area'] === d.properties.name) {
                            assignColor = vis.colorScale(state['relative'])
                        }
                    })
                    return assignColor

                })


                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })

        vis.svg.select(".x-axis").call(vis.xAxis);

    }

    createSlider() {
        let vis = this;

        let minVal = d3.min(vis.covidData, d => +d['Year']);
        let maxVal = d3.max(vis.covidData, d => +d['Year']);

        var slider = document.getElementById('year-slider');

        noUiSlider.create(slider, {
            start: [maxVal],
            tooltips: [true],
            connect: true,
            range: {
                'min': parseFloat(minVal),
                'max': parseFloat(maxVal)
            },
            // Source to get int values: https://stackoverflow.com/questions/31631816/nouislider-tooltip-only-show-integers
            format: {
                from: function(value) {
                    return parseInt(value);
                },
                to: function(value) {
                    return parseInt(value);
                }
            }
        });

        slider.noUiSlider.on("slide", function(values, handle) {
            vis.selectedYear = values[0]

            vis.wrangleData();
        })
    }
}