---
title : Multiple Context-Free Grammars
description:
---

## Mildly context-sensitive languages

> Mild context-sensitivity is defined in terms of sets of languages. A set of languages is mildly context-sensitive if and only if  
> 1. it contains all context-free languages,  
> 2. it admits limited cross-serial dependencies,  
> 3. all the languages are parsable in polynomial time, and  
> 4. all the languages have constant growth; this means that the distribution of string lengths should be linear rather than supralinear.  
([Wikipedia](http://en.wikipedia.org/wiki/Mildly_context-sensitive_language))

One example of such a language formalism is the class of *multiple context-free grammars*.
This class is a restricted instance of *generalized context-free grammars*.

## Generalized context-free grammars (GCFG)

A GCFG G = (N, T, F, P, S) consist of a set of composition functions F and a set of rewrite rules P.
N are non-terminals, T terminals, and S the start symbol.

Composition functions have the form `$f[(x_1, ..., x_m), (y_1, ..., y_n), ...] = \gamma$`,
where $\gamma$ is either a string tuple or an application of a composition function.

Rewrite rules have the form $X \rightarrow$ f(Y, Z, ...)$,
where Y, Z, ... are string tuples or non-terminal symbols.

### Example

$$
G = (\{S, A, B\}, (\{a,b,c\}), {f,g_a,g_b,e_a,e_b}, P, S)
$$

<div>$$
S \rightarrow f[A,B]\\
A \rightarrow g_a[A] \mid e_a\\
B \rightarrow g_b[B] \mid e_b  
$$</div>

````mathjax
f[(x),(y_1,y_2)] = (y_1 c^{|x|^2} y_2)\\
g_a[(x)] = (xa)\\
g_b[(x_1,x_2)] = (bx_1, bx_2)\\
e_a = (\epsilon)\\
e_b = (\epsilon, \epsilon)
````

$$
L(G) = L_G(S) = \{(b^n c^{m^2} b^n) \mid m, n \in \mathbb{N}\}
$$
	
When the composition functions are unrestricted, then GCFG are equivalent to type-0 grammars.

A GCFG grammar is called a *multiple context-free grammar* when the functions are only defined
as concatenations of constant strings and the components of the function arguments.

## Multiple context-free grammars (MCFG)

A MCFG is a GCFG G = (N, T, F, P, S) with the following properties:

* Functions are only defined as concatenations of constant strings and the components of the function arguments.
* Either all components of a single function argument are used exactly once or not at all.
* For all A ? N, every tuple derivable from A must have the same size.
* All tuples derivable from the start symbol S are 1-tuples.

### Example from ([Kato, 2005][Kato2005])

$$
G = (\{S,A\}, \{a,b\}, \{J,f_\alpha\}, P, S)
$$

<div>$$
S \rightarrow J[A]\\
A \rightarrow f_a[A] \mid f_b[A] \mid (\epsilon, \epsilon)
$$</div>

<div>$$
J[(x_1,x_2)] = (x_1 x_2)\\
f_\alpha [(x_1,x_2)] = (\alpha x_1, \alpha x_2)
$$</div>

$$
L(G) = L_G(S) = \{ ww \mid w \in \{a,b\}^* \}
$$

### Alternative representation ([Wild, 2010][Wild2010]), ([Nebel and Weinberg, 2012][Nebel2012])

The formalism provided by GCFG to express a MCFG makes use of functions which allows for
an efficient representation in the case that functions are actually reused.

Instead of regarding MCFG as a specialization of GCFG, they can also be regarded as a direct generalization
of regular CFG by adding vectors to rules. As we will later see, this is equivalent to *inlining* functions
and can make the whole representation more compact (if functions couldn't have been reused anyway)
and understandable.

> A MCFG is a tuple G = (N, d, T, P, S) comprised of  
>  
> N, a finite set of non-terminals,  
> d, a function from N to N, assigning a dimension d(A) to each A ? N,  
> T, a finite set of terminals,  
> P, a finite set of rules and  
> the start symbol S ? N with d(S) = 1.

This representation of MCFG will further be called *inlined* MCFG, or short iMCFG.

### Example from ([Kato, 2005][Kato2005]) translated to alternative representation

$$
G = (\{S,A\}, d, \{a,b\}, P, S)
$$

<div>$$
d(S) = 1\\
d(A) = 2
$$</div>

$$
S \rightarrow A_1 A_2
$$

$$
[A_1, A_2] \rightarrow [a A_1, a A_2] \mid [b A_1, b A_2] \mid [\epsilon, \epsilon]
$$

### Another example

$$
G = (\{S,K\}, d, \{a,b\}, P, S)
$$

<div>$$
d(S) = 1\\
d(K) = 2
$$</div>

$$
S \rightarrow \epsilon \mid K_1 S K_2 \mid K^{(1)}_1 S K^{(2)}_1 S K^{(1)}_2 S K^{(2)}_2 S
$$

$$
[K_1, K_2] \rightarrow [K_1 a, b K_2] \mid [a, b]
$$

To distinguish between multiple uses of a nonterminal N with dim(N) > 1, an upper index in parentheses
is added.

Both representations, MCFG and iMCFG, can be automatically transformed into each other.

### Transformation steps from MCFG to iMCFG

Apply all functions and remove them afterwards. E.g.

<div>$$
A \rightarrow f[A]\\
f[(x_1, x_2)] = (a x_1, a x_2)
$$</div>

gets

$$
[A_1, A_2] \rightarrow [a A_1, a A_2]
$$

### Transformation steps from iMCFG to MCFG

Reverse the inlining by:

#### 1. For all terminating rules, rewrite the left side to a single symbol:

$$
[K_1, K_2] \rightarrow [a,a]
$$

becomes

$$
K \rightarrow (a,a)
$$

#### 2. For all non-terminating rules:

1. Rewrite the left side to a single symbol
2. Count the nonterminal symbols on the right side as n (a symbol N with dim(N) > 1 counts as one)
3. Create a new n-ary function with the counted symbols in b) and use them in the rule

E.g.

$$
S \rightarrow \epsilon \mid K_1 S K_2 \mid K^{(1)}_1 S K^{(2)}_1 S K^{(1)}_2 S K^{(2)}_2 S
$$

$$
[K_1, K_2] \rightarrow [K_1 a, b K_2] \mid [a, b]
$$

becomes

<div>$$
S \rightarrow (\epsilon) \mid f_1[S,K] \mid f_2[K,K,S,S,S,S]\\
f_1[(x),(y_1,y_2)] = (y_1 x y_2)\\
f_2[(k_1,k_2),(k_3,k_4),(s_1),(s_2),(s_3),(s_4)] = (k_1 s_1 k_3 s_2 k_2 s_3 k_4 s_4)\\
K \rightarrow g[K] \mid (a, b)\\
g[(x_1,x_2)] = (x_1 a, b x_2)
$$</div>

#### 3. Eliminate identical functions

It is obvious that in some cases the original MCFG form (if there was one) cannot be reconstructed if
it is not in a canonical form, e.g. it has identical functions or functions which don't use an argument.
In all other cases, the original form can be reconstructed by eliminating identical functions of the
generated MCFG.


[Wild2010]: https://kluedo.ub.uni-kl.de/frontdoor/index/index/docId/2285
[Nebel2012]: http://wwwagak.cs.uni-kl.de/research/publications/www_Pseudoknots/AlgCombPseudoknots.pdf
[Kato2005]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.105.777