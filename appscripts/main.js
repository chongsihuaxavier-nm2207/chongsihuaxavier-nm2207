//scrolling sidenav

//eligibility calculator, which will be using if else loop



//subsidy calculator, which will be using if else loop
var subsidy = function () {
    var income = document.getElementById("income-text").value;
    console.log(income);
    if (income<=14000 && income>=0){
        document.getElementById("subsidy-result").innerHTML = "You are eligible for the CPF Housing Grant";
    }
    else if (income>=14000){
        document.getElementById("subsidy-result").innerHTML = "You are not eligible for the CPF Housing Grant";
    }
    else if (income<0){
        alert ("You have entered an invalid number")
    }
};

document.getElementById("income-text").addEventListener("change", subsidy);

//Year of transaction
const labelYear = ["2017", "2018", "2019", "2020", "2021", "2022"];

        const dataObjyear= {
            labels: labelYear,
            datasets: [
                {
                    label: "Resale flat prices",
                    data: [443888, 441282, 432137, 452279, 511381, 549695],
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                },
            ]
        };
        
        new Chart("resale-year",
                {
                    type: "line",
                    data: dataObjyear,
                    options: { 
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: ["Average HDB Resale Price between 2017-2022"],
                            fontFamily: "TrebuchetMS",
                            fontSize: 24,
                            fontColor: 'rgb(0,120,0)',
                        }
                    }
                });
        
        

const labelYearRange = ["1966-1970", "1971-1980", "1981-1990", "1991-2000", "2001-2010", "2011-2019"];

const dataObjAge= {
    labels: labelYearRange,
    datasets: [
        {
            label: "Average Resale Flat Price",
            data: [282701, 382213, 439098, 519054, 510348, 546482],
            fill: false,
            borderColor: "rgb(245, 66, 75)",
            backgroundColor: "rgb(245, 140, 145)",
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
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: ["Average HDB Resale Price between 2017-2022"],
                    fontFamily: "TrebuchetMS",
                    fontSize: 24,
                    fontColor: 'rgb(0,120,0)',
                }
            }
        });

        