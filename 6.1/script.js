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
    
//        rows.slice(0,5);
//        rows.sort(function(b,a){
//            return b.count2012 - a.count2012;
//        })

                                                    //Mining for min and max
        var minCount = d3.min(rows, function(d){ 
            return d.count2012;
            }),

            maxCount = d3.max(rows, function(d){ 
            return d.count2012; 
            }); 
    
        console.log(minCount,maxCount);
   
    
                                                    //Scaling x and y axis   
        var scaleX = d3.scaleLinear()
                       .domain([minCount,maxCount])
                       .range([0,w]);
            scaleY = d3.scaleLinear()
                       .domain([0, 100])
                       .range([h,0]);

       
        var shortList = rows.slice(0,5);
        var topDown=shortList.sort(function(b,a){
            return b.count2012 - a.count2012; 
        })

        var barWidth = w/topDown.length;
        
    
    var bars = plot.selectAll("rect")   // plot is considered the 'svg container'
                        .data(topDown)
                        .enter()
                        .append("rect")
                        .attr("x", function (d) { return (d.count2012*5); })
                        .attr("y", function(d) { return scaleY(d.count2012); })
                        .attr("height", function(d) { return h - scaleY(d.count2012); })
                        .attr("width", barWidth - 1);
    
//                plot.append("text")
//                        .attr("x", function (d) { 
//                                return (d.count2012*5); })
//                        .attr("y", function(d) { return                           scaleY(d.count2012) + 60; })
//                        .attr("dy", ".75em"); 
    
}