// // @TODO: YOUR CODE HERE!
// poverty vs smokes
var svgWidth = 960;
var svgHeight = 500;

var margin = {
 top: 20,
 right: 40,
 bottom: 60,
 left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
 .append("svg")
 .attr("width", svgWidth)
 .attr("height", svgHeight);

var chartGroup = svg.append("g")
 .attr("transform", `translate(${margin.left}, ${margin.top})`);

// function stateCircles(circlesGroup)

// Import Data
d3.csv("/assets/data/data.csv")
 .then(function(smokeData) {

   // Step 1: Parse Data/Cast as numbers
   // ==============================
   smokeData.forEach(function(data) {
     data.poverty = +data.poverty;
     data.smokes = +data.smokes;
     abbr = data.abbr;
     state = data.state
   });

   // Step 2: Create scale functions
   // ==============================
   var xLinearScale = d3.scaleLinear()
     .domain([8.5, d3.max(smokeData, d => d.poverty)])
     .range([0, width]);

   var yLinearScale = d3.scaleLinear()
     .domain([8, d3.max(smokeData, d => d.smokes)])
     .range([height, 0]);

   // Step 3: Create axis functions
   // ==============================
   var bottomAxis = d3.axisBottom(xLinearScale);
   var leftAxis = d3.axisLeft(yLinearScale);

   // Step 4: Append Axes to the chart
   // ==============================
   chartGroup.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(bottomAxis);

   chartGroup.append("g")
     .call(leftAxis);

   // Step 5: Create Circles
   // ==============================
   var circlesGroup = chartGroup.selectAll("circle")
    .data(smokeData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

   var text = chartGroup.append('g').selectAll("text")
    .data(smokeData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.smokes))
    .text(d=>d.abbr)
    // .attr(".aText");
    .attr("transform", "translate(-10, 5)");

   // Step 6: Initialize tool tip
   // ==============================
   var toolTip = d3.tip()
     .attr("class", "tooltip")
     .offset([25, 0])
     .html(function(d) {
       return (`${d.abbr}`);
     });

   // Step 7: Create tooltip in the chart
   // ==============================
   chartGroup.call(toolTip);

   // Step 8: Create event listeners to display and hide the tooltip
   // ==============================
   circlesGroup.on("mouseon", function(data) {
     toolTip.show(data, this);
   })
     // onmouseout event
     .on("mouseout", function(data, index) {
       toolTip.hide(data);
     });

   // Create axes labels
   chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Smoking Rate (%)");

   chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
     .attr("class", "axisText")
     .text("Poverty Rate (%)");
 });

// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select(".chart")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params
// var chosenXAxis = "poverty";

// // function used for updating x-scale var upon click on axis label
// function xScale(smokeData, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(smokeData, d => d[chosenXAxis]) * 0.8,
//       d3.max(smokeData, d => d[chosenXAxis]) * 1.2
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXaxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

//   return circlesGroup;
// }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//   if (chosenXAxis === "poverty") {
//     var label = "Poverty Rate %: ";
//   }
//   else {
//     var label = "# of Albums:";
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }

// // Retrieve data from the CSV file and execute everything below
// d3.csv("/assets/data/data.csv")
//  .then(function(smokeData) {
//   if (err) throw err;

//   // parse data
//   smokeData.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.smokes = +data.smokes;
//     abbr = data.abbr;
//     state = data.state
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(smokeData, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(smokeData, d => d.num_hits)])
//     .range([height, 0]);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(smokeData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.num_hits))
//     .attr("r", 20)
//     .attr("fill", "pink")
//     .attr("opacity", ".5");

//   // Create group for  2 x- axis labels
//   var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   var hairLengthLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "hair_length") // value to grab for event listener
//     .classed("active", true)
//     .text("Hair Metal Ban Hair Length (inches)");

//   var albumsLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "num_albums") // value to grab for event listener
//     .classed("inactive", true)
//     .text("# of Albums Released");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Number of Billboard 500 Hits");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXaxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(smokeData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "num_albums") {
//           albumsLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           hairLengthLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           albumsLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           hairLengthLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// });
