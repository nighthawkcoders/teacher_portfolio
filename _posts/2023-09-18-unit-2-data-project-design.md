---
toc: true
layout: post
title: PP Ideation CheckPoint
description: Desing project focused on the usage of Binary, Images, and/or Data Science. 
courses: { csp: {week: 7, categories: []} }
categories: []
type: collab
---

## Create Frontend Design

Design for Frontend is typically perfomed in a drawing tool like Figma or Canva.  Typically, there is transition between one or more pages including description of inputs and outputs.

## Build a Data Model(s) using UML

Traditionally I would use Visio, but Figna Figjam or Canva may be a good alternatives.  In any system you need data and trying to analyze how it will work in a definition is critical to success.

## Start shared Frontend Repo using GitHub Pages

Make a team repository from the student repo.  Reduce and customize for need, for instance you probably don't need a Time Box or Blog page.  Start to build out User Interface (UI) according to Frontend Design.  Frontend developers will design frontend and screen transitions before data is available, this meet requirements of this step in process.

- [Student Repo](https://github.com/nighthawkcoders/student)
- New [Nighthawk-Pages](https://github.com/nighthawkcoders/Nighthawk-Pages) includes on pages search, built with minima themes with more intuitve SASS customizations.

## Start Backend Repo using Flask/Flask

Make a team repository from flask portfolio.  Review flask anatomy and start to customize for your needs.  On a backend you usually have an Adminstrative User Interface and APIs.  According to UML design you can start defining APIs with static data to support development.  Early testing is done with a tool called [Postman](https://www.postman.com/), this would meet requirements of this step in process.

- [Flask Repo](https://github.com/nighthawkcoders/flask_portfolio)

## Deploy on AWS

To deploy you need minimal backend software.  In fact, you should be able to start deployment process once you start your flask portfolio project. Follow deployment guide.  You will need to pick a subdomain using AWS Route 53.
