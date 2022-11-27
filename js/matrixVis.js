class MatrixVis {

    constructor(parentElement){
        this.parentElement = parentElement;
        this.displayText = {'gender': 'Male: 52% Female 48%',
                    'age70': 'Across Age: >70 58%',
                    'age50':'Across Age: 50-69 35%',
                    'age15':'Across Age: 15-49 7%',
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
        console.log(vis.data)

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
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'blue')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .text(vis.displayText[selectedCategory])


            vis.matrix.exit().remove()

            vis.pink = vis.svg.selectAll('.pink')
                .data([...Array(48).keys()])

            vis.pink.enter()
                .append('circle')
                .attr('class', 'pink')
                .merge(vis.pink)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'pink')

            vis.pink.exit().remove()


        }
        else if (selectedCategory == 'age70') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(58).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'saddlebrown')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .text(vis.displayText[selectedCategory])

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(100-58).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', '#5B4A3F')

            vis.background.exit().remove()
        }

        else if (selectedCategory == 'age50') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(35).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'saddlebrown')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .attr('x',460)
                .attr('y',100)
                .text(vis.displayText[selectedCategory])

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(100-35).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', '#5B4A3F')

            vis.background.exit().remove()
        }

        else if (selectedCategory == 'age15') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(7).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'saddlebrown')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .text(vis.displayText[selectedCategory])

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(100-7).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', '#5B4A3F')

            vis.background.exit().remove()
        }
        else if (selectedCategory == 'lowest') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(3).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'saddlebrown')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .text(vis.displayText[selectedCategory])

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(100-3).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', '#5B4A3F')

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
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'saddlebrown')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .text(vis.displayText[selectedCategory])

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(100-85).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', '#5B4A3F')

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
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'saddlebrown')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .text(vis.displayText[selectedCategory])

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(75).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', '#5B4A3F')

            vis.background.exit().remove()
        }

        else if (selectedCategory == 'preventable') {
            vis.matrix = vis.svg.selectAll('.matrix-circles')
                .data([...Array(50).keys()])

            vis.matrix.enter()
                .append('circle')
                .attr('class', 'matrix-circles')
                .merge(vis.matrix)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * 30 + 160)
                .attr('cy', (d,i) => Math.floor(i / 10) * 30 + 100)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'saddlebrown')

            vis.matrix.enter()
                .append('text')
                .merge(vis.matrix)
                .text(vis.displayText[selectedCategory])

            vis.matrix.exit().remove()

            vis.background = vis.svg.selectAll('.background')
                .data([...Array(50).keys()])

            vis.background.enter()
                .append('circle')
                .attr('class', 'background')
                .merge(vis.background)
                .attr('r', 10)
                .attr('cx', (d,i) => (i % 10) * -30 + 430)
                .attr('cy', (d,i) => Math.floor(i / 10) * -30 + 370)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', '#5B4A3F')

            vis.background.exit().remove()
        }
    }
}