class ClockVis {

    constructor(parentElement) {
        this.parentElement = parentElement;
        this.numDeaths = 609360;

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = 1000;
        vis.height = 1000;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add text
        vis.svg.append('text')
            .attr('class', 'h1-class')
            .attr('x', vis.width / 2)
            .attr('y', vis.height / 2 - 35)
            .attr('text-anchor', 'middle')
            .text('LIFE RESTARTER')

        vis.svg.append('text')
            .attr('class', 'p-class')
            .attr('x', vis.width / 2)
            .attr('y', vis.height / 2)
            .attr('text-anchor', 'middle')
            .text('Every 3 seconds, one person is killed by cancer')

        vis.numDeathsText = vis.svg.append('text')
            .attr('class', 'h2-class')
            .attr('x', vis.width / 2)
            .attr('y', vis.height / 2 + 30)
            .attr('text-anchor', 'middle')
            .text(`${vis.numDeaths} deaths in 2022 within the US`)

        // clock animation
        vis.clockGroup = vis.svg.append('g')
            .attr('class', 'clock-animation-group')
            .style('stroke', 'black')
            .style('stroke-width', 1.5)
            .style('opacity', 0.3)

        vis.clockGroup.selectAll('tick-lines')
            .data([...Array(60).keys()])
            .enter()
            .append('line')
            .attr('class', 'tick-lines')
            .attr('x1', (d, i) => {
                if (i % 5 == 0) {
                    return 0
                }
                return 275 * Math.cos(i * Math.PI / 30) + vis.width / 2
            })
            .attr('y1', (d, i) => {
                if (i % 5 == 0) {
                    return 0
                }
                return 275 * Math.sin(i * Math.PI / 30) + vis.height / 2
            })
            .attr('x2', (d, i) => {
                if (i % 5 == 0) {
                    return 0
                }
                return 300 * Math.cos(i * Math.PI / 30) + vis.width / 2
            })
            .attr('y2', (d, i) => {
                if (i % 5 == 0) {
                    return 0
                }
                return 300 * Math.sin(i * Math.PI / 30) + vis.height / 2
            })

        vis.clockGroup.append('line')
            .attr('class', 'second-hand')
            .attr('x1', vis.width / 2)
            .attr('y1', vis.height / 2)
            .attr('x2', 300 * Math.cos(-1 * Math.PI / 2) + vis.width / 2)
            .attr('y2', 300 * Math.cos(-1 * Math.PI / 2) + vis.height / 2)

        vis.clockGroup.append('line')
            .attr('class', 'minute-hand')
            .attr('x1', vis.width / 2)
            .attr('y1', vis.height / 2)
            .attr('x2', 200 * Math.cos(-1 * Math.PI / 2) + vis.width / 2)
            .attr('y2', 200 * Math.cos(-1 * Math.PI / 2) + vis.height / 2)

        vis.clockGroup.append('line')
            .attr('class', 'hour-hand')
            .attr('x1', vis.width / 2)
            .attr('y1', vis.height / 2)
            .attr('x2', 100 * Math.cos(-1 * Math.PI / 2) + vis.width / 2)
            .attr('y2', 100 * Math.cos(-1 * Math.PI / 2) + vis.height / 2)

        setInterval(vis.updateClockHands, 1000)
        setInterval(vis.updateNumDeaths.bind(this), 3000)

    }

    updateClockHands() {
        const date = new Date();
        date.toLocaleDateString('en-US', {timeZone: 'America/New_York'})
        let seconds = date.getSeconds()
        let minutes = date.getMinutes()
        let hours = (date.getHours() % 12)

        let secondHand = d3.select('.second-hand')
        secondHand
            .transition()
            .duration(1000)
            .attr('x2', 300 * Math.cos(seconds * Math.PI / 30 - Math.PI / 2) + 500)
            .attr('y2', 300 * Math.sin(seconds * Math.PI / 30 - Math.PI / 2) + 500)

        let minuteHand = d3.select('.minute-hand')
        minuteHand
            .transition()
            .duration(1000)
            .attr('x2', 200 * Math.cos(minutes * Math.PI / 30 - Math.PI / 2) + 500)
            .attr('y2', 200 * Math.sin(minutes * Math.PI / 30 - Math.PI / 2) + 500)

        let hourHand = d3.select('.hour-hand')
        hourHand
            .transition()
            .duration(1000)
            .attr('x2', 100 * Math.cos((hours + minutes / 60) * Math.PI / 6 - Math.PI / 2) + 500)
            .attr('y2', 100 * Math.sin((hours + minutes / 60) * Math.PI / 6 - Math.PI / 2) + 500)

    }

    updateNumDeaths() {
        let vis = this
        vis.numDeaths += 1
        vis.numDeathsText.text(`${vis.numDeaths} deaths in 2022 within the US`)
    }
}