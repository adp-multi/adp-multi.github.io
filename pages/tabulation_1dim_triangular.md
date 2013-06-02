---
title : Space-efficient tabulation for 1-dim nonterminals
description:
speed: 100
---

{{> tabulation_libs }}

The solution for subword $i..j$ is stored at $M[|w|\cdot i - (i\cdot(i-1)) \div 2 + j]$ where $M$ is a one-dimensional array. This completely eliminates the space loss of the [naive strategy](/tabulation_1dim_naive).

{{> tabulation_speed_slider }}

{{> tabulation_length_slider }}

<script>
Tabulation.prototype.adr = function(i,j) {
	//console.log(i + "," + j + " -> " + (this.len*i - Math.floor((i*(i-1)) / 2) + j));
	return this.len*i - Math.floor((i*(i-1)) / 2) + j;
}

Tabulation.prototype.solve = function(x1,x2,c) {
	this.addCubeDelayed(this.adr(x1,x2), 0, 0,c);
}

Tabulation.prototype.fill = function() {
	var len = this.len;
	
	this.addBoundingBox((len+1)*(len+2) / 2,1,1);
	
	var c = 0;
	for (var l=0; l<=len; l++) {
		for (var x1=0; x1<=len-l; x1++) {
			var x2 = x1 + l;
			this.solve(x1,x2,c);
			c++;
		}
	}
	setTimeout(function(){console.log("subproblems: " + c)}, 100);
}


$(function() {
	var tab = new Tabulation($(".content")[0], $( "#slider" ).slider("value"));
	tab.speed = {{page.speed}};
	tab.fill();
	window.tab = tab;
});
</script>