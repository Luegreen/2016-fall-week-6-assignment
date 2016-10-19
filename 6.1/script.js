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
   
    
                                                    //Scaling x and y axis   
        var scaleX = d3.scaleLinear()
                       .domain([minCount,maxCount])
                       .range([0,w]);
            scaleY = d3.scaleLinear()
                       .domain([0, 100])
                       .range([h,0]);
        
        console.log(scaleX,scaleY);
    
//        rows.sort(function(b,a){
//            return b.count2012 - a.count2012;
//        })
//    
//
//        
//        rows.slice(0,5);


        rows.forEach(function(country, i){
            plot.append('rect')
                .attr("x",m.l+ i*100)
                .attr("y",300-scaleY(country.count2012))
                .attr("width", 40)
                .attr("height",scaleY(country.count2012));
            
            console.log(scaleY(country.count2012));
            
            plot.append('text')
                .attr('x',i * 100 +m.l +m.r/2)
                .attr('y',330)
                .text(country.countryName)
                .attr('text-anchor','middle');
            
        for(var y = 0; y <= h; y += 20){
            plot.append('line').attr('class','axis')
            .attr('x1',0)
            .attr('x2',w*2)
            .attr('y1',y)
            .attr('y2',y);
        }
        })  
    
}
        
    
//    rows.forEach(function(country, i){
//        var bar = plot.selectAll("div");
//        .data(i)
//        .enter()
//        plot.append('div')
//            .style("width", function(d) { return x(d) + //"px"; })
//    .text(function(d) { return d; });
//    });
//    
//    
//    
//    var bar = plot.selectAll(".bar")
//    .data(bin.enter().append("g"))
//    .attr("class", "bar")
//    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });
//
//bar.append("rect")
//    .attr("x", 1)
//    .attr("w", x(plot[].x1) - x(plot[].x0) - 1)
//    .attr("h", function(d) { return h - y(d.length); });
//
//bar.append("text")
//    .attr("dy", ".75em")
//    .attr("y", 6)
//    .attr("x", (x(plot[].x1) - x(plot[].x0)) / 2)
//    .attr("text-anchor", "middle")
//    .text(function(d) { return formatCount(d.length); });
//
//plot.append("g")
//    .attr("class", "axis axis--x")
//    .attr("transform", "translate(0," + h + ")")
//    .call(d3.axisBottom(x));
//
//    
//
//
//  
//  } }
