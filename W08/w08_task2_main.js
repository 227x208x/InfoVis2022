d3.csv("https://227x208x.github.io/InfoVis2022/W08/task2_data.csv")
    .then( data => {
	data.forEach( d =>  {d.x = +d.x; d.y = +d.y;});

	var config = {
	    parent: '#drawing_region',
	    width: 256,
	    height: 128
	};

	const line_chart = new LineChart( config, data );
	line_chart.update();
    })
    .catch( error => {
	console.log( error );
    });

class LineChart{

    constructor( config, data ){
	this.config = {
	    parent: config.parent,
	    width: config.width || 256,
	    height: config.height || 128
	}
	this.data = data;
	this.init();
    }

    init() {
	let self = this;

	self.svg = d3.select( self.config.parent )
	    .attr('width', self.config.width)
	    .attr('height', self.config.height);

	self.area = d3.area()
	    .x(d => d.x)
	    .y1(d => d.y)
	    .y0( d3.max(self.data, d => d.y) + 10);
    }

    update() {
	let self = this;

	self.render();
    }

    render() {
	let self = this;

	self.svg.append('path')
	    .attr('d', self.area(self.data))
	    .attr('stroke', 'black')
	    .attr('fill', 'black');
    }
}
