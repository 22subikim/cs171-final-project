class MatrixVis {

    constructor(parentElement){
        this.parentElement = parentElement;

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        // vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        // vis.width = 600;
        vis.height = 600;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .append('text')
            .text('Matrix Chart')
            .attr('transform', `translate(${vis.width / 2}, 0)`)
            .attr('text-anchor', 'middle');

        vis.wrangleData();

    }

    wrangleData() {
        let vis = this;
        vis.data = [...Array(100).keys()]

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        console.log(selectedCategory);

        vis.matrix = vis.svg.selectAll('.matrix-circles')
            .data(vis.data)

        vis.matrix.enter()
            .append('circle')
            .attr('class', 'matrix-circles')
            .merge(vis.matrix)
            .attr('r', 10)
            .attr('cx', (d,i) => (i % 10) * 30 + 350)
            .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', 'transparent')

        vis.matrix.exit().remove()
    }
}