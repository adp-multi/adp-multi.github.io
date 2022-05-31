---
layout: page
permalink: /tabulation_1dim_triangular/
title : Space-efficient tabulation for 1-dim nonterminals
speed: 100
---

{% include tabulation_libs.html %}

The solution for subword $i..j$ is stored at $M[i + (j\cdot(j+1)) \div 2]$ where $M$ is a one-dimensional array of size $(\|w\|+1)\cdot(\|w\|+2) / 2$. This completely eliminates the space loss of the [naive strategy](/tabulation_1dim_naive).

{% include tabulation_speed_slider.html %}

{% include tabulation_length_slider.html %}

<script>
Tabulation.prototype.adr = function(i,j) {
	return i + Math.floor((j*(j+1)) / 2);
}

Tabulation.prototype.solve = function(x1,x2,c) {
	this.addCubeDelayed(this.adr(x1,x2), 0, 0,c);
}

Tabulation.prototype.fill = function() {
	var len = this.len;
	
	var l = (len+1)*(len+2) / 2;
	this.addBoundingBox(l,1,1);
	this.addText(0, 0, -2, 0);
	this.addText(l-1, l-1, -2, 0);
	
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
