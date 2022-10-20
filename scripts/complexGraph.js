
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/sunburst

let totalValue=0
let dataSorted
let partition = data => {

  
  const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
  return d3.partition()
    .size([2 * Math.PI, root.height + 1])
    (root);

}



let format = d3.format(",d");

let width = 900;

let radius = width / 6;

let arc = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
  .padRadius(radius * 1.5)
  .innerRadius(d => d.y0 * radius)
  .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));



let secondArc = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
  .padRadius(radius * 1.5)
  .innerRadius(d => d.y0 * radius)
  .outerRadius(d => {
    let height = Math.max(d.y0 * radius, d.y1 * radius - 1)

    let isChild = d.value <= 100
    let realheight = 0
    console.log(isChild)

    //verifica si tiene hijos
    if (isChild) {

      let percentageLeft = 100 - d.value
      realheight = 155 * percentageLeft / 100


    } else {

      totalValue+=d.value
      console.log(d)
      

      let childNumber = d.data.children.length * 100
      console.log(childNumber)
      let percentageLeft = childNumber - d.value
      realheight = 155 * percentageLeft / childNumber
      // console.log(d)
      // console.log(realheight)
    }

    console.log(totalValue)
    return height - realheight
  });


const colorScale =

  d3.scaleOrdinal()
    .domain(["Procesos", "Gobernanza", "Organigrama"])
    .range(["#0064EF", "blue", "green"])


function chartZoom(data) {
  
  //d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length+1))
  color = colorScale
  const root = partition(data);

  console.log(root.data)

  root.data.children.forEach((child,i)=>{

    let value=0
      child.children.forEach((item)=>{

        value+=item.value
      })

      console.log(value)

      let tempChild = child
      tempChild.value=value
      root.data.children[i]=tempChild

    console.log(child)
  })

  console.log(root.data.children)

 
  dataSorted=root.data.children.sort((a,b)=>{

    return b.value -a.value
  })
  console.log(dataSorted)
  root.each(d => d.current = d);

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, width])
    .style("font", "16px sans-serif")
    .style("font-weigth","bold")
    .style("fill","#fff");



  const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${width / 2})`);

  const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
    .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

    .attr("d", d => arc(d.current));

  path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);



  path.append("title")
  .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`
  )
  .style('fill', 'darkOrange');
  //.text(d => console.log(d.ancestors().length > 2))

  const secondPath = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
    .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

    .attr("d", d => secondArc(d.current));

    secondPath.append("title")
   .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  secondPath.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);



  const label = g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", d => +labelVisible(d.current))
    .attr("transform", d => labelTransform(d.current))
    .text(d => d.data.name)

  const parent = g.append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

  function clicked(event, p) {
    parent.datum(p.parent || root);

    root.each(
      (d) => {
        return (d.target = {
          x0:
            Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          x1:
            Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth),
          value: d.value
        })
      }
    );

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
      .tween("data", d => {
        const i = d3.interpolate(d.current, d.target);
        return t => d.current = i(t);
      })
      .filter(function (d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
      .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")

      .attrTween("d", d => () => arc(d.current));


    secondPath.transition(t)
      .tween("data", d => {
        
        const i = d3.interpolate(d.current, d.target);
  
        return t => d.current = i(t);
       
      })
      .filter(function (d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
      .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")

      .attrTween("d", d => () => {
          console.log(d)
        return secondArc(d.current)}
        
        
        );

    label.filter(function (d) {
      return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t)
      .attr("fill-opacity", d => +labelVisible(d.target))
      .attrTween("transform", d => () => labelTransform(d.current));
  }

  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  return svg.node();
}


let chartDOM = document.querySelector("#chart");

let dataFinal;

fetch("./data/data.json")
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    dataFinal = data;

    chart = chartZoom(dataFinal)

    // console.log(chart)

    chartDOM.append(chart);
  });

