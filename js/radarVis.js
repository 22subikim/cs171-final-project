class RadarVis {

    // Referenced this tutorial for guidance: https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart

    constructor(parentElement, prevalenceData){
        this.parentElement = parentElement;
        this.prevalenceData = prevalenceData;
        this.displayData = prevalenceData.slice(0, 5);
        // console.log(this.displayData)

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        // vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        // vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        vis.width = 800
        vis.height = 800

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .append('text')
            .text('Bar Chart')
            .attr('transform', `translate(${vis.width / 2}, 0)`)
            .attr('text-anchor', 'middle');

        // draw circle for every 10 percent
        let percentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        vis.svg.selectAll('percentage-circles')
            .data(percentages)
            .enter()
            .append('circle')
            .attr('class', 'percentage-circles')
            .attr('cx', vis.width / 2)
            .attr('cy', vis.height / 2)
            .attr('r', d => d * 2)
            .attr('fill', 'none')
            .attr('stroke', 'black')

        vis.svg.selectAll('percentage-labels')
            .data(percentages)
            .enter()
            .append('text')
            .attr('class', 'percentage-labels')
            .attr('x', vis.width / 2)
            .attr('y', (d,i) => vis.height / 2 - 20 * i - 20)
            .attr('text-anchor', 'middle')
            .attr('font-size', 8)
            .text(d => d)

        // draw line for each data point
        vis.svg.selectAll('axis-lines')
            .data([0,1,2,3,4])
            .enter()
            .append('line')
            .attr('class', 'axis-lines')
            .attr('x1', vis.width / 2)
            .attr('y1', vis.height / 2)
            .attr('x2', (d, i) => 200 * Math.cos(2 * i * Math.PI / 5 - Math.PI / 3) + vis.width/2)
            .attr('y2', (d, i) => 200 * Math.sin(2 * i * Math.PI / 5 - Math.PI / 3) + vis.width/2)
            .style('stroke', 'black')
            .style('stroke-width', 2)

        vis.svg.selectAll('axis-labels')
            .data(vis.displayData)
            .enter()
            .append('text')
            .attr('class', 'axis-labels')
            .attr('x', (d,i) => 225 * Math.cos(2 * i * Math.PI / 5 - Math.PI / 3) + vis.width/2)
            .attr('y', (d,i) => 225 * Math.sin(2 * i * Math.PI / 5 - Math.PI / 3) + vis.width/2)
            .attr('text-anchor', (d,i) => {
                if (i < 3) {
                    return 'start'
                }
                else {
                    return 'end'
                }
            })
            .attr('font-size', 9)
            .text(d => `${d["Measure"]}: ${d["Age-Adjusted Prevalence"]}%`)

        // draw polygon
        let coords = []
        vis.displayData.forEach((d, i) => {
            let prevalenceDoubled = 2 * d["Age-Adjusted Prevalence"]
            coords.push({
                x: prevalenceDoubled *  Math.cos(2 * i * Math.PI / 5 - Math.PI / 3) + vis.width/2,
                y: prevalenceDoubled *  Math.sin(2 * i * Math.PI / 5 - Math.PI / 3) + vis.width/2
            })
        })

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveLinearClosed)

        vis.svg.append('path')
            .datum(coords)
            .attr('d', line)
            .attr('stroke', 'blue')
            .attr('stroke-width', 3)
            .attr('fill', 'green')
            .attr('opacity', 0.6)

    }
}