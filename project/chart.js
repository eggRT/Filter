var canvas_obj = ''
var ctx_obj = ''

function create_chart_el(){
	canvas_obj = document.getElementById("chart");
	canvas_obj.width = 300;
	canvas_obj.height = 300;
	ctx_obj = canvas_obj.getContext("2d")
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function PieChart(parametrs){
	this.parametrs = parametrs;
	this.canvas = canvas_obj;
	this.ctx = ctx_obj;
	this.colors = parametrs.colors;
	
	this.draw = function(){
		var total_value = 0;
		var color_index = 0;
		for (var categ in this.parametrs.data){
			var val = this.parametrs.data[categ];
			total_value += val;
		}
		var start_angle = 0;
		for (categ in this.parametrs.data){
			val = this.parametrs.data[categ];
			var slice_obj = 2 * Math.PI * val / total_value
			
			drawPieSlice(
				this.ctx,
				this.canvas.width/2,
				this.canvas.height/2,
				Math.min(this.canvas.width/2,this.canvas.height/2),
				start_angle,
				start_angle + slice_obj,
				this.colors[color_index%this.colors.length]
			);
			
			start_angle += slice_obj
			color_index++
		}
	}
}

