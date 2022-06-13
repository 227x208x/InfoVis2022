d3.csv("/Users/kusachihisashishirou/documents/classnote1/Infoviz/Final_task/cinema.csv")
    .then( data => {
	data.forEach( d =>  {d.year = +d.year; d.audience = +d.audience;});

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
