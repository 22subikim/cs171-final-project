class MatrixVis {

    constructor(parentElement){
        this.parentElement = parentElement;
        this.displayText = {
            'gender': 'Male: 52% Female 48%',
            'age': 'Across Age: >70 58%, 50-69 35%, 15-49 7%',
            'lowest': 'Prostrate death rate is the lowest: 3%',
            'highest': 'Liver death rate is the highest: 85%',
            'risk': 'Almost a quarter of all cancer death are due to smoking',
            'preventable': 'Between 30-50% of all cancer cases are preventable'}
        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        // vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        // vis.width = 600;
        vis.height = 400;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            // .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // vis.svg.append('g')
        //     .attr('class', 'title bar-title')
        //     .append('text')
        //     .text('Matrix Chart')
        //     .attr('transform', `translate(${vis.width / 2}, 0)`)
        //     .attr('text-anchor', 'middle');

        vis.wrangleData();

    }

    wrangleData() {
        let vis = this;
        vis.data = [...Array(100).keys()]

        vis.updateVis();
    }

    updateVis() {
        let vis = this;
        if (selectedCategory == 'gender') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(52).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 50)
                .attr('fill', '#5B4A3F')

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(48).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 320)
                .attr('fill', '#88765E')
            vis.background.exit().remove()


        }
        else if (selectedCategory == 'age') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(58).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 50)
                .attr('fill', '#5B4A3F')

            vis.middleAge = vis.svg.selectAll('.middleAge')
                .data([...Array(30).keys()])

            vis.middleAge.enter()
                .append('circle')
                .attr('class', 'middleAge')
                .merge(vis.middleAge)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 230)
                .attr('fill', '#E85A50')

            vis.middleAge2 = vis.svg.selectAll('.middleAge2')
                .data([...Array(2).keys()])

            vis.middleAge2.enter()
                .append('circle')
                .attr('class', 'middleAge2')
                .merge(vis.middleAge2)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 130)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 320)
                .attr('fill', '#E85A50')

            vis.middleAge3 = vis.svg.selectAll('.middleAge3')
                .data([...Array(2).keys()])

            vis.middleAge3.enter()
                .append('circle')
                .attr('class', 'middleAge3')
                .merge(vis.middleAge3)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 200)
                .attr('fill', '#E85A50')


            vis.background = vis.svg.selectAll('.background')
                .data([...Array(8).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 320)
                .attr('fill', '#88765E')

            vis.matrix.exit().remove()
            vis.background.exit().remove()
            vis.middleAge.exit().remove()
        }

        else if (selectedCategory == 'lowest') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(3).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 50)
                .attr('fill', '#5B4A3F')


            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(100-3).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 320)
                .attr('fill', 'white')

            vis.background.exit().remove()
        }

        else if (selectedCategory == 'highest') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(85).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 50)
                .attr('fill', '#5B4A3F')

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(100-85).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 320)
                .attr('fill','white')

            vis.background.exit().remove()
        }

        else if (selectedCategory == 'risk') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(25).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 50)
                .attr('fill', '#5B4A3F')


            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(75).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 320)
                .attr('fill', 'white')

            vis.background.exit().remove()
        }

        else if (selectedCategory == 'preventable') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(30).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 50)
                .attr('fill', '#5B4A3F')

            vis.matrix2 = vis.svg.selectAll('.matrix2-circles')
                .data([...Array(10).keys()])

            vis.matrix2.enter()
                .append('circle')
                .attr('class', 'matrix-circles2')
                .merge(vis.matrix2)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 140)
                .attr('opacity',0.6)
                .attr('fill', '#5B4A3F')

            vis.matrix3 = vis.svg.selectAll('.matrix3-circles')
                .data([...Array(10).keys()])

            vis.matrix3.enter()
                .append('circle')
                .attr('class', 'matrix-circles2')
                .merge(vis.matrix3)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 100)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 170)
                .attr('opacity',0.3)
                .attr('fill', '#5B4A3F')


            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(50).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 370)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 320)
                .attr('fill', 'white')

            vis.background.exit().remove()
        }
    }
}