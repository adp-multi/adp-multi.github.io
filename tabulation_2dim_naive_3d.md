---
layout: page
permalink: /tabulation_2dim_naive_3d/
title : Naive tabulation for 2-dim nonterminals (alternative visualization)
speed: 20
---

{% include tabulation_libs.html %}

The solution for the subword pair $(i..j,k..l)$ is stored at $M[i,j,k,l]$ where $M$ is a four-dimensional matrix. This results in severe space loss as the cells representing invalid subwords ($i>j$ or $k>l$) or overlapping subwords are never filled. Compare this with [the strategy that eliminates the space loss of invalid subwords](/tabulation_2dim_triangular).

The visualization fixes the first index of the first subword and then displays the three-dimensional matrix for it. See also an [alternative visualization](/tabulation_2dim_naive).

**Hint**: Rotate and zoom with your left mouse button and scroll wheel!

{% include tabulation_speed_slider.html %}

{% include tabulation_length_slider.html %}

<div style="clear:both; float:left; margin-right:20px; width: 150px">
	First index:
	<span id="index" style="font-weight: bold;" />
</div>
<div id="slider-index" style="float: left; width:100px; margin-top:6px"></div>

<script>
$( "#slider" ).on( "slide", function( event, ui ) {
	if ($( "#slider-index" ).slider( "value" ) > ui.value) {
		$( "#slider-index" ).slider( "value", ui.value);
	}
	$( "#slider-index" ).slider( "option", { 
		max: ui.value
	} );
} );

$(function() {
	$( "#slider-index" ).slider({
		value:2,
		min: 0,
		max: 4,
		slide: function( event, ui ) {
			$( "#index" ).text( ui.value );
			window.tab.freshScene();
			window.tab.fill(ui.value);
		},
		// for programmatic slider changes
		change: function( event, ui ) {
			$( "#index" ).text( ui.value );
		}
	});
	$( "#index" ).text( $( "#slider-index" ).slider( "value" ) );
});
</script>

<script>
Tabulation.prototype.solve = function(x1,x2,x3,c) {
	this.addCubeDelayed(x1,x2,x3,c);
}

Tabulation.prototype.fill = function(y1) {
	if (typeof y1 === 'undefined') {
		y1 = $( "#slider-index" ).slider( "value" );
	}	
	var len = this.len;
	
	this.addBoundingBox(len+1,len+1,len+1);
	this.addText("j", len/2+1/2, -2, 0);
	this.addText(0, 0, -2, 0);
	this.addText(len, len, -2, 0);
	this.addText("k", -1.5, len/2, 0);
	this.addText(0, -1.7, 0, 0);
	this.addText(len, -1.7, len, 0);
	this.addText("l", -1.5, -2, len/2);
	this.addText(0, -1.7, -2, 0);
	this.addText(len, -1.7, -2, len);
	
	var c = 0;
	for (var l=0; l<=len; l++) {
		for (var x1=0; x1<=len-l; x1++) {
			var x2 = x1 + l;
			for (var l2=0; l2<=l; l2++) {
				for (var x3=0; x3 <= (l==l2 ? x1 : len-l2); x3++) {
					var x4 = x3 + l2;
					if (x3 >= x2 || x4 <= x1) {
						if (y1 == x1) {
							this.solve(x2, x3, x4,c);
							c++;
						}
						if (x3 == y1) {
							if (!(x1 == x3 && x2 == x4)) {
								this.solve(x4, x1, x2, c);
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
	var tab = new Tabulation($(".post-content")[0], $( "#slider" ).slider("value"));
	tab.speed = {{page.speed}};
	tab.fill();
	window.tab = tab;
});
</script>