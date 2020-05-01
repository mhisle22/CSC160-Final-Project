var getArrivals = function(country){return country.Arrivals;};

var getDepartures = function(country){return country.Departures};

var getExpenditures = function(country){return country.Expenditures};
    
var getIm = function(country){return country.PercentageImmigrantPopulation};
    
var getDip = function(country){return country.Diplomat;};

var getWorld = function(country){return country.World};

var clearPlot = function()
{
    d3.select("svg")
      .remove();
}

var setTitle = function(msg)
{
    d3.select("#scat h2")
    .text(msg);
}


var initButtons = function(tourism)
    {
        d3.select("#one")
          .on("click", function()
        {
            clearPlot();
            initGraph(tourism, getArrivals);
            setTitle("Arrivals per Country");
          
        });
        
        d3.select("#two")
          .on("click", function()
        {
            clearPlot();
            initGraph(tourism, getDepartures);
            setTitle("Departures per Country");
           
        });
        
        d3.select("#three")
          .on("click", function()
        {
            clearPlot();
            initGraph(tourism, getExpenditures);
            setTitle("Expenditures per Country");
     
        });
        
        d3.select("#four")
          .on("click", function()
        {
            clearPlot();
            initGraph(tourism, getIm);
            setTitle("Immigrant Population per Country");
       
        });
        
        d3.select("#five")
          .on("click", function()
        {
            clearPlot();
            initGraph(tourism, getDip);
            setTitle("Diplomatic Missions per Country");
       
        });
        
        d3.select("#six")
          .on("click", function()
        {
            clearPlot();
            initGraph(tourism, getWorld);
            setTitle("Calculated Worldliness per Country");
       
        });
        
}

var createAxes = function(screen, margins, graph, xScale, yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("svg")
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
    
}

var initGraph = function(tourism, accessor) {
    //the size of the screen
    var screen = {width:1000, height:550};
    
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
    
    //create a group for the graph
    var g = d3.select("svg")
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
    
        
    //create Scales for each dimension of data
    var xScale = d3.scaleLinear()
                .domain([0, tourism.length
                        ])
                .range([0,graph.width]);
    
    var yScale = d3.scaleLinear()
                .domain([d3.min(tourism,accessor),
                          d3.max(tourism,accessor)
                        ])
                .range([graph.height,margins.top]);
    
    createAxes(screen, margins, graph, xScale, yScale);
    createScatter(tourism,graph,xScale, yScale, accessor);
}

var createScatter = function(tourism,graph,xScale,yScale, accessor) {
      
    //sort it first
    tourism.sort(function(a,b)
        {
            var aArrivals = Number(accessor(a));
            var bArrivals = Number(accessor(b));
            
            if(aArrivals == null && bArrivals != null) {return 1;}
            if(aArrivals != null && bArrivals == null) {return -1;}
            if(aArrivals == null && bArrivals == null) {return 0;}
            
            if(aArrivals > bArrivals) {return 1}
            else if(aArrivals < bArrivals) {return -1}
            else { return 0;} 
        });
    
    
    var svg = d3.select("svg")
        .select(".graph");
                        
    //draw the dots     
    svg.selectAll("circle")
        .data(tourism)
        .enter()
        .append("circle")
        .attr("cx",function(country, index)
        {
            return xScale(index);  
        })
        .attr("cy",function(country)
        {
            return yScale(accessor(country));
        })
        .attr("r",4)
        .attr("fill", "white");
    
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
        initGraph(tourism, getArrivals);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

loadArrivals();