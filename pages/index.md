---
title: adp-multi
description: adp-multi is an adaptation of the Algebraic Dynamic Programming 
             method for multiple context-free languages
layout: page_index
---

## What is adp-multi?

adp-multi is an implementation of [Algebraic Dynamic Programming](http://bibiserv.techfak.uni-bielefeld.de/adp/) for [multiple context-free languages](mcfl).

It is a library based on the original [Haskell implementation](https://bitbucket.org/gsauthof/adpcombinators)
and can be considered an unoptimized prototype.

The formalism ([ADP for MCFL](/adp_for_mcfl)) and the library have been developed as part of my [master's thesis](https://github.com/adp-multi/thesis/releases).

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
"[Predicting Pseudoknots Without Hacking in C]({{urls.media}}/talk_herbstseminar2012.pdf)"
that I gave at the "10. Herbstseminar der Bioinformatik" (2012) which summarizes why adp-multi is useful and in which direction future work might go.
Note that the adp-multi syntax in the slides is outdated.

In July 2013 I defended my thesis (giving a presentation and answering questions). The (german) [slides are available]({{urls.media}}/verteidigung_2013.pdf) and contain more up-to-date information than the ones from 2012 above. For in-depth information, have a look at [my thesis](https://github.com/adp-multi/thesis/releases), it's in English.

## Questions? Comments? Bugs?

For code-related bugs or suggestions, please create an issue in the [issue tracker](https://github.com/adp-multi/adp-multi/issues).

For everything else, just 
<a href="http://www.google.com/recaptcha/mailhide/d?k=01K7XApM3NHiteg6XLnkZqAw==&amp;c=62TLgKB3Xjvp60pkxY897qejXI-cQ7FMlvLMAOB-cpw=" onclick="window.open('http://www.google.com/recaptcha/mailhide/d?k\07501K7XApM3NHiteg6XLnkZqAw\75\75\46c\07562TLgKB3Xjvp60pkxY897qejXI-cQ7FMlvLMAOB-cpw\075', '', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=300'); return false;" title="Reveal this e-mail address">
email</a> me.
