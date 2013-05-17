---
title: Quick start
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

When you're confident with the idea of ADP *and* if you're a bioinformatics guy, then you
should ask yourself how pseudoknots or the RNA-RNA interaction problem can be modelled
by context-free grammars. They can't! That's what multiple context-free grammars are for, and
adp-multi extends ADP by supporting the class of languages that MCFG generate.
Have a look at the slides of a talk I gave at the "10. Herbstseminar der Bioinformatik" (2012) called 
"[Predicting Pseudoknots Without Hacking in C]({{urls.media}}/talk_herbstseminar2012.pdf)".
Note that the adp-multi syntax in the slides is outdated.

## People coming from Haskell-ADP, ADPfusion, ADPC, GAP

If you are already familiar with the 
[Haskell implementation](https://bitbucket.org/gsauthof/adpcombinators) of regular ADP, then
have a look at
[tests/ADP/Tests/NestedExample.hs](https://github.com/adp-multi/adp-multi/blob/master/tests/ADP/Tests/NestedExample.hs)
where adp-multi is used with only one-dimensional parsers/nonterminals.
This is equal to the working of regular ADP and should be familiar
to you. The additional syntax overhead (`>>>` etc.) will be useful for higher dimensions.

## Integrated yield size analysis

Contrary to Haskell-ADP, adp-multi doesn't use different combinators for specifying the
yield sizes. Instead, a restricted yield size analysis is performed before running
the actual dynamic programming algorithm. Restricted, because it can't detect cycles
and would loop indefinitely if not told to stop. The special combinators `yieldSize1` and `yieldSize2` are used
for that case and have the effect that the minimum and maximum yield size of a nonterminal is
specified manually so that the automated yield size analysis is skipped and doesn't go into a loop.

## 2-dimensional nonterminals

If you haven't done so, now is a good time to [learn what MCFGs are](/mcfl). When you're
done, you can continue here.

For everything higher than one dimension you have to use a custom rewriting function for each grammar rule (instead of `id`).
As explained in the [MCFG page](/mcfl) there are two representations of multiple context-free grammars:
the original functional-style representation by 
[Seki et al. (1991)](http://www.sciencedirect.com/science/article/pii/030439759190374B) 
and the newer inlined-style one by [Wild (2010)](https://kluedo.ub.uni-kl.de/frontdoor/index/index/docId/2285).
As the functional-style representation fits better for implementation via parser combinators, this style
was chosen for adp-multi.

Have a look at
[tests/ADP/Tests/RGExample.hs](https://github.com/adp-multi/adp-multi/blob/master/tests/ADP/Tests/RGExample.hs)
and scroll to the bottom where the grammar is. You have to use `>>>` to combine a rule with its rewriting function.
At the moment there is no type-safety for rewriting functions, so be careful with the list
argument and return value (it will fail at run-time though). If you want more information on that, 
have a look at the [syntax page](/syntax).

As it is always good to learn by example, please have a look at the 
[Tests](https://github.com/adp-multi/adp-multi/tree/master/tests/ADP/Tests) folder.
There you will find:

Copy language:

- `CopyExample.hs` a grammar for the copy language L = { ww | w in {a,b}^* }
- `CopyTwoTrackExample.hs` a two-track grammar for the tupled copy language L = { (w,w) | w in {a,b}^* }

RNA secondary structure prediction:

- `NestedExample.hs` a grammar for nested RNA secondary structures (1-dim nonterminals)
- `RGExample.hs` a grammar for RNA sec. structures with [canonical simple recursive pseudoknots](http://www.biomedcentral.com/1471-2105/5/104/) (only the first canonization rule is used)
- `RGExampleDim2.hs` same as `RGExample.hs` but with 1-dim nonterminals encoded as 2-dim nonterminals (for testing purposes)
- `RGExampleStar.hs` same as `RGExample.hs` but with $(\mathcal{A}^*)^i$ used in signature instead of $\mathcal{A}$ and $(\mathcal{A},\mathcal{A})$
- `OneStructureExample.hs` a grammar for RNA [1-structures](http://bioinformatics.oxfordjournals.org/content/27/8/1076.full) (4 types of pseudoknots)
- `ZeroStructureTwoBackbonesExample.hs` a grammar for RNA [0-structures over two backbones](http://arxiv.org/pdf/1112.6194v1.pdf) (RNA-RNA interaction problem)
- `Nussinov.lhs` benchmark grammar using original Haskell-ADP, equal to `NestedExample.hs`

Sequence/tree alignment:

- `AlignmentExample.hs` [Needleman-Wunsch global alignment](http://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm) of two sequences
- `TreeAlignExample.hs` [Jiang-Wang-Zhang alignment](http://www.techfak.uni-bielefeld.de/ags/pi/lehre/PatTreesWS11/1-s2.0-0304397595800299-main.pdf) of two trees encoded as sequences (terms)

Auxiliary files:

- `Suite.hs` a small test suite
- `Main.hs` the entry point of the test executable, an easy way to try out things

## Higher dimensions

Although quite easily possible, higher dimensions haven't been implemented yet as
a more generic approach instead of implementing code for every dimension (which of course isn't possible)
hasn't been found yet. At least for the domain of RNA secondary structure
prediction, having more than two dimensions isn't needed for the current state of research.
See also "[Algebraic and Combinatorial Properties of Common RNA Pseudoknot Classes with Applications](http://wwwagak.cs.uni-kl.de/Veroffentlichungen/func-startdown/8.html)"
by Markus E. Nebel and Frank Weinberg (2012).