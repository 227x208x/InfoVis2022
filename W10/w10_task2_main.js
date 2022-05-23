d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:50, right:50, bottom:50, left:50}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 512,
            height: config.height || 512,
            margin: config.margin || {top:50, right:50, bottom:50, left:50}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

	self.text = self.svg.append("text")
	    .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`)
	    .attr("x",170)
	    .attr("y",-20)
	    .attr("font-size","20pt")
	    .attr("text-anchor","top")
	    .attr("font-weight", 600)
	    .text("Sample Data");
	
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [0, self.inner_height] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(1);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

	self.yaxis = d3.axisLeft( self.yscale )
	    .ticks(1);

	self.yaxis_group = self.chart.append('g')
	    .attr('transform', `translate(0,0)`);
	
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0,200] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [200,0] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r )
	    .on('mouseover', (e,d) => {
		d3.select('#tooltip')
		    .style('opacity', 1)
		    .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
	    })
	    .on('mousemove', (e) => {
		const padding = 10;
		d3.select('#tooltip')
		    .style('left', (e.pageX + padding) + 'px')
		    .style('top', (e.pageY + padding) + 'px');
	    })
	    .on('mouseleave', () => {
		d3.select('#tooltip')
		    .style('opacity', 0);
	    });
	
        self.xaxis_group
            .call( self.xaxis )
	    .append("text")
	    .attr("fill", "black")
	    .attr("x",200)
	    .attr("y", 30)
	    .attr("text-anchor", "middle")
	    .attr("font-size","10pt")
	    .attr("font-weight", "middle")
	    .text("x-label");
	
	self.yaxis_group
	    .call( self.yaxis )
	    .append("text")
	    .attr("fill", "black")
	    .attr("x",-30)
	    .attr("y",200)
	    .attr("text-anchor", "middle")
	    .attr("font-size","10pt")
	    .attr("font-weight", "middle")
	    .text("y-label");
	
    }
}
