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
	    .x(d => d.year + 10)
	    .y1(d => d.audience)
	    .y0( d3.max(self.data, d => d.audience) + 10);

	self.inner_width = self.config.width;
	self.inner_height= self.config.height;

	self.xscale = d3.scaleLinear()
	    .range([0,self.inner_width] );

	self.yscale = d3.scaleBand()
	    .range([0,self.inner_height])
	    .paddingInner(0.1);

	self.xaxis = d3.axisBottom(self.xscale)
	    .ticks(5)
	    .tickSizeOuter(0);

	self.yaxis = d3.axisLeft(self.yscale)
	    .tickSizeOuter(0);

	self.xaxis_group = self.svg.append('g')
	    .attr('transform', `translate(0, ${self.inner_height})`);
	
	self.yaxis_group = self.svg.append('g')
	    .attr('transform', `translate(0,0)`);
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
	self.xaxis_group
	    .call( self.xaxis );
	self.yaxis_group
	    .call( self.yaxis );
    }
}
