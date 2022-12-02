class LineVis {
    constructor(el) {
        this.el = el;
        this.data = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 200, 300, 1500, 3000, 5000, 12000,
            18000, 27000, 54000, 108000,
        ];

        this.originData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 200];

        this.aciveData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 200];

        this.drawLineData = {};

        this.index = 0;

        this.initVis();
    }

    initVis() {
        const vis = this;

        this.margin = {
            top: 10,
            left: 100,
            right: 100,
            bottom: 50,
        };

        vis.width =
            document.getElementById(vis.el).getBoundingClientRect().width -
            vis.margin.left -
            vis.margin.right;
        vis.height =
            document.getElementById(vis.el).getBoundingClientRect().height -
            vis.margin.top -
            vis.margin.bottom;

        vis.svg = d3
            .select("#" + vis.el)
            .append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr("viewbox", "0 0 400 400")
            .attr("color", "#88765E")
            .style("cursor", "crosshair")
            .style("user-select", "none");

        vis.group = vis.svg
            .append("g")
            .attr("transform", `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.xScale = d3
            .scaleLinear()
            .domain(d3.extent(d3.range(vis.data.length).map((d) => d + 1)))
            .range([0, vis.width])
            .nice();

        vis.yScale = d3
            .scaleLinear()
            .domain([0, d3.max(vis.data)])
            .range([vis.height, 0])
            .nice();

        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);

        vis.group
            .append("g")
            .attr("transform", `translate(0,${vis.height})`)
            .call(vis.xAxis);

        vis.group.append("g").call(vis.yAxis);

        this.group.append("path").attr("class", "myPath");

        const drawLine = d3
            .line()
            .x((d) => d[0])
            .y((d) => d[1]);

        this.svg
            .on("mousedown", function () {
                vis.drawLineData["line" + vis.index] = [];

                d3.select(this).on("mousemove", (event) => {
                    if (
                        event.offsetX - vis.margin.left < 0 ||
                        event.offsetY - vis.margin.top < 0 ||
                        event.offsetX - vis.margin.left > vis.width ||
                        event.offsetY - vis.margin.top > vis.height
                    )
                        return;
                    const m = [
                        event.offsetX - vis.margin.left,
                        event.offsetY - vis.margin.top,
                    ];
                    vis.drawLineData["line" + vis.index].push(m);

                    vis.group
                        .append("path")
                        .attr("class", "drawLine")
                        .attr("d", drawLine(vis.drawLineData["line" + vis.index]))
                        .attr("fill", "none")
                        .attr("stroke-dasharray", "5 2")
                        .attr("stroke", "#88765E");
                });
            })
            .on("mouseup", function () {
                d3.select(this).on("mousemove", null);
                vis.index++;
            });

        this.wrangleData();
    }

    wrangleData() {
        this.updateVis();
    }

    updateVis() {
        const line = d3
            .line()
            .curve(d3.curveBasis)
            .y((d) => {
                return this.yScale(d);
            })
            .x((d, i) => this.xScale(i + 1));

        this.group
            .select(".myPath")
            .attr("d", line(this.aciveData))
            .attr("fill", "none")
            .attr("stroke", "#88765E");
    }

    Actual(data) {
        this.aciveData = data;
        this.wrangleData();
    }

    RedrawLine() {
        d3.selectAll(".drawLine").remove();
        this.index = 0;

        this.aciveData = this.originData;
        this.wrangleData();
    }

    mousedown(vis) {}

    mousemove() {}
}
