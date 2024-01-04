const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then(function ({ names }) {
  names.forEach(id => {
    d3.select('select').append('option').text(id);
  });

  optionChanged(names[0]);
})
console.log(names);

//Create a function for charts
function optionChanged(id) {
  d3.json(url).then(({ metadata, samples }) => {

    // source for the format of the chart 
    let sample = samples.find(sample_element => sample_element.id == id)
    let { otu_ids, otu_labels, sample_values } = sample;
    
    let trace1 = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(x => "OTU" + x).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h',
      marker: {
        color: 'rgb(27, 161, 187)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };
    // Create layout
    let layout1 = {
      title: "Top 10 OTU",
    };

    // Create the Bar chart
    let data1 = [trace1];
    Plotly.newPlot("bar", data1, layout1);

    // Create the Bubble Chart
     trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        colorscale: "Earth",
        color: otu_ids,
      }
    };

     data = [trace1];
    
    Plotly.newPlot('bubble', data );

    // Demographic Info
    let meta = metadata.find(obj => obj.id == id);

    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key,val]) => {
      d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`)
    })

    //Bonus
     data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per week" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 9] } }
      }
    ];
    
     layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', data, layout);

  })
};


