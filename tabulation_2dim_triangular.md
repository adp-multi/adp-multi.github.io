---
layout: page
permalink: /tabulation_2dim_triangular/
title : (partly) Space-efficient tabulation for 2-dim nonterminals
speed: 50
---

{% include tabulation_libs.html %}

The solution for the subword pair $(i..j,k..l)$ is stored at $M[adr(i,j),adr(k,l)]$ where $M$ is a two-dimensional matrix of size $(\|w\|+1)\cdot(\|w\|+2) / 2$ in both dimensions, and $adr(i,j) = i + (j\cdot(j+1)) \div 2$. This partially eliminates the space loss of the [naive strategy](/tabulation_2dim_naive) -- while overlapping subwords still cause space loss (see the holes in the matrix).

**Hint**: Zoom out with your mouse scroll wheel for bigger word lengths!

{% include tabulation_speed_slider.html %}

{% include tabulation_length_slider.html %}

<script>
Tabulation.prototype.adr = function(i,j) {
	return i + Math.floor((j*(j+1)) / 2);
}

Tabulation.prototype.solve = function(x1,x2,x3,x4,c) {
	this.addCubeDelayed(this.adr(x1,x2), this.adr(x3,x4), 0, c);
}

Tabulation.prototype.fill = function() {
	var len = this.len;
	
	var l = (len+1)*(len+2) / 2;
	this.addBoundingBox(l,l,1);
	this.addText(0, 0, -2, 0);
	this.addText(l-1, l-1, -2, 0);
	this.addText(0, -1.7, 0, 0);
	this.addText(l-1, -1.7, l-1, 0);
	
	var c = 0;
	for (var l=0; l<=len; l++) {
		for (var x1=0; x1<=len-l; x1++) {
			var x2 = x1 + l;
			for (var l2=0; l2<=l; l2++) {
				for (var x3=0; x3 <= (l==l2 ? x1 : len-l2); x3++) {
					var x4 = x3 + l2;
					if (x3 >= x2 || x4 <= x1) {
						this.solve(x1, x2, x3, x4,c);
						c++;
						if (!(x1 == x3 && x2 == x4)) {
							this.solve(x3, x4, x1, x2, c);
							c++;
						}
					}
				}
			}
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
