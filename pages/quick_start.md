---
title : Quick start
description:
---

This quick start guide will introduce you to adp-multi (and ADP if you don't know it yet)
and points out differences to the original Haskell-ADP implementation.

## Notes on examples

The examples referenced below are related to RNA secondary structure prediction
because this is where the ADP method is mainly used at the moment.

## People coming from hand-written dynamic programming code

Welcome stranger! It's always nice to have new company around. Before you continue
reading the next sections, please have a look at the ADP
[online course](http://bibiserv.techfak.uni-bielefeld.de/cgi-bin/dpcourse) or
the [tutorial-style paper](http://dx.doi.org/10.1016/j.scico.2003.12.005) from its inventors.

When you're confident with the idea of ADP *and* if you're a bio informatics guy, then you
should ask yourself how pseudoknots or the RNA-RNA interaction problem can be modelled
by context-free grammars. They can't! That's what multiple context-free grammars are for, and
adp-multi extends ADP by supporting them directly.

## People coming from Haskell-ADP, ADPfusion, ADPC, GAP

If you are already familiar with the
[Haskell implementation](https://bitbucket.org/gsauthof/adpcombinators) of regular ADP, then
have a look at
[tests/ADP/Tests/NestedExample.hs](https://github.com/neothemachine/adp-multi/blob/master/tests/ADP/Tests/NestedExample.hs)
where adp-multi is used with only one-dimensional parsers/nonterminals.
This is equal to the working of regular ADP and should be familiar
to you. The additional syntax overhead (`>>>` etc.) will be useful for higher dimensions.

## Integrated yield size analysis

Contrary to Haskell-ADP, we don't use different combinators for specifying the
yield sizes. Instead, a restricted yield size analysis is performed before running
the actual dynamic programming algorithm. Restricted, because it can't detect cycles
and would loop indefinitely if not told to stop. The special combinator `~~~|` is used
for that case which means that the symbol on the right side of the combinator shouldn't be
considered when calculating the yield size. The symbol is then assumed to have a minimum yield
size of 0 and an unknown maximum yield size.

## 2-dimensional nonterminals

If you haven't done so, now is a good time to [learn about what MCFGs are](/mcfg). When you're
done, you can continue here.

For everything higher than one dimension you have to use a rewriting function for each grammar rule.
As explained in the [MCFG page](/mcfg) there are two representations of multiple context-free grammars:
the original functional-style representation by 
[Seki et al. (1991)](http://www.sciencedirect.com/science/article/pii/030439759190374B) 
and the newer inlined-style one by [Wild (2010)](https://kluedo.ub.uni-kl.de/frontdoor/index/index/docId/2285).
As the functional-style representation fits better for implementing it via parser combinators, this form
was chosen for adp-multi.

Have a look at
[tests/ADP/Tests/RGExample.hs](https://github.com/neothemachine/adp-multi/blob/master/tests/ADP/Tests/RGExample.hs)
and scroll to the bottom where the grammar is. Depending on the dimension of the nonterminal,
you have to use either `>>>|` or `>>>||` to combine a rule with its rewriting function.
At the moment there is no type-safety for rewriting functions, so be careful with the list
argument and return value (it will fail at run-time though). If you want more information on that, 
have a look at the [syntax page](/syntax).

## Higher dimensions

Although quite easily possible, higher dimensions haven't been implemented yet as
a more generic approach instead of implementing code for every dimension (which of course isn't possible)
hasn't been found yet. At least for the domain of RNA secondary structure
prediction, having more than two dimensions isn't needed for the current state of research.
See also "[Algebraic and Combinatorial Properties of Common RNA Pseudoknot Classes with Applications](http://wwwagak.cs.uni-kl.de/Veroffentlichungen/func-startdown/8.html)"
by Markus E. Nebel and Frank Weinberg.