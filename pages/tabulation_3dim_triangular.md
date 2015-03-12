---
title : (partly) Space-efficient tabulation for 3-dim nonterminals
description:
speed: 20
---

{{> tabulation_libs }}

The solution for the subword triple $(i..j,k..l,m..n)$ is stored at $M[adr(i,j),adr(k,l),adr(m,n)]$ where $M$ is a three-dimensional matrix of size $(|w|+1)\cdot(|w|+2) / 2$ in all dimensions, and $adr(i,j) = i + (j\cdot(j+1)) \div 2$. Similar to the [two-dimensional case](/tabulation_2dim_triangular) space loss is caused by overlapping subwords.

**Hint**: Rotate and zoom with your left mouse button and scroll wheel!


{{> tabulation_speed_slider }}

{{> tabulation_length_slider }}

<script>
Tabulation.prototype.adr = function(i,j) {
	return i + Math.floor((j*(j+1)) / 2);
}

Tabulation.prototype.solve = function(x1,x2,x3,x4,x5,x6,c) {
	this.addCubeDelayed(this.adr(x1,x2), this.adr(x3,x4), this.adr(x5,x6), c);
}

Tabulation.prototype.fill = function() {
	var len = this.len;
	
	var l = (len+1)*(len+2)/2;
	this.addBoundingBox(l,l,l);
	this.addText(0, 0, -2, 0);
	this.addText(l-1, l-1, -2, 0);
	this.addText(0, -1.7, 0, 0);
	this.addText(l-1, -1.7, l-1, 0);
	this.addText(0, -1.7, -2, 0);
	this.addText(l-1, -1.7, -2, l-1);
	
	var c = 0;
	for (var l=0; l<=len; l++) {
		for (var x1=0; x1<=len-l; x1++) {
			var x2 = x1 + l;
			for (var l2=0; l2<=l; l2++) {
				for (var x3=0; x3 <= (l==l2 ? x1 : len-l2); x3++) {
					var x4 = x3 + l2;
					if (x3 >= x2 || x4 <= x1) {
						for (var l3=0; l3 <= l2; l3++) {
							for (var x5=0; x5 <= (l2==l3 ? x3 : len-l3); x5++) {
								var x6 = x5 + l3;
								if ((x3 >= x2 && (x5 >= x4 || x6 <= x1 || (x2 <= x5 && x6 <= x3))) ||
									(x4 <= x1 && (x5 >= x2 || x6 <= x3 || (x4 <= x5 && x6 <= x1))) ) {
									this.solve(x1, x2, x3, x4, x5, x6, c);
									c++;
									if (!(x3 == x5 && x4 == x6)) {
										this.solve(x1, x2, x5, x6, x3, x4, c);
										c++;
									}
									if (!(x1 == x3 && x2 == x4)) {
										this.solve(x3, x4, x1, x2, x5, x6, c);
										c++;
									}
									// this condition probably doesn't catch all duplicates
									if (!(x1 == x3 && x2 == x4 && x3 == x5 && x4 == x6 && x1 == x5 && x2 == x6)) {
										this.solve(x3, x4, x5, x6, x1, x2, c);
										c++;
									}
									// this condition probably doesn't catch all duplicates
									if (!(x1 == x3 && x2 == x4 && x3 == x5 && x4 == x6 && x1 == x5 && x2 == x6)) {
										this.solve(x5, x6, x1, x2, x3, x4, c);
										c++;
									}
									if (!(x1 == x5 && x2 == x6)) {
										this.solve(x5, x6, x3, x4, x1, x2, c);
										c++;
									}
								}
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
