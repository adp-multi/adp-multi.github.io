---
layout: page
permalink: /tabulation/
title : Tabulation
---

On this page, several tabulation strategies are visualized using WebGL. The order of the animations reflect one possible kind of table-filling loops (see the source code of each example and look for the Tabulation.prototype.fill function). The main purpose however is to illustrate how much space is wasted in different storage schemes. For example, by storing a triangular matrix for a 1-dim nonterminal as a packed array, nearly half the space can be saved.

[1-dim nonterminal (naive)](/tabulation_1dim_naive)

[1-dim nonterminal (space-efficient)](/tabulation_1dim_triangular)

[2-dim nonterminal (naive)](/tabulation_2dim_naive)

[2-dim nonterminal (naive, alternative visualization)](/tabulation_2dim_naive_3d)

[2-dim nonterminal (partly space-efficient)](/tabulation_2dim_triangular)

[3-dim nonterminal (partly space-efficient)](/tabulation_3dim_triangular)

In adp-multi, the naive and (partly) space-efficient schemes for one- and two-dimensional nonterminals are implemented.