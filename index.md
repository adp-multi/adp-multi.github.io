---
layout: home
---

<div align="center">
    <img src="/assets/adpmulti_logo.svg" alt="adp-multi logo" width="260" />
</div>

## What is adp-multi?

adp-multi is an implementation of [Algebraic Dynamic Programming](http://bibiserv.techfak.uni-bielefeld.de/adp/) for [multiple context-free languages](mcfl).

It is a library based on the original [Haskell implementation](https://bitbucket.org/gsauthof/adpcombinators)
and can be considered an unoptimized prototype.

The formalism ([ADP for MCFL](/adp_for_mcfl)) and the library have been developed as part of my [master's thesis](https://github.com/adp-multi/thesis/releases).

*NOTE*: This prototype will not be developed further and current development happens within the [gADP](http://www.bioinf.uni-leipzig.de/Software/gADP/) Haskell library which is highly optimized and offers various other advanced functionality.

## Sources, please!

Here you go: [https://github.com/adp-multi/adp-multi](https://github.com/adp-multi/adp-multi)

## Where do I start?

If you are new to ADP, then it's best to go through the 
[online course](http://bibiserv.techfak.uni-bielefeld.de/cgi-bin/dpcourse) of the Bielefeld University
and/or read a [tutorial-style paper](http://dx.doi.org/10.1016/j.scico.2003.12.005) from its inventors.

If you don't know the class of multiple context-free languages yet, then you should first read the [explanation](mcfl) of them.

After that, you should go to the [quick start guide](/quick_start) where you learn
what's different compared to original Haskell-ADP and how to write your own grammars.

There's also a short motivational/introductional talk called 
"[Predicting Pseudoknots Without Hacking in C](/assets/talk_herbstseminar2012.pdf)"
that I gave at the "10. Herbstseminar der Bioinformatik" (2012) which summarizes why adp-multi is useful and in which direction future work might go.
Note that the adp-multi syntax in the slides is outdated.

In July 2013 I defended my thesis (giving a presentation and answering questions). The (german) [slides are available](/assets/verteidigung_2013.pdf) and contain more up-to-date information than the ones from 2012 above. For in-depth information, have a look at [my thesis](https://github.com/adp-multi/thesis/releases), it's in English.
