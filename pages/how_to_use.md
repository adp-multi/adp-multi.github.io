---
title : How To Use
description:
---

## Notes on examples

The examples referenced below are related to RNA secondary structure prediction
because this is where the ADP method is mainly used at the moment.

## People coming from Haskell-ADP

If you are already familiar with the
[Haskell implementation](https://bitbucket.org/gsauthof/adpcombinators) of regular ADP, then
have a look at `tests/ADP/Tests/NestedExample.hs` where adp-multi is used with 
only one-dimensional parsers/nonterminals.
This is equal to the working of regular ADP and should be familiar
to you. The additional syntax overhead (>>> etc.) will be useful for higher dimensions.

## 2-dimensional nonterminals

## Higher dimensions

Although quite easily possible, higher dimensions haven't been implemented yet as
I want to find a more generic approach instead of implementing code for every dimension
(which of course isn't possible).

At least for the domain of RNA secondary structure prediction having more than
two dimensions isn't needed at the current state of research. See also 