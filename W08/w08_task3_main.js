d3.csv("https://227x208x.github.io/InfoVis2022/W08/task3_data.csv")
    .then( data => {
	data.forEach( d =>  {d.value = +d.value;});

	var config = {
	    parent: '#drawing_region',
	    width: 256,
	    height: 256,
	    radius: Math.min(256, 256) / 2
	};

	const pie_chart = new PieChart( config, data );
	pie_chart.update();
    })
    .catch( error => {
	console.log( error );
    });

class PieChart{

    constructor( config, data ){
	this.config = {
	    parent: config.parent,
	    width: config.width || 256,
	    height: config.height || 256,
	    radius: config.radius || Math.min( 256, 256 ) / 2
	}
	this.data = data;
	this.init();
    }

    init() {
	let self = this;

	self.svg = d3.select( self.config.parent )
	    .attr('width', self.config.width)
	    .attr('height', self.config.height)
	    .append('g')
	    .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

	self.pie = d3.pie()
	    .value( d => d.value );

	self.arc = d3.arc()
	    .innerRadius(self.config.radius/2)
	    .outerRadius(self.config.radius);

    }

    update() {
	let self = this;

	self.render();
    }

    render() {
	let self = this;

	self.svg.selectAll("pie")
	    .data(self.pie(self.data))
	    .enter()
	    .append("path")
	    .attr("d",self.arc)
	    .attr("fill", "black")
	    .attr("stroke", "white")
	    .style("stroke-width", "2px")
    }
}
