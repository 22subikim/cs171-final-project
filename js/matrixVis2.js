class MatrixVis2 {
  constructor(parentElement) {
    this.parentElement = parentElement;

    this.rowStep = 40;

    this.r = 10;
    this.defaultData = [
      {
        color: "#ccc",
        number: 100,
      },
    ];

    this.showData = [];

    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };
    vis.width =
      document.getElementById(vis.parentElement).getBoundingClientRect().width -
      vis.margin.left -
      vis.margin.right;
    vis.height = vis.width;

    vis.svg = d3
      .select("#" + vis.parentElement)
      .append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .attr("viewBox", "0 0 400 400")
      .append("g")
      .attr("transform", `translate (${vis.margin.left}, ${vis.margin.top})`);

    vis.group = vis.svg
      .selectAll(".row-group")
      .data(d3.range(10))
      .join("g")
      .attr("class", "row-group")
      .attr("transform", (d, i) => {
        return `translate(0,${i * vis.rowStep})`;
      });

    vis.group
      .selectAll(".myCircle")
      .data(d3.range(10))
      .join("circle")
      .attr("class", "myCircle")
      .attr("cx", (d, i) => vis.rowStep * i)
      .attr("cy", 10)
      .attr("r", vis.r);

    this.wrangleData();
  }
  wrangleData() {
    this.showData = this.defaultData;
    this.updateVis();
  }

  updateVis() {
    let vis = this;
    d3.selectAll(".myCircle")
      .transition()
      .duration(500)
      .attr("fill", (d, i) => {
        if (i < this.showData[0].number) {
          return this.showData[0].color;
        } else if (i < this.showData[1].number) {
          return this.showData[1].color;
        } else if (i < this.showData[2].number) {
          return this.showData[2].color;
        }
      });
  }
  /**
   *
   * @param {[{color:'',number:0}]} data
   *
   */

  selectCategory(data) {
    this.showData = data;
    this.updateVis();
  }
}
