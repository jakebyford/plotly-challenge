//Create a BellyButton Data Function
function buildPage(bellyButtonId) {
// use d3 library to read in `samples.json`
    d3.json("./samples.json").then(function(d) {
        console.log(d);
//Use `otu_ids` as the labels for the bar chart
        var ids = d.samples[0].otu_ids;
        console.log(ids);
//Use `sample_values` as the values for the bar chart
        var sampleValues = d.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        var otuLabels = d.samples[0].otu_labels.slice(0, 10);
        console.log(otuLabels);

        var topIds = d.samples[0].otu_ids.slice(0, 10).reverse();

        var otuID = topIds.map((d) => "OTU " + d);
        console.log(`OTU IDS: ${otuID}`);

        var trace1 = {
            x: sampleValues,
            y: otuID,
            text: otuLabels, //Use `otu_labels` as the hovertext for the chart
            orientation: 'h',
            type: 'bar'
          };

        var data = [trace1];

        var layout = {
            title: `Top 10 OTUs`
        };

        Plotly.newPlot('bar', data, layout);


        var sampleMetaData = data.metadata;
        //console.log(sampleMetaData);
        var samples = data.samples;
        //console.log(samples);
    });
};
buildPage()