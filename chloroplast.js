var getArrivals = function(country){return country.Arrivals;};

var getDepartures = function(country){return country.Departures};

var getExpenditures = function(country){return country.Expenditures};
    
var getIm = function(country){return country.PercentageImmigrantPopulation};
    
var getDip = function(country){return country.Diplomat;};

var getWorld = function(country){return country.World};

var setTitle = function(msg)
{
    d3.select("#scat h2")
    .text(msg);
}

//arrivals
var blueAccessor = function(tourism) {
    return d3.scaleThreshold()
      .domain([d3.min(tourism,getArrivals), d3.max(tourism,getArrivals)])
      .range(["white", "blue"]);
}

//departures
var orangeAccessor = function(tourism) {
    return d3.scaleThreshold()
      .domain([d3.min(tourism,getDepartures), d3.max(tourism,getDepartures)])
      .range(["white", "orange"]);
}

//expenditures
var greenAccessor = function(tourism) {
    return d3.scaleThreshold()
      .domain([d3.min(tourism,getExpenditures), d3.max(tourism,getExpenditures)])
      .range(["white", "green"]);
}

//immigration
var purpleAccessor = function(tourism) {
    return d3.scaleThreshold()
      .domain([d3.min(tourism,getIm), d3.max(tourism,getIm)])
      .range(["white", "purple"]);
}

//diplom
var blackAccessor = function(tourism) {
    return d3.scaleThreshold()
      .domain([d3.min(tourism,getDip), d3.max(tourism,getDip)])
      .range(["white", "black"]);
}

//worldliness
var redAccessor = function(tourism) {
    return d3.scaleThreshold()
      .domain([d3.min(tourism,getWorld), d3.max(tourism,getWorld)])
      .range(["white", "red"]);
}

var clearPlot = function()
{
    d3.select("svg")
      .remove();
}


var initButtons = function(tourism)
    {
        d3.select("#one")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, blueAccessor);
            setTitle("Arrivals per Country");
          
        });
        
        d3.select("#two")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, orangeAccessor);
            setTitle("Departures per Country");
           
        });
        
        d3.select("#three")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, greenAccessor);
            setTitle("Expenditures per Country");
     
        });
        
        d3.select("#four")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, purpleAccessor);
            setTitle("Immigrant Population per Country");
       
        });
        
        d3.select("#five")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, blackAccessor);
            setTitle("Diplomatic Missions per Country");
       
        });
        
        d3.select("#six")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, redAccessor);
            setTitle("Calculated Worldliness per Country");
       
        });
        
}



var makeMap = function(tourism, colorAccessor) {
    //the size of the screen
    var screen = {width:1200, height:480};
    
    //how much space will be on each side of the graph
    var margins = {top:15,bottom:40,left:70,right:40};
    
    //generated how much space the graph will take up
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    
    //set the screen size
    d3.select("#scat")
        .append("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    
    //Map and projection
    var projection = d3.geoMercator()
      .scale(100)
      .center([0,20])
      .translate([graph.width / 2, graph.height / 1.65]);
    
    var path = d3.geoPath()
        .projection(projection);
    
    // Data and color scale
    var countryImgs = d3.map();
    var colorScale = colorAccessor(tourism);
    
    var promise = d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
    
    var successFcn = function(countries) //If the data is successfully collected
    {
        console.log("Data Collected:", countries);
        fillMap(tourism, colorScale, countryImgs, path, countries);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise.then(successFcn,failureFcn);
    
    
    
}


var fillMap = function(tourism, colorScale, countryImgs, path, countries) {
      
      var svg = d3.select("svg");
    
      // Draw the map
      svg.append("g")
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", path)
        // set the color of each country
        .attr("fill", function (d) {
            d.total = countryImgs.get(d.id) || 0;
            return colorScale(d.total);
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
        
        
        //calculate wordliness here since we cant do it in the same order as last time
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
    tourism.map(function(country)
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
            return (total / count).toFixed(2);
    
        });
        
        initButtons(tourism);
        makeMap(tourism, blueAccessor);
        setTitle("Arrivals per Country");
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

loadArrivals();