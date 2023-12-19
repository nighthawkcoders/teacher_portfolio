---
toc: false
comments: false
layout: post
title: Analysis, CSA Mini Project
description: Study efficiency of Algorithms
type: ccc
courses: { csa: {week: 13} }
---

## Algorithms and Analysis Mini Project

In treos, work on Fibonnaci and Sorting algoritms.  The objective of this mini project is to go through development processes (innovation, feature, integration, final), learn more Java, and learn more frontend.

- Obtain a deeper understanding of Abstract Classes and Inhertance
- Create several algorithms to solve the same type of problem(s)
- After implementation, study algorithms for efficiency using analytical measurments
- Try to use unique and different coding styles in solutions, but measure the same way and from the same starting point
- Consider how you will visualize and present these algoritms in the frontend to show your conclusions

## Hacks

### Fibonacci

Create 2 additional methods to solve nth result in the Fibonacci Sequence. Build a frontend output to show results and analysis.

[Sample of Fibonacci Frontend](https://thymeleaf.nighthawkcodingsociety.com/mvc/fibonacci?fibseq=7)

### Sorts

Using Abstract Class build a means to evaluate complexity and performance of serveral College Board sorting algorithms.

In each sort, you could share a progression of the algorithm.  This is a sample of capturing progressions using of a [Palindrome](https://jinja.nighthawkcodingsociety.com/algorithm/palindrome/) algorithm.

- Build a Sort class for each unique sort.  Use Fibonacci Abstraction heirarchy as guide to build an init/sort method for each unique sort.
  - Sorts include bubble, insertion, selection, and merge.  
  - Teacher expects to see usage pf ***extends***.  In Parent class store the number of iterations, comparisons, merges/swaps.
  - In parent class contain logic for timing each sort algorithm, creating random elements for data structure, ...

- Analyze the Big O complexity on Sorts.
  - Consider the number of operations, time, and space used when analyzing a sort algorithm.  Establish analytics including: time to sort, number of comparisons and number of swaps.
  - Average the results for each each Sort, run each at least 12 times with 5000 random elements.  You should throw out High and Low when doing analysis.
  - Make your final/judgement on best sort: Number of Comparisons, Number of Swaps, Big O complexity, and Total Time.

- Build frontend visualizationthe to compare statistics from sorts and describe BigO complexity in relation to statistics. 
  - Be sure to create a mock up for visualization before coding.
  - In visualization start with Console output
  - Final visualization wll be in the Frontend. The output will require thought and design on how to paas data through API. 
