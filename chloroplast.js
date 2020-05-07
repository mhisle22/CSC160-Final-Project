var getArrivals = function(country){return country.Arrivals;};

var getDepartures = function(country){return country.Departures};

var getExpenditures = function(country){return country.Expenditures};
    
var getIm = function(country){return country.PercentageImmigrantPopulation};
    
var getDip = function(country){return country.Diplomat;};

var getWorld = function(country){return country.World};

var setTitle = function(msg, color)
{
    d3.select("#scat h2")
    .text(msg)
    .style("color", color);
}

//Credit: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript 
//plus an extra if on my end
var numberWithCommas = function(x) {
    if(x === 'N/A') {
        return x;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//fixes a few issues so display make sense
var catchNa = function(num) {
    if(Number(num) === 0.0) {
        return 'N/A';
    }
    else {
        //fixes decimal place IF its a deciaml
        if(Math.round(num) !== num) {
            return num.toFixed(2).toString() + '%';
        }
        return num;
    }
}

//arrivals
var blueAccessor = function(tourism) {

    var colors = ["#f7fbff","#b0d1e7","#9dc9e2","#88bedc","#73b2d7","#5fa6d1","#4d99ca","#3d8cc3","#2e7ebb","#216fb3","#1561a8","#0d539a","#094589","#08306b"];
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getArrivals), d3.max(tourism,getArrivals)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//departures
var orangeAccessor = function(tourism) {

    var colors = ["#fff5eb","#fdc998","#fdbb81","#fdad6a","#fd9e55","#fb8f40","#f8802e","#f2701d","#ea6110","#df5308","#d04804","#bd3e02","#a83703","#953003"];
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getDepartures), d3.max(tourism,getDepartures)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//expenditures
var greenAccessor = function(tourism) {
 
    var colors = ["#f7fcf5","#9ed799","#8bcf89","#77c57a","#62bb6e","#4daf62","#3ba357","#2d954d","#1e8842","#107a37","#066b2d","#015b25","#00491d","#00451c"];
    
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getExpenditures), d3.max(tourism,getExpenditures)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//immigration
var purpleAccessor = function(tourism) {

    var colors = ["#fcfbfd","#aeadd3","#a19fcb","#9491c4","#8883bd","#7c73b4","#7261ab","#684ea2","#5e3b99","#552990","#4a1587", "#3f007d"];
    
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getIm), d3.max(tourism,getIm)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//diplom
var blackAccessor = function(tourism) {

    var colors = ["#ffffff","#dfdfdf","#d4d4d4","#c8c8c8","#bababa","#aaaaaa","#9a9a9a","#8a8a8a","#7a7a7a","#6b6b6b","#5c5c5c","#4b4b4b","#393939","#262626"];
        
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getDip), d3.max(tourism,getDip)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//worldliness
var redAccessor = function(tourism) {

    var colors = ["#fff5f0","#fcb196","#fca082","#fc8e6f","#fb7c5d","#f96a4c","#f5563e","#ee4332","#e33128","#d42321","#c4191c","#b21218","#9e0d15","#860711"];
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getWorld), d3.max(tourism,getWorld)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
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
            makeMap(tourism, getArrivals, blueAccessor);
            setTitle("Tourist Arrivals per Country", "royalblue");
          
        });
        
        d3.select("#two")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getDepartures, orangeAccessor);
            setTitle("Tourist Departures per Country", "orange");
           
        });
        
        d3.select("#three")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getExpenditures, greenAccessor);
            setTitle("Tourism Expenditures per Country", "green");
     
        });
        
        d3.select("#four")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getIm, purpleAccessor);
            setTitle("Immigrant Population per Country", "purple");
       
        });
        
        d3.select("#five")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getDip, blackAccessor);
            setTitle("Diplomatic Missions per Country", "darkgray");
       
        });
        
        d3.select("#six")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getWorld, redAccessor);
            setTitle("Calculated Worldliness per Country", "red");
       
        });
        
}

//combines appropriate dataset data unto country graphics
//essentially, we are combining two data sets, our wordliness set and country graphics
var setTotal = function(tourism, accessor, countries) {
    
    countries.forEach(function(country) {
        var result = tourism.filter(function(tourCountry) {
            return tourCountry.Country === country.properties.name;
        });
        //delete departures.Country;
        country.total = Number((result[0] !== undefined) ? accessor(result[0]) : null);
    });
    
}

//manually fix discrepencies between the names of two datasets
//not really a creative way to fix this, welcome to data science
var fixDataIssues = function(countries) {
    var names = countries.features.map(function(country) { 
        
        if(country.properties.name === 'USA') {country.properties.name = 'United States';}
        if(country.properties.name === 'Russia') {country.properties.name = 'Russian Federation';}
        if(country.properties.name === 'Egypt') {country.properties.name = 'Egypt, Arab Rep.';}
        if(country.properties.name === 'South Korea') {country.properties.name = 'Korea, Rep.';}
        if(country.properties.name === 'Iran') {country.properties.name = 'Iran, Islamic Rep.';}
        if(country.properties.name === 'The Bahamas') {country.properties.name = 'Bahamas, The';}
        if(country.properties.name === 'England') {country.properties.name = 'United Kingdom';}
        if(country.properties.name === 'Democratic Republic of the Congo') {country.properties.name = 'Congo, Dem. Rep.';}
        if(country.properties.name === 'North Korea') {country.properties.name = 'Korea, Dem. People’s Rep.';}
                
        return country.properties.name;
    });
    //console.log(names);
}


//setup graph sizes, initiate map visualization and color scales, and retrieves map shapes/images
//calls fillMap to add all data into the country shapes/images
var makeMap = function(tourism, accessor, colorAccessor) {
    //the size of the screen
    var screen = {width:1600, height:500};
    
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
      .scale(130)
      .center([0,20])
      .translate([graph.width / 4, graph.height / 1.65]);
    
    var path = d3.geoPath()
        .projection(projection);
    
    // Data and color scale
    var countryImgs = d3.map();
    var colorScale = colorAccessor(tourism);
    
    var promise = d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
    
    var successFcn = function(countries) //If the data is successfully collected
    {
        fixDataIssues(countries);
        setTotal(tourism, accessor, countries.features);
        fillMap(tourism, colorScale, countryImgs, path, countries);
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise.then(successFcn,failureFcn);
    
    
}

//bind country data for current attribute to respective images
//also creates legend
var fillMap = function(tourism, colorScale, countryImgs, path, countries) {
      
      var svg = d3.select("svg");
      var heatmap = colorScale[0];
      var colorerer = colorScale[1];
    
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
            return heatmap(colorerer(d.total));
        })
        .on("mouseover",function(country) {
            //create and show tooltip for country
            var xPosition = d3.event.pageX + 20;
            var yPosition = d3.event.pageY - 120;

            console.log(country);

            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px");

            d3.select("#tooltip #data-name")
                .text(numberWithCommas(catchNa(country.total)));
          
            d3.select("#tooltip #data-display")
                .text(country.properties.name);

            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout",function(penguin)
           {
            //get rid of tooltip
            d3.select("#tooltip").classed("hidden", true);
        });;
    
    //legend
    
    //Append a defs (for definition) element to your SVG
    var defs = svg.append("defs");

    //Append a linearGradient element to the defs and give it a unique id
    var linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient");
    
    //Horizontal gradient
    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
    
 
    //set color scale
    linearGradient.selectAll("stop")
        .data( heatmap.range().reverse() )
        .enter().append("stop")
        .attr("offset", function(d,i) { return i/(heatmap.range().length-1); })
        .attr("stop-color", function(d) { return d; });
    
    //Draw the rectangle and fill with gradient
    svg.append("rect")
        .attr("width", 20)
        .attr("height", 220)
        .style("fill", "url(#linear-gradient)")
        .attr("x", 870)
        .attr("y", 75)
        .attr("rx", 5);
    
    svg.append("text")
        .text("Max")
        .attr("x", 864)
        .attr("y", 67)
        .attr("fill", "white");
    
    svg.append("text")
        .text("Min")
        .attr("x", 866)
        .attr("y", 316)
        .attr("fill", "white");
    
    
}

//functions to load then concatenate all data from the 5 csv files
//this will create a table with five columns: arrivals, departures, totalImports, expenditures, and travelItems
var loadArrivals = function() {

    var promise1 = d3.csv("arrivals.csv"); //Promise to get the data

    var successFcn = function(arrivals) //If the data is successfully collected
    {
        //console.log("Data Collected:", arrivals);
        arrivals.forEach(function(country){country.Arrivals = Number(country.Arrivals);});
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
            country.World = total / count * 100;
        
            //now let's finally calculate this bad boy
            return (total / count).toFixed(4);
    
        });
        
        initButtons(tourism);
        makeMap(tourism, getArrivals, blueAccessor);
        setTitle("Tourist Arrivals per Country", "royalblue");
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

loadArrivals();