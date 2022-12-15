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
    
    // Deliverable 1: 3. Create a variable that holds the samples array. 
    let samples = data.samples;
    let metadata = data.metadata;
    
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the 
    // desired sample number.
    let samplesArray = samples.filter(samplesObj => samplesObj.id === sample);
    
    // Deliverable 3: 1. Create a variable that filters the metadata array for 
    // the object with the desired sample number.
    let metadataArray = metadata.filter(metaObj => metaObj.id.toString() === sample);
    
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    let samplesObject = samplesArray[0];
    
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    let metadataObject = metadataArray[0];
    
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otuIDs = samplesObject["otu_ids"];
    let otuLabels = samplesObject["otu_labels"];
    let sampleValues = samplesObject["sample_values"];
    
    // Deliverable 3: 3. Create a variable that holds the washing frequency.
    let washFreq = metadataObject["wfreq"];
    
    // Deliverable 1: 7. Create the yticks for the bar chart.
    let yticks = otuIDs.slice(0,10).reverse().map(id => `OTU ${id}`);
    
    // Deliverable 1: 8. Create the trace for the bar chart. 
    let barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h",
      text: otuLabels.slice(0,10).reverse()
    }];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    let barLayout = { title: `Top Ten Bacteria Cultures Found`};

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    // Deliverable 2: 1. Create the trace for the bubble chart.
    let bubbleData = [{
      type: "scatter",
      mode: "markers",
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: 'Earth'
    }}];
    
    // Deliverable 2: 2. Create the layout for the bubble chart.
    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      hovermode:'closest',
      xaxis: {
        title: {text: "OTU ID"},
      }
    };
    
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    // Deliverable 3: 4. Create the trace for the gauge chart.
    var guageData = [
      {
        value: washFreq,
        title: '<b>Belly Button Wash Frequency</b> <br> Scrubs per Week',
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }
          ],
        }
      }
    ];
    
    // Deliverable 3: 5. Create the layout for the gauge chart.
    var guageLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    
    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", guageData, guageLayout);
  });
}
