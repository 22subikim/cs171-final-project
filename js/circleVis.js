class CircleVis {
    constructor(parentElement){
        this.parentElement = parentElement;

        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        // vis.width = 500 - vis.margin.left - vis.margin.right;
        // vis.height = 500 - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate(${vis.margin.left}, ${vis.margin.top})`)

        // vis.svg.append('g')
        //     .attr('class', 'title bar-title')
        //     .append('text')
        //     .text('Circle Chart')
        //     .attr('transform', `translate(${vis.width / 2}, 0)`)
        //     .attr('text-anchor', 'middle');

        vis.tooltip = d3.select('body').append('div')
            .attr('class','tooltip')
            .attr('id', 'circleVisTooltip')
            .style('width', vis.width / 4 + 'px')

        vis.svg.append('circle')
            .attr('cx',vis.width/2)
            .attr('cy',vis.height/2)
            .attr('stroke','#88765E')
            .attr('stroke-width',5)
            .attr('fill','transparent')
            .attr('r', 100)

        vis.svg.append('text')
            .attr('x',vis.width/2)
            .attr('y',vis.height/2 - 20)
            .attr('text-anchor', 'middle')
            .style('fill', '#5B4A3F')
            .text('Click the bubbles')
        vis.svg.append('text')
            .attr('x',vis.width/2)
            .attr('y',vis.height/2)
            .attr('text-anchor', 'middle')
            .style('fill', '#5B4A3F')
            .text('to see the')
        vis.svg.append('text')
            .attr('x',vis.width/2)
            .attr('y',vis.height/2 + 20)
            .attr('text-anchor', 'middle')
            .style('fill', '#5B4A3F')
            .text('related cancers')

        let factors = ['exposure to radiation', 'obesity', 'tobacco', 'alcohol', 'viral infections', 'specific chemicals']
        let descriptions = {
            'exposure to radiation': 'Solar radiation, UV radiation and use of UV-emitting tanning devices is carcinogenic to humans.',
            'obesity': 'Obesity causes long-lasting inflammation, higher levels of insulin, insulin-like growth factor, and sex hormones.',
            'tobacco': 'Smoke from cigarettes, cigars, and pipes has at least 70 chemicals that can cause cancer.',
            'alcohol': 'When you drink alcohol, your body breaks it down into acetaldehyde, which damages your DNA.',
            'viral infections': 'Some viruses insert their own DNA into the host cell, pushing the cell toward becoming cancer.',
            'specific chemicals': 'Some carcinogens cause cancer by changing a cell\'s DNA.'
        }
        let related_cancers = {
            'exposure to radiation': [],
            'obesity': ['breast cancer', 'uterine cancer', 'prostate cancer', 'pancreatic cancer', 'gallbladder cancer', 'thyroid cancer', 'colorectal cancer'],
            'tobacco': ['bladder', 'blood (acute myeloid leukemia)', 'cervix', 'colon and rectum', 'esophagus', 'kidney and renal pelvis', 'liver', 'lungs, bronchi, and trachea', 'mouth and throat'],
            'alcohol': ['head and neck cancers', 'liver cancer', 'esophageal cancer', 'breast cancer', 'colorectal cancer'],
            'viral infections': ['cervical cancer', 'anal cancer', 'Hodgkin\'s disease', 'lung cancer', 'cancers of the mouth and throat', 'liver cancer'],
            'specific chemicals': ['liver cancer', 'bladder', 'skin cancer', 'nasopharynx', 'lung cancer']
        }

        vis.svg.selectAll('.factor-circles')
            .data(factors)
            .enter()
            .append('circle')
            .attr('class', 'factor-circles')
            .attr('r', 80)
            .attr('cx', (d,i) => 300 * Math.cos(i * Math.PI / 3) + vis.width/2)
            .attr('cy', (d,i) => 300 * Math.sin(-1 * i * Math.PI / 3) + vis.height/2)
            .attr('stroke', '#88765E')
            .attr('stroke-width', 3)
            .attr('fill', '#88765E')
            .on('mouseover', function(event, d) {
                vis.tooltip
                    .style('opacity', 1)
                    .style('left', event.pageX + 40 + 'px')
                    .style('top', event.pageY - 40 + 'px')
                    .html(`
                            <div style="border: black; border-radius: 5px; background: #D8C3A4; padding:20px; text-align:left">
                                <p>${descriptions[d]}</p>
                            </div>`)
            })
            .on('mouseout', function(event, d) {
                vis.tooltip
                    .style('opacity', 0)
                    .style('left', 0)
                    .style('top', 0)
                    .html(``);
            })
            .on('click', function(event, d) {
                vis.mini_circles = vis.svg.selectAll('.factor-mini-circles')
                    .data(related_cancers[d])

                vis.mini_circles.enter()
                    .append('circle')
                    .attr('class', 'factor-mini-circles')
                    .merge(vis.mini_circles)
                    .style('opacity', 0)
                    .attr('r', 50)
                    .attr('cx', (d2, i2) => {
                        let i = factors.indexOf(d)
                        let factor_center_x = 300 * Math.cos(i * Math.PI / 3) + vis.width/2
                        let n = related_cancers[d].length
                        return 150 * Math.cos(i2 * Math.PI * 2 / n) + factor_center_x
                    })
                    .attr('cy', (d2, i2) => {
                        let i = factors.indexOf(d)
                        let factor_center_y = 300 * Math.sin(-1 * i * Math.PI / 3) + vis.height/2
                        let n = related_cancers[d].length
                        return 150 * Math.sin(-2 * i2 * Math.PI / n) + factor_center_y
                    })
                    .attr('stroke', '#D8C3A4')
                    .attr('stroke-width', 3)
                    .attr('fill', '#D8C3A4')
                    .transition()
                    .duration(1000)
                    .style('opacity', 1)

                vis.mini_circles.exit().remove()

                vis.mini_labels = vis.svg.selectAll('.factor-mini-labels')
                    .data(related_cancers[d])

                vis.mini_labels.enter()
                    .append('text')
                    .attr('class', 'factor-mini-labels')
                    .merge(vis.mini_labels)
                    .style('opacity', 0)
                    .attr('x', (d2, i2) => {
                        let i = factors.indexOf(d)
                        let factor_center_x = 300 * Math.cos(i * Math.PI / 3) + vis.width/2
                        let n = related_cancers[d].length
                        return 150 * Math.cos(i2 * Math.PI * 2 / n) + factor_center_x
                    })
                    .attr('y', (d2, i2) => {
                        let i = factors.indexOf(d)
                        let factor_center_y = 300 * Math.sin(-1 * i * Math.PI / 3) + vis.height/2
                        let n = related_cancers[d].length
                        return 150 * Math.sin(-2 * i2 * Math.PI / n) + factor_center_y
                    })
                    .attr('font-size', 12)
                    .attr('text-anchor', 'middle')
                    .text(d => d)
                    .transition()
                    .duration(3000)
                    .style('opacity', 1)

                vis.mini_labels.exit().remove()
            })

        vis.svg.selectAll('.factor-labels')
            .data(factors)
            .enter()
            .append('text')
            .attr('class', 'factor-labels')
            .attr('x', (d,i) => 300 * Math.cos(i * Math.PI / 3) + vis.width/2)
            .attr('y', (d,i) => 300 * Math.sin(-1 * i * Math.PI / 3) + vis.height/2)
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .text(d => d)

        vis.svg.selectAll('.factor-lines')
            .data(factors)
            .enter()
            .append('line')
            .attr('class', 'factor-lines')
            .attr('x1', (d,i) => vis.width/2 + 100 * Math.cos(i * Math.PI / 3))
            .attr('y1', (d,i) => vis.height/2 - 100 * Math.sin(i * Math.PI / 3))
            .attr('x2', (d,i) => 220 * Math.cos(i * Math.PI / 3) + vis.width/2)
            .attr('y2', (d,i) => 220 * Math.sin(-1 * i * Math.PI / 3) + vis.height/2)
            .style('stroke', '#88765E')
            .style('stroke-width', 2)

        vis.svg.selectAll('text')
            .attr('font-family', 'verdana')
    }
}