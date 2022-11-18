class CircleVis {

    constructor(parentElement){
        this.parentElement = parentElement;

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        // vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        vis.height = 500;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .append('text')
            .text('Circle Chart')
            .attr('transform', `translate(${vis.width / 2}, 0)`)
            .attr('text-anchor', 'middle');

        vis.svg.append('circle')
            .attr('cx',vis.width/2)
            .attr('cy',vis.height/2)
            .attr('stroke','black')
            .attr('stroke-width',3)
            .attr('fill','transparent')
            .attr('r',60)

        vis.svg.append('text')
            .data(vis.data)
            .attr('x',vis.width/2)
            .attr('y',vis.height/2)
            .text('Click to see </br>the related cancers')
            // .on('click', function)
    }
}