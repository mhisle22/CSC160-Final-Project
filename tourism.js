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
            
            if(aArrivals == null && bArrivals != null) {return 1;}
            if(aArrivals != null && bArrivals == null) {return -1;}
            if(aArrivals == null && bArrivals == null) {return 0;}
            
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
            
            if(aDeparts == null && bDeparts != null) {return 1;}
            if(aDeparts != null && bDeparts == null) {return -1;}
            if(aDeparts == null && bDeparts == null) {return 0;}
            
            if(aDeparts > bDeparts) {return -1}
            else if(aDeparts < bDeparts) {return 1}
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
            
            if(aExpend == null && bExpend != null) {return 1;}
            if(aExpend != null && bExpend == null) {return -1;}
            if(aExpend == null && bExpend == null) {return 0;}
            
            if(aExpend > bExpend) {return -1}
            else if(aExpend < bExpend) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
    
   /* d3.select("#pop")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aItems = a.Population;
            var bItems = b.Population;
            
            if(aItems == null && bItems != null) {return 1;}
            if(aItems != null && bItems == null) {return -1;}
            if(aItems == null && bItems == null) {return 0;}
            
            if(aItems > bItems) {return -1}
            else if(aItems < bItems) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });*/
    
    d3.select("#immigrant")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aItems = a.PercentageImmigrantPopulation;
            var bItems = b.PercentageImmigrantPopulation;
            
            if(aItems == null && bItems != null) {return 1;}
            if(aItems != null && bItems == null) {return -1;}
            if(aItems == null && bItems == null) {return 0;}
            
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
            
            if(aItems == null && bItems != null) {return 1;}
            if(aItems != null && bItems == null) {return -1;}
            if(aItems == null && bItems == null) {return 0;}
            
            if(aItems > bItems) {return -1}
            else if(aItems < bItems) {return 1}
            else { return 0;}
        });
        clearTable();
        createTable(countries);
    });
    
    d3.select("#world")
    .on("click",function()
    { 
        countries.sort(function(a,b)
        {
            var aItems = a.World;
            var bItems = b.World;
            
            if(aItems == null && bItems != null) {return 1;}
            if(aItems != null && bItems == null) {return -1;}
            if(aItems == null && bItems == null) {return 0;}
            
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
        .text(function(country){if(country.Arrivals == 0){return "N/A";} else{return numberWithCommas(country.Arrivals);}});
    
    //append departures
    rows.append("td")
        .text(function(country){if(country.Departures == 0){return "N/A";} else{return numberWithCommas(country.Departures);}});
    
    //append expend
    rows.append("td")
        .text(function(country){if(country.Expenditures == 0){return "N/A";} else{return numberWithCommas(country.Expenditures);}});
    
    //append population
    /*rows.append("td")
        .text(function(country){if(country.Population == 0){return "N/A";} else{return numberWithCommas(country.Population);}});
    */
    //append immigration stats
    rows.append("td")
        .text(function(country){if(country.PercentageImmigrantPopulation == 0){return "N/A";} else{return country.PercentageImmigrantPopulation;}});
    
    //append immigration stats
    rows.append("td")
        .text(function(country){if(country.Diplomat == 0){return "N/A";} else{return country.Diplomat;}});
    
    
    //calculate worldliness, then append
    //so, how we're gonna do this is by scaling everything to a percentage
    //then average from there
    //if something is 0, don't include it MIGHT CHANGE LATER
    var arrivals = tourism.map(function(country){return Number(country.Arrivals);});
    arrivals = arrivals.filter(n => n);
    
    var min = d3.min(arrivals);
    var max = d3.max(arrivals);
    
    var arrivalScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, 1]);
    
    //this is not the correct name, but i dont want to rewrite this every time
    //Get over it.
    arrivals = tourism.map(function(country){return Number(country.Departures);});
    arrivals = arrivals.filter(n => n); //translation: make this get rid off unset indices
    
    var min = d3.min(arrivals);
    var max = d3.max(arrivals);
    
    var departureScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, 1]);
    
    arrivals = tourism.map(function(country){return Number(country.Expenditures);});
    arrivals = arrivals.filter(n => n);
    
    var min = d3.min(arrivals);
    var max = d3.max(arrivals);
    
    var expendScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, 1]);
    
    /*arrivals = tourism.map(function(country){return Number(country.Population);});
    arrivals = arrivals.filter(n => n);
    
    var min = d3.min(arrivals);
    var max = d3.max(arrivals);
    
    var popScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, 1]);*/
    
    
    arrivals = tourism.map(function(country){return Number(country.PercentageImmigrantPopulation);});
    arrivals = arrivals.filter(n => n);
    
    var min = d3.min(arrivals);
    var max = d3.max(arrivals);
    
    var imScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, 1]);
    
    arrivals = tourism.map(function(country){return Number(country.Diplomat);});
    arrivals = arrivals.filter(n => n);
    
    var min = d3.min(arrivals);
    var max = d3.max(arrivals);
    
    var dipScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, 1]);
    
    //now, we can finally append the calculated field by scaling each variable
    rows.append("td")
        .text(function(country)
        {
            var count = 0;
            var total = 0.0;
            if(country.Diplomat !== 0){total += dipScale(country.Diplomat); count++;}
            if(country.Arrivals !== 0){total += arrivalScale(country.Arrivals); count++;}
            if(country.Expenditures !== 0){total += expendScale(country.Expenditures); count++;}
            if(country.PercentageImmigrantPopulation !== 0){total += imScale(country.PercentageImmigrantPopulation); count++;}
            //if(country.Population !== 0){total += popScale(country.Population); count++;}
            if(country.Departures !== 0){total += departureScale(country.Departures); count++;}
        
            //check if this country had no data, which shouldnt ever be true. But it feels good to check...
            if(count === 0) {return 'N\A';}
            
            //add the variable so we can retrieve it later for sorting
            country.World = total / count;
        
            //now let's finally calculate this bad boy
            return total / count;
    
        });
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
        
        
        loadExpenditures(arrivals);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise2.then(successFcn,failureFcn);
    
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