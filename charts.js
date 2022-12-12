function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log("data" , data);

    // Deliverable 1: 3. Create a letiable that holds the samples array. 
    let samples = data.samples;
    // console.log("metadata" , metadata)

    // Deliverable 1: 4. Create a letiable that filters the samples for the object with the desired sample number.
    let resultArray = samples.filter(sampleObj => sampleObj.id === sample);
    // console.log("result array" , resultArray);

    // Deliverable 3: 1. Create a letiable that filters the metadata array for the object with the desired sample number.

    // Deliverable 1: 5. Create a letiable that holds the first sample in the array.
    let result = resultArray[0];
    console.log("result" , result)
    
    // Deliverable 3: 2. Create a letiable that holds the first sample in the metadata array.

    // Deliverable 1: 6. Create letiables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = result["otu_ids"];
    let otu_labels = result["otu_labels"];
    let sample_values = result["sample_values"];
    // console.log("sample_values" , sample_values)

    // Deliverable 3: 3. Create a letiable that holds the washing frequency.


    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    // Chain the slice() method with the map() and reverse() 
    // functions to retrieve the top 10 otu_ids sorted in descending order.
    
    let yticks = result["sample_values"].sort().reverse().slice(0,10)
      
      
    console.log("yticks" , yticks)
    

    // Deliverable 1: 8. Create the trace for the bar chart. 
    // let barData = [

    // ];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    // let barLayout = {

    // };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 

    // Deliverable 2: 1. Create the trace for the bubble chart.

    // Deliverable 2: 2. Create the layout for the bubble chart.

    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    
    // Deliverable 3: 4. Create the trace for the gauge chart.
    
    // Deliverable 3: 5. Create the layout for the gauge chart.

    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.

  });
}
