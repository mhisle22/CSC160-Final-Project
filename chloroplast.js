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

    var colors = ["#f7fbff","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"];
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getArrivals), d3.max(tourism,getArrivals)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//departures
var orangeAccessor = function(tourism) {

    var colors = ["#fff5eb","#fdd4ac","#fdd4aa","#fdd3a9","#fdd2a7","#fdd1a6","#fdd0a4","#fdd0a3","#fdcfa1","#fdcea0","#fdcd9e","#fdcc9d","#fdcb9b","#fdca99","#fdc998","#fdc896","#fdc795","#fdc693","#fdc591","#fdc490","#fdc38e","#fdc28d","#fdc18b","#fdc089","#fdbf88","#fdbe86","#fdbd84","#fdbc83","#fdbb81","#fdba7f","#fdb97e","#fdb87c","#fdb77a","#fdb679","#fdb577","#fdb475","#fdb374","#fdb272","#fdb171","#fdb06f","#fdaf6d","#fdae6c","#fdad6a","#fdac69","#fdab67","#fdaa65","#fda964","#fda762","#fda661","#fda55f","#fda45e","#fda35c","#fda25b","#fda159","#fda058","#fd9f56","#fd9e55","#fd9d53","#fd9c52","#fd9b50","#fd9a4f","#fc994d","#fc984c","#fc974a","#fc9649","#fc9548","#fc9346","#fc9245","#fc9143","#fc9042","#fb8f40","#fb8e3f","#fb8d3e","#fb8c3c","#fb8b3b","#fa8a3a","#fa8938","#fa8837","#fa8736","#fa8534","#f98433","#f98332","#f98230","#f8812f","#f8802e","#f87f2c","#f77e2b","#f77d2a","#f77b29","#f67a27","#f67926","#f57825","#f57724","#f57623","#f47522","#f47420","#f3731f","#f3721e","#f2701d","#f26f1c","#f16e1b","#f16d1a","#f06c19","#f06b18","#ef6a17","#ef6916","#ee6815","#ed6714","#ed6614","#ec6513","#ec6312","#eb6211","#ea6110","#ea6010","#e95f0f","#e85e0e","#e85d0e","#e75c0d","#e65b0c","#e55a0c","#e4590b","#e4580b","#e3570a","#e25609","#e15509","#e05408","#df5308","#de5208","#dd5207","#dc5107","#db5006","#da4f06","#d94e06","#d84d05","#d74c05","#d64c05","#d54b04","#d44a04","#d24904","#d14804","#d04804","#cf4703","#cd4603","#cc4503","#cb4503","#c94403","#c84303","#c74303","#c54203","#c44103","#c24102","#c14002","#bf3f02","#be3f02","#bd3e02","#bb3e02","#ba3d02","#b83d02","#b73c02","#b53b02","#b43b02","#b23a03","#b13a03","#af3903","#ae3903","#ac3803","#ab3803","#aa3703","#a83703","#a73603","#a53603","#a43503","#a33503","#a13403","#a03403","#9f3303","#9d3303","#9c3203","#9b3203","#993103","#983103","#973003","#953003","#942f03","#932f03","#922e04","#902e04","#8f2d04","#8e2d04","#8d2c04","#8b2c04","#8a2b04","#892b04","#882a04","#862a04","#852904","#842904","#832804","#812804","#802704","#7f2704"];
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getDepartures), d3.max(tourism,getDepartures)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//expenditures
var greenAccessor = function(tourism) {
 
    var colors = ["#f7fcf5","#bfe6b8","#bee5b7","#bde5b6","#bbe4b5","#bae4b4","#b9e3b3","#b8e3b2","#b7e2b0","#b6e2af","#b5e1ae","#b3e1ad","#b2e0ac","#b1e0ab","#b0dfaa","#aedfa8","#addea7","#acdea6","#abdda5","#aadca4","#a8dca3","#a7dba2","#a6dba0","#a5da9f","#a3da9e","#a2d99d","#a1d99c","#9fd89b","#9ed799","#9dd798","#9bd697","#9ad696","#99d595","#97d494","#96d492","#95d391","#93d390","#92d28f","#91d18e","#8fd18d","#8ed08c","#8ccf8a","#8bcf89","#8ace88","#88cd87","#87cd86","#85cc85","#84cb84","#82cb83","#81ca82","#80c981","#7ec980","#7dc87f","#7bc77e","#7ac77c","#78c67b","#77c57a","#75c479","#74c478","#72c378","#71c277","#6fc276","#6ec175","#6cc074","#6bbf73","#69bf72","#68be71","#66bd70","#65bc6f","#63bc6e","#62bb6e","#60ba6d","#5eb96c","#5db86b","#5bb86a","#5ab769","#58b668","#57b568","#56b467","#54b466","#53b365","#51b264","#50b164","#4eb063","#4daf62","#4caf61","#4aae61","#49ad60","#48ac5f","#46ab5e","#45aa5d","#44a95d","#42a85c","#41a75b","#40a75a","#3fa65a","#3ea559","#3ca458","#3ba357","#3aa257","#39a156","#38a055","#379f54","#369e54","#359d53","#349c52","#339b51","#329a50","#319950","#30984f","#2f974e","#2e964d","#2d954d","#2b944c","#2a934b","#29924a","#28914a","#279049","#268f48","#258f47","#248e47","#238d46","#228c45","#218b44","#208a43","#1f8943","#1e8842","#1d8741","#1c8640","#1b8540","#1a843f","#19833e","#18823d","#17813d","#16803c","#157f3b","#147e3a","#137d3a","#127c39","#117b38","#107a37","#107937","#0f7836","#0e7735","#0d7634","#0c7534","#0b7433","#0b7332","#0a7232","#097131","#087030","#086f2f","#076e2f","#066c2e","#066b2d","#056a2d","#05692c","#04682b","#04672b","#04662a","#03642a","#036329","#026228","#026128","#026027","#025e27","#015d26","#015c25","#015b25","#015a24","#015824","#015723","#005623","#005522","#005321","#005221","#005120","#005020","#004e1f","#004d1f","#004c1e","#004a1e","#00491d","#00481d","#00471c","#00451c","#00441b"];
    
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getExpenditures), d3.max(tourism,getExpenditures)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//immigration
var purpleAccessor = function(tourism) {

    var colors = ["#fcfbfd","#bcbcdb","#aeadd3","#a19fcb","#9491c4","#8883bd","#7c73b4","#7261ab","#684ea2","#5e3b99","#552990","#4a1587", "#3f007d"];
    
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getIm), d3.max(tourism,getIm)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//diplom
var blackAccessor = function(tourism) {

    var colors = ["#ffffff","#f1f1f1","#f0f0f0","#f0f0f0","#efefef","#efefef","#eeeeee","#ededed","#ededed","#ececec","#ececec","#ebebeb","#eaeaea","#eaeaea","#e9e9e9","#e8e8e8","#e8e8e8","#e7e7e7","#e6e6e6","#e6e6e6","#e5e5e5","#e4e4e4","#e3e3e3","#e3e3e3","#e2e2e2","#e1e1e1","#e0e0e0","#e0e0e0","#dfdfdf","#dedede","#dddddd","#dddddd","#dcdcdc","#dbdbdb","#dadada","#dadada","#d9d9d9","#d8d8d8","#d7d7d7","#d6d6d6","#d6d6d6","#d5d5d5","#d4d4d4","#d3d3d3","#d2d2d2","#d1d1d1","#d1d1d1","#d0d0d0","#cfcfcf","#cecece","#cdcdcd","#cccccc","#cbcbcb","#cacaca","#c9c9c9","#c9c9c9","#c8c8c8","#c7c7c7","#c6c6c6","#c5c5c5","#c4c4c4","#c3c3c3","#c2c2c2","#c1c1c1","#c0c0c0","#bfbfbf","#bebebe","#bdbdbd","#bcbcbc","#bbbbbb","#bababa","#b9b9b9","#b8b8b8","#b6b6b6","#b5b5b5","#b4b4b4","#b3b3b3","#b2b2b2","#b1b1b1","#b0b0b0","#afafaf","#adadad","#acacac","#ababab","#aaaaaa","#a9a9a9","#a8a8a8","#a7a7a7","#a5a5a5","#a4a4a4","#a3a3a3","#a2a2a2","#a1a1a1","#9f9f9f","#9e9e9e","#9d9d9d","#9c9c9c","#9b9b9b","#9a9a9a","#989898","#979797","#969696","#959595","#949494","#939393","#919191","#909090","#8f8f8f","#8e8e8e","#8d8d8d","#8c8c8c","#8b8b8b","#8a8a8a","#888888","#878787","#868686","#858585","#848484","#838383","#828282","#818181","#808080","#7f7f7f","#7d7d7d","#7c7c7c","#7b7b7b","#7a7a7a","#797979","#787878","#777777","#767676","#757575","#747474","#737373","#727272","#717171","#6f6f6f","#6e6e6e","#6d6d6d","#6c6c6c","#6b6b6b","#6a6a6a","#696969","#686868","#676767","#666666","#656565","#646464","#636363","#626262","#606060","#5f5f5f","#5e5e5e","#5d5d5d","#5c5c5c","#5b5b5b","#5a5a5a","#595959","#575757","#565656","#555555","#545454","#535353","#525252","#505050","#4f4f4f","#4e4e4e","#4d4d4d","#4b4b4b","#4a4a4a","#494949","#484848","#464646","#454545","#444444","#424242","#414141","#404040","#3e3e3e","#3d3d3d","#3c3c3c","#3a3a3a","#393939","#383838","#363636","#353535","#343434","#323232","#313131","#303030","#2e2e2e","#2d2d2d","#2c2c2c","#2a2a2a","#292929","#282828","#262626","#252525","#242424","#232323","#212121","#202020","#1f1f1f","#1e1e1e","#1c1c1c","#1b1b1b","#1a1a1a","#191919","#181818","#161616","#151515","#141414","#131313","#121212","#101010","#0f0f0f","#0e0e0e","#0d0d0d","#0c0c0c","#0a0a0a","#090909","#080808","#070707","#060606","#050505","#030303","#020202","#010101","#000000"];
        
    
    var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
      .range(colors);
    
    var colorScaler = d3.scaleLinear().domain([d3.min(tourism,getDip), d3.max(tourism,getDip)]).range([0,1]);
    
    return [heatmapColour,colorScaler];
}

//worldliness
var redAccessor = function(tourism) {

    var colors = ["#fff5f0","#fdd1bf","#fdd0bd","#fdcfbc","#fdceba","#fdcdb9","#fdccb7","#fdcbb6","#fdc9b4","#fdc8b3","#fdc7b2","#fdc6b0","#fdc5af","#fdc4ad","#fdc2ac","#fdc1aa","#fdc0a8","#fcbfa7","#fcbea5","#fcbca4","#fcbba2","#fcbaa1","#fcb99f","#fcb89e","#fcb69c","#fcb59b","#fcb499","#fcb398","#fcb196","#fcb095","#fcaf94","#fcae92","#fcac91","#fcab8f","#fcaa8e","#fca98c","#fca78b","#fca689","#fca588","#fca486","#fca285","#fca183","#fca082","#fc9e81","#fc9d7f","#fc9c7e","#fc9b7c","#fc997b","#fc987a","#fc9778","#fc9677","#fc9475","#fc9374","#fc9273","#fc9071","#fc8f70","#fc8e6f","#fc8d6d","#fc8b6c","#fc8a6b","#fc8969","#fc8868","#fc8667","#fc8565","#fc8464","#fb8263","#fb8162","#fb8060","#fb7f5f","#fb7d5e","#fb7c5d","#fb7b5b","#fb795a","#fb7859","#fb7758","#fb7657","#fb7455","#fa7354","#fa7253","#fa7052","#fa6f51","#fa6e50","#fa6c4e","#f96b4d","#f96a4c","#f9684b","#f9674a","#f96549","#f86448","#f86347","#f86146","#f86045","#f75e44","#f75d43","#f75c42","#f65a41","#f65940","#f6573f","#f5563e","#f5553d","#f4533c","#f4523b","#f4503a","#f34f39","#f34e38","#f24c37","#f24b37","#f14936","#f14835","#f04734","#ef4533","#ef4433","#ee4332","#ed4131","#ed4030","#ec3f2f","#eb3d2f","#eb3c2e","#ea3b2d","#e93a2d","#e8382c","#e7372b","#e6362b","#e6352a","#e5342a","#e43229","#e33128","#e23028","#e12f27","#e02e27","#df2d26","#de2c26","#dd2b25","#dc2a25","#db2924","#da2824","#d92723","#d72623","#d62522","#d52422","#d42321","#d32221","#d22121","#d12020","#d01f20","#ce1f1f","#cd1e1f","#cc1d1f","#cb1d1e","#ca1c1e","#c91b1e","#c71b1d","#c61a1d","#c5191d","#c4191c","#c3181c","#c2181c","#c0171b","#bf171b","#be161b","#bd161a","#bb151a","#ba151a","#b91419","#b81419","#b61419","#b51319","#b41318","#b21218","#b11218","#b01218","#ae1117","#ad1117","#ac1117","#aa1017","#a91016","#a71016","#a60f16","#a40f16","#a30e15","#a10e15","#a00e15","#9e0d15","#9c0d14","#9b0c14","#990c14","#970c14","#960b13","#940b13","#920a13","#900a13","#8f0a12","#8d0912","#8b0912","#890812","#870811","#860711","#840711","#820711","#800610","#7e0610","#7c0510","#7a0510","#78040f","#76040f","#75030f","#73030f","#71020e","#6f020e","#6d010e","#6b010e","#69000d","#67000d"];
    
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
            setTitle("Arrivals per Country");
          
        });
        
        d3.select("#two")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getDepartures, orangeAccessor);
            setTitle("Departures per Country");
           
        });
        
        d3.select("#three")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getExpenditures, greenAccessor);
            setTitle("Expenditures per Country");
     
        });
        
        d3.select("#four")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getIm, purpleAccessor);
            setTitle("Immigrant Population per Country");
       
        });
        
        d3.select("#five")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getDip, blackAccessor);
            setTitle("Diplomatic Missions per Country");
       
        });
        
        d3.select("#six")
          .on("click", function()
        {
            clearPlot();
            makeMap(tourism, getWorld, redAccessor);
            setTitle("Calculated Worldliness per Country");
       
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
      .scale(100)
      .center([0,20])
      .translate([graph.width / 3, graph.height / 1.65]);
    
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
            //console.log(d.total);
            //d.total = countryImgs.get(d.id) || 0;
            //console.log(d.total);
            return heatmap(colorerer(d.total));
        });
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
            country.World = total / count;
        
            //now let's finally calculate this bad boy
            return (total / count).toFixed(2);
    
        });
        
        initButtons(tourism);
        makeMap(tourism, getArrivals, blueAccessor);
        setTitle("Arrivals per Country");
    }

    var failureFcn = function(errorMsg) //If there was an error
    {
        console.log("Something went wrong",errorMsg);
    }

    promise5.then(successFcn,failureFcn);
    
}

loadArrivals();