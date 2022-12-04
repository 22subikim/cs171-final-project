class RadarVis {

    // Referenced this tutorial for guidance: https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart

    constructor(parentElement, prevalenceData){
        this.parentElement = parentElement;
        this.prevalenceData = prevalenceData;
        this.displayData = this.prevalenceData;

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = 800
        vis.height = 800

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // draw circle for every 10 percent
        let percentages = [5, 10, 15, 20, 25, 30, 35, 40];
        vis.svg.selectAll('percentage-circles')
            .data(percentages)
            .enter()
            .append('circle')
            .attr('class', 'percentage-circles')
            .attr('cx', vis.width / 2)
            .attr('cy', vis.height / 2)
            .attr('r', d => d * 5)
            .attr('fill', 'none')
            .attr('stroke', '#88765E')

        vis.svg.selectAll('percentage-labels')
            .data(percentages)
            .enter()
            .append('text')
            .attr('class', 'percentage-labels')
            .attr('x', vis.width / 2)
            .attr('y', (d,i) => vis.height / 2 - d * 5 - 5)
            .attr('text-anchor', 'middle')
            .attr('font-size', 8)
            .style('fill', '#5B4A3F')
            .text(d => `${d}%`)

        // draw line for each data point
        vis.svg.selectAll('axis-lines')
            .data([...Array(vis.displayData.length).keys()])
            .enter()
            .append('line')
            .attr('class', 'axis-lines')
            .attr('x1', vis.width / 2)
            .attr('y1', vis.height / 2)
            .attr('x2', (d, i) => 200 * Math.cos(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2)
            .attr('y2', (d, i) => 200 * Math.sin(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2)
            .style('stroke', '#88765E')
            .style('stroke-width', 2)

        vis.svg.selectAll('axis-labels-measure')
            .data(vis.displayData)
            .enter()
            .append('text')
            .attr('class', 'axis-labels-measure')
            .attr('x', (d,i) => 220 * Math.cos(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2)
            .attr('y', (d,i) => 220 * Math.sin(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2)
            .attr('text-anchor', (d,i) => {
                if (i < vis.displayData.length / 2) {
                    return 'start'
                }
                else {
                    return 'end'
                }
            })
            .style('fill', '#5B4A3F')
            .style('font-size','10px')
            .text((d, i) => {
                if (i == vis.displayData.length - 1) {
                    return `${d["Measure"]}: ${d["Age-Adjusted Prevalence"]}%`
                }
                else {
                    return `${d["Measure"]}:`
                }
            })

        vis.svg.selectAll('axis-labels-percent')
            .data(vis.displayData)
            .enter()
            .append('text')
            .attr('class', 'axis-labels-percent')
            .attr('x', (d,i) => 220 * Math.cos(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2)
            .attr('y', (d,i) => 220 * Math.sin(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2 + 15)
            .attr('text-anchor', (d,i) => {
                if (i < vis.displayData.length / 2) {
                    return 'start'
                }
                else {
                    return 'end'
                }
            })
            .style('font-size','11px')
            .style('fill', '#5B4A3F')
            .text((d, i) => {
                if (i != vis.displayData.length - 1) {
                    return `${d["Age-Adjusted Prevalence"]}%`
                }
            })

        // draw polygon
        let coords = []
        vis.displayData.forEach((d, i) => {
            let prevalenceDoubled = 5 * d["Age-Adjusted Prevalence"]
            coords.push({
                x: prevalenceDoubled *  Math.cos(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2,
                y: prevalenceDoubled *  Math.sin(2 * i * Math.PI / vis.displayData.length - Math.PI / 6) + vis.width/2
            })
        })

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveLinearClosed)

        vis.svg.append('path')
            .datum(coords)
            .attr('d', line)
            .attr('stroke', '#D8C3A4')
            .attr('stroke-width', 3)
            .attr('fill', '#D8C3A4')
            .attr('opacity', 0.6)

    }
}