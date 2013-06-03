---
title : (partly) Space-efficient tabulation for 2-dim nonterminals
description:
speed: 50
---

{{> tabulation_libs }}

The solution for the subword pair $(i..j,k..l)$ is stored at $M[adr(i,j),adr(k,l)]$ where $M$ is a two-dimensional matrix and $adr(i,j) = |w|\cdot i - (i\cdot(i-1)) \div 2 + j$. This partially eliminates the space loss of the [naive strategy](/tabulation_2dim_naive) -- while overlapping subwords still cause space loss (see the holes in the matrix).

**Hint**: Zoom out with your mouse scroll wheel for bigger word lengths!

{{> tabulation_speed_slider }}

{{> tabulation_length_slider }}

<script>
Tabulation.prototype.adr = function(i,j) {
	//console.log(i + "," + j + " -> " + (this.len*i - Math.floor((i*(i-1)) / 2) + j));
	return this.len*i - Math.floor((i*(i-1)) / 2) + j;
}

Tabulation.prototype.solve = function(x1,x2,x3,x4,c) {
	this.addCubeDelayed(this.adr(x1,x2), this.adr(x3,x4), 0, c);
}

Tabulation.prototype.fill = function() {
	var len = this.len;
	
	var l = (len+1)*(len+2) / 2;
	this.addBoundingBox(l,l,1);
	
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
	var tab = new Tabulation($(".content")[0], $( "#slider" ).slider("value"));
	tab.speed = {{page.speed}};
	tab.fill();
	window.tab = tab;
});
</script>