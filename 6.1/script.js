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
        console.table(rows),
        console.log(rows);
    

                                                    //Mining for min and max
        var minCount = d3.min(rows, function(d){ 
            return d.count2012;
            }),

            maxCount = d3.max(rows, function(d){ 
            return d.count2012; 
            }); 
    

    
console.log(minCount,maxCount);
   var topDown = rows.sort(function(a,b){
            return b.count2012 - a.count2012;
        });
    var shortList = topDown.slice(0,5);
    
    
        //Scaling x and y axis   
        var scaleX = d3.scaleLinear()
                       .domain([minCount,maxCount])
                       .range([0,w]);
            scaleY = d3.scaleLinear()
                       .domain([0, 120])
                       .range([h,0]);
    
    console.log("domain", shortList.map(function(d){ return d.country; }));
    console.log("range", d3.range(0, w, w/shortList.length));
            countryScale = d3.scaleOrdinal()
                       .domain(shortList.map(function(d){ return d.country; }))
                       .range(d3.range(0, w, w/shortList.length ));

       

        var bars = plot.selectAll("rows")   // plot is considered the 'svg container'
                        .data(shortList)
                        .enter()
                        .append("rect")
                        .attr("x", function (d) { return countryScale(d.country); })
                        .attr("y", function(d) { return scaleY(d.count2012); })
                        .attr("height", function(d) { return h-scaleY(d.count2012); })
                        .attr("width", 30);
    
    
        bars.append('text')
                        .text(function(d){return d.code});

    //Represent: axis
        var axisX = d3.axisBottom()
                        .scale(countryScale )
                        .tickSize(-h);
        var axisY = d3.axisLeft()
                        .scale(scaleY)
                        .tickSize(-w);
        plot.append('g').attr('class','axis axis-x')
                        .attr('transform','translate(0,'+h+')')
                        .call(axisX);
        plot.append('g').attr('class','axis axis-y').call(axisY);
}

