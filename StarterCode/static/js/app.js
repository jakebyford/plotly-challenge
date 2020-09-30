//Create Default Page 
function init() {
    var defaultPage = d3.select("#selDataset");
    // use d3 library to read in `samples.json`
    d3.json("./samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((bellyButtonId) => {
            defaultPage
                .append("option")
                .text(bellyButtonId)
                .property("value", bellyButtonId);
        });

        var defaultSample = sampleNames[0];
        createDataCharts(defaultSample);
        getMetaData(defaultSample);
        //buildGauge(defaultSample);

    });
}
init();

//Create function to build charts

function createDataCharts(bellyButtonId) {
    // use d3 library to read in `samples.json`
        d3.json("./samples.json").then(function(data) {
            var samplesData = data.samples;
            var resultArray = samplesData.filter(object => object.id == bellyButtonId);
            var result = resultArray[0];
            console.log(result);

    //Use `otu_ids` as the labels for the bar chart
            var ids = result.otu_ids; //could do --data.samples[0].otu_ids;-- as well
            console.log(ids);

    //Use `sample_values` as the values for the bar chart
            var sampleValues = data.samples[0].sample_values;// could do --result.samples-- as well
            console.log(sampleValues);
    
            var otuLabels = result.otu_labels;
            console.log(otuLabels);
    
            var topIds = data.samples[0].otu_ids.slice(0, 10).reverse();
    
            var otuName = topIds.map((data) => "OTU " + data);
            console.log(`OTU IDS: ${otuName}`);

    //Build Horizontal Bar Chart
            var barTrace = {
                x: sampleValues.slice(0, 10).reverse(),
                y: otuName,
                text: otuLabels.slice(0, 10).reverse(), //Use `otu_labels` as the hovertext for the chart
                type: 'bar',
                orientation: 'h'
              };
    
            var data = [barTrace];
    
            var barLayout = {
                title: `Top 10 OTUs`
            };
    
            Plotly.newPlot('bar', data, barLayout);

    // Create Bubble Chart

            var bubbleTrace = {
                x: ids,
                y: sampleValues,
                text: otuLabels,
                margin: {t:40},
                mode: "markers",
                marker: {
                    colorscale: [
                        ['0.0', 'rgb(165,0,38)'],
                        ['0.111111111111', 'rgb(215,48,39)'],
                        ['0.222222222222', 'rgb(244,109,67)'],
                        ['0.333333333333', 'rgb(253,174,97)'],
                        ['0.444444444444', 'rgb(254,224,144)'],
                        ['0.555555555556', 'rgb(224,243,248)'],
                        ['0.666666666667', 'rgb(171,217,233)'],
                        ['0.777777777778', 'rgb(116,173,209)'],
                        ['0.888888888889', 'rgb(69,117,180)'],
                        ['1.0', 'rgb(49,54,149)']
                      ],
                    color: ids,
                    size: sampleValues
                }
                
            };

            var bubbleData = [bubbleTrace];
    
            var bubbleLayout = {
                title: "Bubble Chart",
            };
    
            Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        });
    }

    //Create a InfoBox Function
    function createInfoBox(bellyButtonId) {
            // use d3 library to read in `samples.json`
            d3.json("./samples.json").then((data) => {
                // get the metadata info
            var metaDataInfo = data.metadata;
            console.log(metaDataInfo);
            //filter meta data info by id
            var resultArray = metaDataInfo.filter(object => object.id == bellyButtonId);
            var result = resultArray[0];
            console.log(result);

            var infoBox = d3.select("#sample-metadata");
            infoBox.html("");

            Object.entries(result).forEach(([key, value]) => {
                infoBox.append("h5").text(`${key}: ${value}`);
            });
        });
    }

    function optionChanged() {
        var dropdownMenu = d3.select("#selDataset");
        var sampleId = dropdownMenu.property("value");

        createDataCharts(sampleId);
        createInfoBox(sampleId);
    }
    
