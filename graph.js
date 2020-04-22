var getArrivals = function(country){return country.Arrivals;};

var getDepartures = function(penguin){return d3.mean(penguin.homework.map(function(hw) 
                                                        { return hw.grade;}));};
    
var getIm = function(penguin){return d3.mean(penguin.test.map(function(test) 
                                                        { return test.grade;}));};
    
var getDip = function(penguin){return penguin.final.map(function(final)
                                                    { return final.grade;});};

var getWorld = function(penguin){return penguin.final.map(function(final)
                                                    { return final.grade;});};

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
            createArrivalsScatter(tourism);
          
        });
        
        d3.select("#two")
          .on("click", function()
        {
            clearPlot();
            createDeparturesScatter(tourism);
           
        });
        
        d3.select("#three")
          .on("click", function()
        {
            clearPlot();
            createExpendScatter(tourism);
     
        });
        
        d3.select("#four")
          .on("click", function()
        {
            clearPlot();
            createImScatter(tourism);
       
        });
        
        d3.select("#five")
          .on("click", function()
        {
            clearPlot();
            createDiplomScatter(tourism);
       
        });
        
        d3.select("#six")
          .on("click", function()
        {
            clearPlot();
            createWorldScatter(tourism);
       
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

var initGraph = function(tourism) {
    //the size of the screen
    var screen = {width:800, height:550};
    
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
                .domain([d3.min(tourism,getArrivals),
                          d3.max(tourism,getArrivals)
                        ])
                .range([graph.height,margins.top]);
    
    createAxes(screen, margins, graph, xScale, yScale);
    createArrivalsScatter(tourism,graph,xScale, yScale);
}

var createArrivalsScatter = function(tourism,graph,xScale,yScale) {
      
    //sort it first
    tourism.sort(function(a,b)
        {
            var aArrivals = Number(a.Arrivals);
            var bArrivals = Number(b.Arrivals);
            
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
            return yScale(getArrivals(country));
        })
        .attr("r",4)
        .attr("fill", "white");

    
    setTitle("Arrivals per Country");
    
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
        
        initButtons(tourism);
        initGraph(tourism);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

loadArrivals();