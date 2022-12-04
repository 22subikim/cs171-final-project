// Reference for stage definition: https://www.cancer.gov/publications/dictionaries/cancer-terms/
class BarVis {
    constructor(parentElement, cancerData){
        this.parentElement = parentElement;
        this.cancerData = cancerData;
        this.displayData = [];

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'barTooltip')

        // scales and axes
        vis.xScale = d3.scaleBand()
            .range([0,vis.width])
            .padding(0.1)
            .round(true)

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0])

        vis.xAxis = d3.axisBottom()
            .scale(vis.xScale)

        vis.yAxis = d3.axisLeft()
            .scale(vis.yScale);

        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.height})`);

        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'axis y-axis')

        vis.colorScale = d3.scaleSequential()
            .interpolator(d3.interpolateRgb("#FFFFFF", "#88765E"))

        vis.updateVis();
    }

    updateVis(){
        let vis = this;

        vis.xScale
            .domain(vis.cancerData.map(d => d['Stage']))

        vis.yScale
            .domain([0, d3.max(vis.cancerData, d => d['SurvivalRate'])])

        vis.colorScale
            .domain([0,d3.max(vis.cancerData,d=>d['SurvivalRate'])])

        let rect = vis.svg.selectAll('.rect')
            .data(vis.cancerData)

        rect.exit().remove()

        rect.enter()
            .append('rect')
            .merge(rect)
            .style('fill', function(d,i) {
                return vis.colorScale(d['SurvivalRate'])
            })
            .attr('stroke','')
            .attr('stroke-width', '1px')
            .attr('class','rect')
            .attr('height',d=>vis.height - vis.yScale(d['SurvivalRate']))
            .attr('width',vis.xScale.bandwidth())
            .attr('x',d=>vis.xScale(d['Stage']))
            .attr('y',d=>vis.yScale(d['SurvivalRate']))
            .on('mouseover', function(event,d) {
                d3.select(this)
                    .attr('stroke','')
                    .attr('stroke-width', '1px')
                    .style('fill', 'gray')
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                        <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                         <h3>${d['Stage']}</h3>
                         <h4>Survival Rate: ${d['SurvivalRate'] + '%'}<h4>
                         <h4>Definition: ${d['Definition']}<h4>
                     </div>`);})
            .on('mouseout', function(event, d){
                d3.select(this)
                    .style("fill", function(d,i) {
                        return vis.colorScale(d['SurvivalRate'])
                    })
                    .attr('stroke','')
                    .attr('stroke-width', '1px')


                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })

        vis.svg.select(".x-axis").call(vis.xAxis);
        vis.svg.select(".y-axis").call(vis.yAxis);
    }
}