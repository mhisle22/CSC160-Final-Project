//below are functions for creating and resorting the table
//taken from our previous PenguinStarter lab
var clearTable = function()
{
    d3.selectAll("#tb tbody tr")
      .remove();
    
}

//Credit: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var initHeaders = function(countries) //Adds interactivity 
{
    d3.select("#arrivals")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aArrivals = Number(a.Arrivals);
            var bArrivals = Number(b.Arrivals);
            if(aArrivals > bArrivals) {return -1}
            else if(aArrivals < bArrivals) {return 1}
            else { return 0;}
            
        });
        
        clearTable();
        createTable(countries);
    });
    
    d3.select("#departures")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aDeparts = a.Departures;
            var bDeparts = b.Departures;
            if(aDeparts > bDeparts) {return -1}
            else if(aDeparts < bDeparts) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
    
    d3.select("#imports")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aImports = a.ImportPercentage;
            var bImports = b.ImportPercentage;
            if(aImports > bImports) {return -1}
            else if(aImports < bImports) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
    
    d3.select("#expend")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aExpend = a.Expenditures;
            var bExpend = b.Expenditures;
            if(aExpend > bExpend) {return -1}
            else if(aExpend < bExpend) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
    
    d3.select("#pop")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aItems = a.Population;
            var bItems = b.Population;
            if(aItems > bItems) {return -1}
            else if(aItems < bItems) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
    
    d3.select("#immigrant")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aItems = a.PercentageImmigrantPopulation;
            var bItems = b.PercentageImmigrantPopulation;
            if(aItems > bItems) {return -1}
            else if(aItems < bItems) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
    
    d3.select("#diplom")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aItems = a.Diplomat;
            var bItems = b.Diplomat;
            if(aItems > bItems) {return -1}
            else if(aItems < bItems) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
}

//creates the table using all tourism information
var createTable = function(tourism) {
    
    //Creates a row for each country
    var rows = d3.select("tbody")
      .selectAll("tr")
        .data(tourism)
        .enter()
      .append("tr");
    
    
    //append country
    rows.append("td")
        .text(function(country){return country.Country;});
    
    //append arrivals
    rows.append("td")
        .text(function(country){return numberWithCommas(country.Arrivals);});
    
    //append departures
    rows.append("td")
        .text(function(country){return numberWithCommas(country.Departures);});
    
    //append imports
    rows.append("td")
        .text(function(country){return country.ImportPercentage;});
    
    //append expend
    rows.append("td")
        .text(function(country){return numberWithCommas(country.Expenditures);});
    
    //append population
    rows.append("td")
        .text(function(country){return numberWithCommas(country.Population);});
    
    //append immigration stats
    rows.append("td")
        .text(function(country){return country.PercentageImmigrantPopulation;});
    
    //append immigration stats
    rows.append("td")
        .text(function(country){return country.Diplomat;});
    
    //TODO: calculate worldliness
    rows.append("td");
}


//functions to load then concatenate all data from the 5 csv files
//this will create a table with five columns: arrivals, departures, totalImports, expenditures, and travelItems
var loadArrivals = function() {

    var promise1 = d3.csv("arrivals.csv"); //Promise to get the data

    var successFcn = function(arrivals) //If the data is successfully collected
    {
        //console.log("Data Collected:", arrivals);
        loadDepartures(arrivals);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise1.then(successFcn,failureFcn);
    
}

var loadDepartures = function(arrivals) {

    var promise2 = d3.csv("departures.csv"); //Promise to get the data

    var successFcn = function(departures) //If the data is successfully collected
    {
        //console.log("Data Collected:", departures);
        
        //outer left join of arrivals with departures
        arrivals.forEach(function(country) {
            var result = departures.filter(function(departCountry) {
                return departCountry.Country === country.Country;
            });
            delete departures.Country;
            country.Departures = Number((result[0] !== undefined) ? result[0].Departures : null);
        });
        //console.log(arrivals);
        
        
        loadImports(arrivals);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise2.then(successFcn,failureFcn);
    
}

var loadImports = function(tourism) {

    var promise3 = d3.csv("total_imports.csv"); //Promise to get the data

    var successFcn = function(imports) //If the data is successfully collected
    {
        //console.log("Data Collected:", imports);
        
        //outer left join of all data with imports
        tourism.forEach(function(country) {
            var result = imports.filter(function(importCountry) {
                return importCountry.Country === country.Country;
            });
            delete imports.Country;
            country.ImportPercentage = Number((result[0] !== undefined) ? result[0].ImportPercentage : null);
        });
        //console.log(tourism);

        loadExpenditures(tourism);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise3.then(successFcn,failureFcn);
    
}

var loadExpenditures = function(tourism) {

    var promise4 = d3.csv("expenditures.csv"); //Promise to get the data

    var successFcn = function(expend) //If the data is successfully collected
    {
        //console.log("Data Collected:", expend);
        
        //outer left join of all data with expenditures
        tourism.forEach(function(country) {
            var result = expend.filter(function(importCountry) {
                return importCountry.Country === country.Country;
            });
            delete expend.Country;
            country.Expenditures = Number((result[0] !== undefined) ? result[0].Expenditures : null);
        });
        //console.log(tourism);

        loadPopulation(tourism);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise4.then(successFcn,failureFcn);
    
}

var loadPopulation = function(tourism) {

    var promise5 = d3.csv("diplomacy_population_data.csv"); //Promise to get the data

    var successFcn = function(pop) //If the data is successfully collected
    {        
        //outer left join of all data with travelItems
        tourism.forEach(function(country) {
            var result = pop.filter(function(importCountry) {
                return importCountry.Country === country.Country;
            });
            delete pop.Country;
            country.Population = Number((result[0] !== undefined) ? result[0].Population : null) * 1000000; //csv file lists data per millions
        });
        
        loadImmigrant(tourism);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

var loadImmigrant = function(tourism) {

    var promise5 = d3.csv("immigrant_data.csv"); //Promise to get the data

    var successFcn = function(pop) //If the data is successfully collected
    {        
        //outer left join of all data with travelItems
        tourism.forEach(function(country) {
            var result = pop.filter(function(importCountry) {
                return importCountry.Country === country.Country;
            });
            delete pop.Country;
            country.PercentageImmigrantPopulation = Number((result[0] !== undefined) ? result[0].PercentageImmigrantPopulation : null);
        });
        
        loadDiplomat(tourism);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

var loadDiplomat = function(tourism) {

    var promise5 = d3.csv("diplomacy_data.csv"); //Promise to get the data

    var successFcn = function(pop) //If the data is successfully collected
    {        
        //outer left join of all data with travelItems
        tourism.forEach(function(country) {
            var result = pop.filter(function(importCountry) {
                return importCountry.Country === country.Country;
            });
            delete pop.Country;
            country.Diplomat = Number((result[0] !== undefined) ? result[0].Diplomat : null);
        });
        console.log(tourism);
        
        createTable(tourism);
        initHeaders(tourism);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

loadArrivals();