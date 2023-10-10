let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function dropdownmenu() {
    // Use D3 to select the dropdown menu
    let dropdownmenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
        console.log(data);
// Create an array of just the names from the data
let names = data.names
console.log(names);
names.forEach((sample) => {
    dropdownmenu
        .append("option")
        .text(sample)
        .property("value", sample);
});
metatable(names[0])
charts(names[0])
      }); 
}
dropdownmenu()
// looping through the data of each id#
function metatable(sample) {
    let tabletag = d3.select("#sample-metadata");
    d3.json(url).then((data) => {
        console.log(data);
let metadata = data.metadata
let metaarray = metadata.filter(number => number.id == sample)[0];
tabletag.html("")
Object.entries(metaarray).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value);
    tabletag
        .append("h5")
        //provide the index position of the array.
        .text(`${key}: ${value}`)
  });
      }); 
}
function optionChanged(sample){
    metatable(sample) 
    charts(sample)
}
//creating charts
//populating the charts on basis of id selected from drop down menu
function charts(sample) {
    d3.json(url).then((data) => {
        console.log(data);
let samplesdata = data.samples
let samplesarray = samplesdata.filter(number => number.id == sample)[0];

let otu_ids = samplesarray.otu_ids
let otu_labels = samplesarray.otu_labels
let sample_values = samplesarray.sample_values

//creating bubble chart
var bubbledata = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      colorscale: "Earth",
      size: sample_values
    }
  }];
  
  var bubblelayout = {
    title: 'bubblechart',
    showlegend: false,
  };
  
  Plotly.newPlot('bubble',bubbledata, bubblelayout);
  //creating bar chart
  var bardata = [{
    x: sample_values.slice(0,10).reverse(),
    //provide the index position of the array.
    y: otu_ids.slice(0,10).map(item => `otu ${item}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    orientation: 'h',
    type: 'bar'
  }]; 
  var barlayout = {
    title: 'Colored Bar Chart',
  };
 
  Plotly.newPlot('bar', bardata, barlayout);
      }); 
}