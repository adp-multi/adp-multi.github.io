---
title : Naive tabulation for 2-dim nonterminals
description:
speed: 100
---

{{> tabulation_libs }}

The solution for the subword pair $(i..j,k..l)$ is stored at $M[i,j,k,l]$ where $M$ is a four-dimensional matrix. This results in severe space loss as the cells representing invalid subwords ($i>j$ or $k>l$) or overlapping subwords are never filled. Compare this with [the strategy that eliminates the space loss of invalid subwords](/tabulation_2dim_triangular).

The visualization fixes the first subword and then displays the two-dimensional matrix for it. See also an [alternative visualization](/tabulation_2dim_naive_3d).

{{> tabulation_speed_slider }}

{{> tabulation_length_slider }}

{{> tabulation_subword_slider }}

<script>
Tabulation.prototype.solve = function(x1,x2,c) {
	this.addCubeDelayed(x1,x2,0,c);
}

Tabulation.prototype.fill = function(y1, y2) {
	if (typeof y1 === 'undefined') {
		var y1 = $( "#slider-range" ).slider( "values", 0 );
		var y2 = $( "#slider-range" ).slider( "values", 1 );
	}

	var len = this.len;
	
	this.addBoundingBox(len+1,len+1,1);
	this.addText("k", len/2+1/2, -2, 0);
	this.addText(0, 0, -2, 0);
	this.addText(len, len, -2, 0);
	this.addText("l", -1.5, len/2, 0);
	this.addText(0, -1.7, 0, 0);
	this.addText(len, -1.7, len, 0);
	
	var c = 0;
	for (var l=0; l<=len; l++) {
		for (var x1=0; x1<=len-l; x1++) {
			var x2 = x1 + l;
			for (var l2=0; l2<=l; l2++) {
				for (var x3=0; x3 <= (l==l2 ? x1 : len-l2); x3++) {
					var x4 = x3 + l2;
					if (x3 >= x2 || x4 <= x1) {
						if (y1 == x1 && y2 == x2) {
							this.solve(x3, x4,c);
							c++;
						}
						if (x3 == y1 && x4 == y2) {
							if (!(x1 == x3 && x2 == x4)) {
								this.solve(x1, x2, c);
								c++;
							}
						}
					}
				}
			}
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