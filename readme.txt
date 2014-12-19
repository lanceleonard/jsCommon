Intro:
------

IMPORTANT: This is a partial work in progress.  I need to consolidate different versions into a "canonical" release.  I intended to create tests, demos, and the like.  I don't consider the current version ready for use and am mainly using this as a way to become familiar with git as a versioning tool.  Over time, I do expect this to be useful.  Please be patient.

jsCommon is a set of utility functions commonly seen in my samples and apps.  Originally created to support my work on various samples and utilities for the Internet Explorer Developer Documentation team (2005-2014), this library has become part framework, part test case for my attempts to write standards-based, cross-browser code.  (You probably won't see this in production code, though you might see it referenced in various articles.)

I do not claim these functions are idiomatic; however, they do appear to work well given the constraints.  All well-intentioned feedback is welcome; all other feedback will be cheerfully ignored.

While I do claim primary authorship for the contents as initially uploaded to git, I respectfully acknowlege that my work stands on the shoulders (and advice) of others.  If I fail to give credit where credit is due, it is simply because I have forgotten, not because I am trying to pull a Gilderoy Lockhart.  Let me know, kindly, and I'll find a way to make sure your contribution is fully credited.

For "support", such as it is, please work through the git repository.  No promises, though.  I'm just this guy, y'know?

Concept: 
--------

Feature detection and graceful fallback are fundamental parts of modern web design.  In practice, I've seen variations between various browsers and implementations.  As a result, I've tried to work the overall concepts into a collection of consistent routines that I can count on.  

I do not intend to replace commonly used (and supported) libraries, I simply wish to have a set of consistent functions that encapsulate some of the harder grunt work so that I can write samples that are not distracted by the gritty details. 

Usage:

Copy jsCommon.js to an accessible directory in your environment and then call it, preferably late in the page load process.  Here's how I do it:

  <!DOCTYPE html>
  <head>
    <title>A title <title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- stuff -->
  </head>
  <body>

    <--! More stuff.  C'mon, you know what goes here... -->

  <!-- Code placed here for performance -->
  <script type="text/javascript" src="JsCommon.js"></script> 

  </body>
  </html>



History:
-------

0.9.0, 25 October 2014: Initial attempted release through git.  

