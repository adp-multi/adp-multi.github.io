---
layout: page
permalink: /tabulation_1dim_naive/
title : Naive tabulation for 1-dim nonterminals
speed: 100
---

{% include tabulation_libs.html %}

The solution for subword $i..j$ is stored at $M[i,j]$ where $M$ is a two-dimensional matrix. This results in a triangular matrix and wastes nearly half the allocated space. Compare this with the corresponding [space-efficient strategy](/tabulation_1dim_triangular).

{% include tabulation_speed_slider.html %}

{% include tabulation_length_slider.html %}

<script>
Tabulation.prototype.solve = function(x1,x2,c) {
	this.addCubeDelayed(x1,x2,0,c);
}

Tabulation.prototype.fill = function() {
	var len = this.len;
	
	this.addBoundingBox(len+1,len+1,1);
	this.addText("i", len/2+1/2, -2, 0);
	this.addText(0, 0, -2, 0);
	this.addText(len, len, -2, 0);
	this.addText("j", -1.5, len/2, 0);
	this.addText(0, -1.7, 0, 0);
	this.addText(len, -1.7, len, 0);
	
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
	var tab = new Tabulation($(".post-content")[0], $( "#slider" ).slider("value"));
	tab.speed = {{page.speed}};
	tab.fill();
	window.tab = tab;
});
</script>