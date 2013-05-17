---
title : Syntax
description:
---

As explained in the [ADP for MCFL](/adp_for_mcfl) page, the main change compared to ADP for CFL is the addition of rewriting functions.

## This is how a nice syntax could look like

	S = nil  << empty
	  | left << B S
	  | pair << P S S       >> \ (p1,p2) s1 s2 -> p1 s1 p2 s2
	  | knot << K K S S S S >> \ (k11,k12) (k21,k22) s1 s2 s3 s4 -> k11 s1 k21 s2 k12 s3 k22 s4
	  ... h
	  
    B = base << 'a' | base << 'u' | base << 'c' | base << 'g'

	P = bpair << ('a','u')
	  | bpair << ('u','a')
	  | [...]
	  
	K = knot1 << P K >> \ (p1,p2) (k1,k2) -> (k1 p1, p2 k2)
	  | knot2 << P

Of course, rewriting functions should also be assignable to separate identifiers
to allow reuse:

	rewriteKnot1 (p1,p2) (k1,k2) = (k1 p1, p2 k2)
	K = knot1 << P K >> rewriteKnot1
	  | knot2 << P

## This is how it actually looks (at the moment)

	rewritePair, rewriteKnot :: Dim1 

	s = tabulated1 $
		yieldSize1 (0,Nothing) $
		nil  <<< empty         >>> id |||
		left <<< b ~~~ s       >>> id |||
		pair <<< p ~~~ s ~~~ s >>> (\ [p1,p2,s1,s2] -> [p1,s1,p2,s2]) |||
		knot <<< k ~~~ k ~~~ s ~~~ s ~~~ s ~~~ s >>> (\ [k11,k12,k21,k22,s1,s2,s3,s4] -> [k11,s1,k21,s2,k12,s3,k22,s4])
		... h
		
    b = tabulated1 $
        base <<< 'a' >>> id |||
        base <<< 'u' >>> id |||
        base <<< 'c' >>> id |||
        base <<< 'g' >>> id
		
	p = tabulated2 $
		bpair <<< ('a','u') >>> id2 |||
		bpair <<< ('u','a') >>> id2 |||
		[...]
		
	rewriteKnot1 :: Dim2
	rewriteKnot1 [p1,p2,k1,k2] = ([k1,p1],[p2,k2])
	
	k = tabulated2 $
		yieldSize2 (1,Nothing) (1,Nothing) $
		knot1 <<< p ~~~ k >>> rewriteKnot1 |||
		knot2 <<< p       >>> id2
	
## Differences explained

### `S` vs `s`

As the grammars use parser combinators, their non-terminals are functions.
In Haskell, variable identifiers (like a function identifier) must start
with a lower-case letter while constructor identifiers (like a data type)
must start with an upper-case letter. 
([Haskell 98 Lexical Structure](http://www.haskell.org/onlinereport/lexemes.html))

### `tabulated1` and `tabulated2`

ADP compilers like [GAP-C](http://gapc.eu) can do an automatic table design
analysis and then decide which non-terminals should be tabulated. As adp-multi
doesn't do any static analysis (except limited yield size analysis, see below)
the programmer explicitly has to state which tables should be tabulated. The
numbers in `tabulated1` and `tabulated2` specify the table dimensions which means
that `tabulated1` will use a two dimensional table and `tabulated2` will use
a four dimensional table.

*Note*: At the moment, choosing the wrong version of `tabulated*` doesn't yield to
        compilation but runtime errors. This typing problem is explained further
		below and should be solved in future versions.

### `|` vs `|||` and `<<` vs `<<<`

In Haskell, `|` is reserved as a keyword, and `||` is defined as a function in Prelude
which could theoretically be used (by hiding and redefining it, causing more trouble).
Although `|||` is also defined in `Control.Arrow`, the conflicts are limited to a minimum
which is why it is used.

Using `<<` would be possible but for reasons of symmetry to `|||` and `>>>`, it
is defined as `<<<`.

### `yieldSize1` and `yieldSize2` (or: How does yield size analysis work?)

The original Haskell-ADP implementation has several combinators to connect
two non-terminals (`~~~`,`-~~`,`~~-`,`+~~`,`~~+`,`+~+`,...). Those different
variants are necessary to tell the top-down parsing mechanism what the minimum
yield sizes are -- otherwise the subword ranges would never get smaller in a recursion,
leading to endless recursion.

In GAP-C this isn't necessary anymore because the compiler does a yield size analysis
and then knows the minimum and possibly maximum yield sizes of each nonterminal.

In adp-multi, a restricted yield size analysis was built in. Restricted means that
it doesn't handle cycles because this would require a full blown abstract syntax tree
analysis of the grammar (as in GAP-C). Therefore the grammar writer has to tell the
parser where the cycles are and then explicitly cut them off by using `yieldSize1` and
`yieldSize2`, respectively. Cutting off means that the minimum and maximum yield size
of a nonterminal is specified manually, therefore skipping the yield size analysis.

### `>>` vs `>>>`

For symmetry reasons, `>>>` was chosen for rewriting function.

### `>>` optional vs required

In original Haskell-ADP, the combinators for connecting two nonterminals were themselves
responsible for creating the right subword indices. In adp-multi, this isn't possible
anymore due to the rewriting functions. Therefore, the operator `>>>` is responsible
for creating all possible subword indices for a complete rule. In cases where no
rewriting is required, the `>>>` must still be applied with the identity function
so that the subword indices are generated. It is not yet clear if this could be
done implicitly by using Haskell's type classes.

### `\ (p1,p2) s1 s2` vs `\ [p1,p2,s1,s2]`

Having a rule like `val <<< p ~~~ p >>> rewrite` and making it typesafe means
that the two nonterminal parsers have to be applied one after another both
to `val` and `rewrite`. This seems rather complicated, considering that
each nonterminal parser can have a different dimension. I'm sure that this is
solvable with some advanced Haskell extensions like Type Families, GADTs, etc.

For now, to produce a working prototype, the type safety was loosened a bit and
lists are used in all such cases. This means that related errors
will only be detected at runtime.

If someone has hints on that, I would be very thankful!

## Why can't terminal symbols be included in rewriting functions?

The formalism of MCFGs allows to write rewriting functions like the following:

<div>$$
K \rightarrow g[K] \mid (a, b)\\
g[(x_1,x_2)] = (x_1 a, b x_2)
$$</div>

Another (less usual) way is:

<div>$$
K \rightarrow g[K,a,b] \mid (a, b)\\
g[(x_1,x_2),x_3,x_4] = (x_1 x_3, x_4 x_2)
$$</div>

or:

<div>$$
K \rightarrow g[K,(a,b)] \mid (a, b)\\
g[(x_1,x_2),(x_3,x_4)] = (x_1 x_3, x_4 x_2)
$$</div>

Only the last two ways can be used in adp-multi:

	k = val <<< 'a' ~~~ 'b' ~~~ k >>> g
	g [x3,x4,x1,x2] = ([x1,x3],[x4,x2])
	
and
	
	k = val <<< ('a','b') ~~~ k >>> g
	g [x3,x4,x1,x2] = ([x1,x3],[x4,x2])
		   
This little restriction made the implementation a lot easier and shouldn't cause any
real inconvenience. It might even help in more quickly recognizing all parts of
a rule without looking at the rewriting functions.
