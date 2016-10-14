console.log('6.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');


//var width = 420,
//    barHeight = 20;
//
//var x = d3.scaleLinear()
//    .range([0, width]);
//
//var chart = d3.select(".chart")
//    .attr("width", width);


//Import data and parse
d3.csv('../data/olympic_medal_count.csv', parse,dataLoaded);

function parse(d){
return {
    country: d.Country,
    count1900: +d['1900'],
    count1960: +d['1960'],
    count2012: +d['2012']
    
  }
}

function dataLoaded(err,rows){
    console.table(rows); 


////Mining for min and max
var minCount = d3.min(rows, function(d){ 
    //   console.log(d);
        return d.count2012;
    }),

    maxCount = d3.max(rows, function(d){ 
        return d.count2012; 
    }); 
    
    console.log(minCount,maxCount);
   
    
    
    var scaleX = d3.scaleLinear(),
        scaleY = d3.scaleLinear();
    
    var y =scaleY.domain([0, maxCount])
        .range([h,0]);
    
    var x = scaleX.domain([minCount,200])
        .range([0,w]);
    
    var data = d3.range(1000).map(d3.randomBates(10));
    
    var formatCount = d3.format(",.0f");
    
        var bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(20))
    (data);
    
    var bar = plot.selectAll(".bar")
    .data(bins)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

bar.append("rect")
    .attr("x", 1)
    .attr("w", x(bins[0].x1) - x(bins[0].x0) - 1)
    .attr("h", function(d) { return h - y(d.length); });

bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatCount(d.length); });

plot.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + h + ")")
    .call(d3.axisBottom(x));

    
//    rows.forEach(function(country, i){
//        plot.append('rect')
//            .attr("x")
//            .attr(y)
//            .attr("width", function(d) { return d(d.value); })
//            .attr("height", barHeight - 1);

  
    }
