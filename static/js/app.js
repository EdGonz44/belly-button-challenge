// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);
    // get the metadata field
    const metadata = data.metadata;
    // console.log(metadata);
    const numSample = Number(sample);

    // Filter the metadata for the object with the desired sample number
    const filteredMD = metadata.find(d => d.id ===numSample);
    console.log(filteredMD);
    
    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select(`#sample-metadata`);
    
    // Use `.html("") to clear any existing metadata
    panel.html("");
    
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filteredMD).forEach(([key, value]) => {
      panel.append("p")
           .text(`${key}: ${value}`);
    });
  });
};


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;
    // console.log(samples);
    // Filter the samples for the object with the desired sample number
    const filteredSamples = samples.find(d => d.id === sample);
    console.log(filteredSamples);
    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = filteredSamples.otu_ids;
    const otu_labels = filteredSamples.otu_labels;
    const sample_values = filteredSamples.sample_values;

    // Build a Bubble Chart
    const traceBubble = {
      x: otu_ids,
      y: sample_values,
      test: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Jet'
      }
    };

    const layoutBubble = {
      title: 'Bacteria Cultures per Sample',
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'Number of Bacteria'}
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', [traceBubble], layoutBubble);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const barData = otu_ids.map((id, index) => ({
      otu_id: id,
      sample_value: sample_values[index],
      otu_label: otu_labels[index]
    }));
    
    barData.sort(function compareFunction(firstNum, secondNum) {
      return secondNum - firstNum;
    })

    const top10 = barData.slice(0,10);
    top10.reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const barX = top10.map(d => d.sample_value);
    const barY = top10.map(d => `OTU${d.otu_id}`);
    const barText = top10.map(d => d.otu_label);

    // Render the Bar Chart
    const traceBar = {
      x: barX,
      y: barY,
      text: barText,
      type: 'bar',
      orientation: 'h'
    };

    const layoutBar = {
      title: 'Top 10 OTUs Found',
      xaxis: { title: 'Sample Value' },
      yaxis: { title: 'OTU ID' }
    };
    
    Plotly.newPlot('bar', [traceBar], layoutBar);

  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((name) => {
      dropdownMenu.append("option")
                  .text(name)
                  .attr("value", name);
    });

    // Get the first sample from the list
    const firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
};
// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
};


// Initialize the dashboard
init();
