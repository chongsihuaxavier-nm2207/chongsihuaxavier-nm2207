//eligibility calculator, which will be using if else loop
// updating slider amount to indicate age
function updateAgeValue(slideAmt) {
    document.getElementById("ageValue").innerHTML = slideAmt;
}

//validating the inputs for the eligibility form
function submitForm(event){
   //preventing a blank form from being submitted
    event.preventDefault();
    
    // Variables for storing selected options
    var selectedCitizenshipStatus = null;
    var selectedAge = null;
    var selectedMaritalStatus = null;
    var selectedOwnProperties = null;

    //Get citizenship status value
    var citizenShipElements = document.getElementsByName("citizenShipStatus");
    for(let i = 0; i < citizenShipElements.length; i++){
        if(citizenShipElements[i].checked){
            selectedCitizenshipStatus = citizenShipElements[i].value;
        }
    }

    //Get value for age
    selectedAge = document.getElementById("ageSlider").value;

    //Get value for marital status
    var maritalStatusElements = document.getElementsByName("MaritalStatus");
    for(let i = 0; i < maritalStatusElements.length; i++){
        if(maritalStatusElements[i].checked){
            selectedMaritalStatus = maritalStatusElements[i].value;
        }
    }
    
    //Get value of ownership of properties
    var propertiesElements = document.getElementsByName("OwnProperties");
    for(let i = 0; i < propertiesElements.length; i++){
        if(propertiesElements[i].checked){
            selectedOwnProperties = propertiesElements[i].value;
        }
    }

    //combine all the inputs into an object
    var selectedValues =
    {
        selectedAge,
        selectedCitizenshipStatus,
        selectedMaritalStatus,
        selectedOwnProperties
    };

    //validating the inputs
    if(selectedCitizenshipStatus === "SC" || selectedCitizenshipStatus === "PR"){
        if(selectedAge >= 21){
            if(selectedMaritalStatus === "Married"){
                if(selectedOwnProperties === "NoProperties"){
                    document.getElementById("eligibilityStatus").innerHTML = "You are eligible to purchase a resale flat";
                    //returing output as false if the above conditions are not met
                    return false;
                }
            }         
        }
    }
    //displaying result of inputs being validated as false
    document.getElementById("eligibilityStatus").innerHTML = "You are not eligible to purchase a resale flat";

    return false;

}

//adding event listener for submission of form
var form = document.getElementById("eligibilityCalculator");
form.addEventListener('submit', submitForm);


//subsidy calculator, which will be using if else loop
var subsidy = function () {
    var income = document.getElementById("income-text").value;
    console.log(income);
    if (income <= 14000 && income >= 0) {
        document.getElementById("subsidy-result").innerHTML = "You are eligible for the CPF Housing Grant";
    }
    else if (income >= 14000) {
        document.getElementById("subsidy-result").innerHTML = "You are not eligible for the CPF Housing Grant";
    }
    else if (income < 0) {
        alert("You have entered an invalid number")
    }
};

//coding the function to be run if the box for income amount changes
document.getElementById("income-text").addEventListener("change", subsidy);

//Year of transaction - line graph
const labelYear = ["2017", "2018", "2019", "2020", "2021", "2022"];

const dataObjyear = {
    labels: labelYear,
    datasets: [
        {
            label: "Resale flat prices",
            data: [443888, 441282, 432137, 452279, 511381, 549695],
            fill: false,
            borderColor: "#0279d1",
            backgroundColor: "#7eb0d5",
            tension: 0.1,
        },
    ]
};

new Chart("resale-year", {
    type: "line",
    data: dataObjyear, 
    options: {
        maintainAspectRatio: true,
        responsive: false,
        legend: {
            display: true
        },
        title: {
            display: true,
            text: ["Average HDB Resale Price between 2017-2022"],
            fontFamily: "TrebuchetMS",
            fontSize: 24,
            fontColor: '#656565',
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Year'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Price'
                }
            }]
        }
    }
});


// HDB location chart, adapted from Session 11 Class to the context of HDB prices
var maxDisplayHDB = 5;
let highestChart;
let lowestChart;
const dataTable = [];
//Threshold determined based on having the top 10 different prices of hdb flats displayed (may be multiple units selling at the same price)
const highestThreshold = 1350000;
const lowestThreshold = 165000;
let lastlowestIndex = 0;
let lasthighestIndex = 0;

//processing data from the csv file
const processData = function (data) {
    const rows = data.split("\r\n");
    rows.forEach((row, index) => {
        const item = row.split(",");
        dataTable.push(item);
    });
}

//function for creating the original chart that is displayed before any other datapoints are added (top/bottom 5)
const createCharts = function () {
    const lowestLabels = [];
    const lowestData = [];
    const highestLabels = [];
    const highestData = [];

    for (let i = 0; i < dataTable.length; i++) {
        //lowest bar chart
        if (dataTable[i][7] <= lowestThreshold && lowestData.length < maxDisplayHDB) {
            lowestLabels.push(dataTable[i][1]);
            lowestData.push(dataTable[i][7]);
            lastlowestIndex = i;
        }
        //highest bar chart
        if (dataTable[i][7] >= highestThreshold && highestData.length < maxDisplayHDB) {
            highestLabels.push(dataTable[i][1]);
            highestData.push(dataTable[i][7]);
            lasthighestIndex = i;
        }
    }

    const lowestDataObj = {
        labels: lowestLabels,
        datasets: [{
            label: "Price",
            data: lowestData,
            borderWidth: 2,
            borderColor: "#90b802", 
            backgroundColor: "#b2e061"
        }]
    };

    lowestChart = new Chart("lowest-price-chart", {
        type: "horizontalBar",
        data: lowestDataObj,
        options: {
            maintainAspectRatio: true,
            responsive: false,
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        max: 170000,
                        min: 130000,
                    }
                }]
            },
            legend: { display: true },
            title: {
                display: true,
                text: ['The lowest priced resale flats in Singapore and their location'],
                fontFamily: "TrebuchetMS",
                fontSize: 24,
                fontColor: '#656565',
            }
        }
    });

    const highestDataObj = {
        labels: highestLabels,
        datasets: [{
            label: "Price",
            data: highestData,
            borderWidth: 2,
            borderColor: "#ff4938",
            backgroundColor: "#fd7f6f"
        }]
    };

    highestChart = new Chart("highest-price-chart", {
        type: "horizontalBar",
        data: highestDataObj,
        options: {
            maintainAspectRatio: true,
            responsive: false,
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        min: 1340000,
                        max: 1420000,
                    }
                }]
            },
            legend: { display: true },
            title: {
                display: true,
                text: ['The highest priced resale flats in Singapore and their location'],
                fontFamily: "TrebuchetMS",
                fontSize: 24,
                fontColor: '#656565',
            },
        }
    });
}

//fetching data from the csv file
const loadData = function () {
    // your fetch api call and all the subsequent data processing calls go here.
    fetch("https://2207-resources.s3.ap-southeast-1.amazonaws.com/resaleflatsupdated.csv")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            processData(data);
            createCharts();
        });
};

//updating the data into the original chart when the button is clicked.
const updateData = function () {
    document.getElementById("moreButton").innerHTML = "More HDB Flats please!";
    if (lowestChart !== null && highestChart !== null) {
        //increasing the max display so more flats can be input
        maxDisplayHDB++

        updateChartData(lowestChart, "low");
        updateChartData(highestChart, "high");
    }
    else {
        //if the button is not pressed, the chart with the 5 flats will be displayed
        loadData();
    }
};

//updating chart data
function updateChartData(chart, type) {

    // if the chart is for negative/positive, then set the price threshold
    const threshold = type === "low" ? lowestThreshold : highestThreshold;

    // if the chart is negative/positive, then set the appropriate dataTable starting index 
    const startingIndex = type === "low" ? lastlowestIndex : lasthighestIndex;

    for (let i = startingIndex; i < dataTable.length && chart.data.labels.length < maxDisplayHDB; i++) {
        if ((type === "low" && dataTable[i][7] <= threshold) || (type === "high" && dataTable[i][7] >= threshold)) {
            chart.data.labels.push(dataTable[i][1]);
            chart.data.datasets[0].data.push(dataTable[i][7]);
            //dataTable.sort((a, b) => b[7] - a[7]);
            if (type === "low") {
                lastlowestIndex = i + 1;
            } else {
                lasthighestIndex = i + 1;
            }
        }
    }
    chart.update();
}

loadData();

//adding event listener to the more button
const moreButton = document.getElementById("moreButton");
moreButton.addEventListener("click", function () {
    updateData();
});

//Boxplot for HDB Flat prices by location. adapted from Week 12 Codealong
d3.csv("https://2207-resources.s3.ap-southeast-1.amazonaws.com/resaleflatsupdated.csv", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }

  //Filter data for Sengkang, Woodlands, Jurong East, Bedok
  const SengkangData = data.filter(row => row.town === "SENGKANG");
  //debugging if the filter has filtered the data correctly
  console.log(SengkangData);
  const WoodlandsData = data.filter(row => row.town === "WOODLANDS");
  const JurongEastData = data.filter(row => row.town === "JURONG EAST");
  const BedokData = data.filter(row => row.town === "BEDOK");
  const ToaPayohData = data.filter (row => row.town === "TOA PAYOH");

  //Extract price values for each town
  const SengkangPrice = SengkangData.map(row => parseFloat(row.resale_price));
  //debugging if the price has been extracted correctly
  console.log(SengkangPrice);
  const WoodlandsPrice = WoodlandsData.map(row => parseFloat(row.resale_price));
  const JurongEastPrice = JurongEastData.map(row => parseFloat(row.resale_price));
  const BedokPrice = BedokData.map(row => parseFloat(row.resale_price));
  const ToaPayohPrice = ToaPayohData.map(row => parseFloat(row.resale_price));

  //creating traces for each town
  const SengkangTrace = {
    y: SengkangPrice,
    name: "Sengkang",
    type: "box",
    marker: { color: "#fd7f6f" }
  };

  const WoodlandsTrace = {
    y: WoodlandsPrice,
    name: "Woodlands",
    type: "box",
    marker: { color: "#7eb0d5" }
  };

  const JurongEastTrace = {
    y: JurongEastPrice,
    name: "Jurong East",
    type: "box",
    marker: { color: "#b2e061" }
  };

  const BedokTrace = {
    y: BedokPrice,
    name: "Bedok",
    type: "box",
    marker: { color: "#bd7ebe" }
  };

  const ToaPayohTrace = {
    y: ToaPayohPrice,
    name: "Toa Payoh",
    type: "box",
    marker: { color: "#ffb55a" }
  };

  //combining the various traces into a single object
  const locationData = [SengkangTrace, WoodlandsTrace, JurongEastTrace, BedokTrace, ToaPayohTrace];

  //defining the layout of the boxplot
  const layout = {
    title: {
      text: "Resale flat prices across different towns",
      font: { size: 24 }
    },
    xaxis: {
      title: "Town"
    },
    yaxis: {
      title: "Price"
    },
    showlegend: true,
  };
  
  //creating boxplot
  Plotly.newPlot("flatlocation-price", locationData, layout);
});


//Age of flat
const labelYearRange = ["1966-1970", "1971-1980", "1981-1990", "1991-2000", "2001-2010", "2011-2019"];

const dataObjAge = {
    labels: labelYearRange,
    datasets: [
        {
            label: "Average Resale Flat Price",
            data: [282701, 382213, 439098, 519054, 510348, 546482],
            fill: false,
            borderColor: "#b33cb5",
            backgroundColor: "#bd7ebe",
            borderWidth: 2,
            tension: 0.1,
        },
    ]
};

new Chart("flat-age",
    {
        type: "bar",
        data: dataObjAge,
        options: {
            maintainAspectRatio: true,
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: ["Average HDB Resale Price by lease commencement date"],
                fontFamily: "TrebuchetMS",
                fontSize: 24,
                fontColor: '#656565',
            }
        }
    });


//Flat type
//Adding event listener to the buttons
let sizeChart;

const buttonSengkang = document.getElementById("Sengkang");
    buttonSengkang.addEventListener("click", function () {
        console.log("Sengkang");
        updateSizeChart("Sengkang");
    }); ;

const buttonWoodlands = document.getElementById("Woodlands");
    buttonWoodlands.addEventListener("click", function () {
        console.log("Woodlands");
        updateSizeChart("Woodlands");
    }); ;

const buttonJurongEast = document.getElementById("JurongEast");
    buttonJurongEast.addEventListener("click", function () {
        updateSizeChart("JurongEast");
    }); ;

const buttonBedok = document.getElementById("Bedok");
    buttonBedok.addEventListener("click", function () {
        updateSizeChart("Bedok");
    }); 

const buttonToaPayoh = document.getElementById("ToaPayoh");
    buttonToaPayoh.addEventListener("click", function () {
        updateSizeChart("ToaPayoh");
    }); 

const labelFlatType = ["2-Room", "3-Room", "4-Room", "5-Room", "Executive"];

//creating data objects for each town
const dataObjSengkang = {
    labels: labelFlatType,
    datasets: [
        {
      label: 'Number of HDB flats sold',
      data: [264, 858, 6223, 4312, 827],
      backgroundColor: [
        '#fd7f6f',
        '#7eb0d5',
        '#b2e061',
        '#bd7ebe',
        '#ffb55a',
      ],
      hoverOffset: 4
    },
    ]
  };

  const dataObjWoodlands = {
    labels: labelFlatType,
    datasets: [
        {
      label: 'Number of HDB flats sold',
      data: [106, 1241, 4616, 3177,1172],
      backgroundColor: [
        '#fd7f6f',
        '#7eb0d5',
        '#b2e061',
        '#bd7ebe',
        '#ffb55a',
      ],
      hoverOffset: 4
    },
    ]
  };

  const dataObjJurongEast = {
    labels: labelFlatType,
    datasets: [
        {
      label: 'Number of HDB flats sold',
      data: [58, 1026, 923, 761, 322],
      backgroundColor: [
        '#fd7f6f',
        '#7eb0d5',
        '#b2e061',
        '#bd7ebe',
        '#ffb55a',
      ],
      hoverOffset: 4
    },
    ]
  };
  
  const dataObjBedok = {
    labels: labelFlatType,
    datasets: [
        {
      label: 'Number of HDB flats sold',
      data: [104, 3278, 2715, 1480, 409],
      backgroundColor: [
        '#fd7f6f',
        '#7eb0d5',
        '#b2e061',
        '#bd7ebe',
        '#ffb55a',
      ],
      hoverOffset: 4
    },
    ]
  };
  
  const dataObjToaPayoh = {
    labels: labelFlatType,
    datasets: [
        {
      label: 'Number of HDB flats sold',
      data: [136, 2074, 1473, 941, 121],
      backgroundColor: [
        '#fd7f6f',
        '#7eb0d5',
        '#b2e061',
        '#bd7ebe',
        '#ffb55a',
      ],
      hoverOffset: 4
    },
    ]
  };

//generating a new doughnut chart if the button is clicked
  const updateSizeChart = function (location) {
    //if there is a size chart present, destroy it
    if (sizeChart) {
        sizeChart.destroy();
    }
    //if button pressed is sengkang, generate a new size chart based on the location
    if (location === "Sengkang") {
        sizeChart = new Chart("flat-size", 
        {
        type: "doughnut",
        data: dataObjSengkang,
        options: {
            maintainAspectRatio: true,
            responsive: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: ["Distribution of HDB Flats sold in Sengkang by Flat Type"],
            fontFamily: "TrebuchetMS",
            fontSize: 24,
            fontColor: 'rgb(0,120,0)',
          },
          //settings adapted from ChatGPT
          legend: {
            display: true,
            position: 'right',
            labels: {
              fontColor: 'rgb(0,0,0)',
              fontSize: 14,
              padding: 20,
              boxWidth: 12
            }
          },
          //transforming data from numbers to percentage, adapted from ChatGPT
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                return percentage + "%";
              },
              showTooltips: true,
            }
          }
        }
      });
    }

    else if (location === "Woodlands") {  
        sizeChart = new Chart("flat-size", {
            type: "doughnut",
            data: dataObjWoodlands,
            options: {
                maintainAspectRatio: true,
                responsive: false,
              legend: {
                display: false
              },
              title: {
                display: true,
                text: ["Distribution of HDB Flats sold in Woodlands by Flat Type"],
                fontFamily: "TrebuchetMS",
                fontSize: 24,
                fontColor: 'rgb(0,120,0)',
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontColor: 'rgb(0,0,0)',
                  fontSize: 14,
                  padding: 20,
                  boxWidth: 12
                }
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                      return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                    return percentage + "%";
                  },
                  showTooltips: true,
                }
              }
            }
          });
    }

    else if (location === "JurongEast") {
        sizeChart = new Chart("flat-size", {
            type: "doughnut",
            data: dataObjJurongEast,
            options: {
                maintainAspectRatio: true,
                responsive: false,
              legend: {
                display: false
              },
              title: {
                display: true,
                text: ["Distribution of HDB Flats sold in Jurong East by Flat Type"],
                fontFamily: "TrebuchetMS",
                fontSize: 24,
                fontColor: 'rgb(0,120,0)',
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontColor: 'rgb(0,0,0)',
                  fontSize: 14,
                  padding: 20,
                  boxWidth: 12
                }
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                      return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                    return percentage + "%";
                  },
                  showTooltips: true,
                }
              }
            }
          })
    }

        else if (location === "Bedok") {
            sizeChart = new Chart("flat-size", {
                type: "doughnut",
                data: dataObjBedok,
                options: {
                    maintainAspectRatio: true,
                    responsive: false,
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: ["Distribution of HDB Flats sold in Bedok by Flat Type"],
                    fontFamily: "TrebuchetMS",
                    fontSize: 24,
                    fontColor: 'rgb(0,120,0)',
                  },
                  legend: {
                    display: true,
                    position: 'right',
                    labels: {
                      fontColor: 'rgb(0,0,0)',
                      fontSize: 14,
                      padding: 20,
                      boxWidth: 12
                    }
                  },
                  tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                          return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                        return percentage + "%";
                      },
                      showTooltips: true,
                    }
                  }
                }
              })
        }

        else if (location === "ToaPayoh") {
            sizeChart = new Chart("flat-size", {
                type: "doughnut",
                data: dataObjToaPayoh,
                options: {
                    maintainAspectRatio: true,
                    responsive: false,
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: ["Distribution of HDB Flats sold in Toa Payoh by Flat Type"],
                    fontFamily: "TrebuchetMS",
                    fontSize: 24,
                    fontColor: 'rgb(0,120,0)',
                  },
                  legend: {
                    display: true,
                    position: 'right',
                    labels: {
                      fontColor: 'rgb(0,0,0)',
                      fontSize: 14,
                      padding: 20,
                      boxWidth: 12
                    }
                  },
                  tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                          return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                        return percentage + "%";
                      },
                      showTooltips: true,
                    }
                  }
                }
              })
        }
    };

//generating bar chart for storey range
const labelStoreyRange = ["01 TO 03", "04 TO 06", "07 TO 09", "10 TO 12", "13 TO 15", "16 TO 18", "19 TO 21", "22 TO 24", "25 TO 27", "28 TO 30", "31 TO 33", "34 TO 36", "37 TO 39", "40 TO 42", "43 TO 45", "46 TO 48", "49 TO 51"]

//creating data object for storey range
const dataObjStorey = {
    labels: labelStoreyRange,
    datasets: [
        {
            label: "Average Resale Flat Price",
            data: [431749, 450286, 462961, 476492, 512562.9648, 553434, 621523, 647630, 700717, 791543, 825145, 844725, 863009, 930564, 991822, 1073414, 1122145],
            fill: false,
            borderColor: "",
            backgroundColor: "#ffb55a",
            borderWidth: 2,
            tension: 0.1,
        },
    ]
};

//creating new chart for storey range
new Chart("flat-storey",
    {
        type: "bar",
        data: dataObjStorey,
        options: {
            maintainAspectRatio: true,
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: ["Average HDB Resale Price by storey range"],
                fontFamily: "TrebuchetMS", 
                fontSize: 24,
                fontColor: '#656565',
            }
        }
    });