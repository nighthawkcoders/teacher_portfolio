---
toc: true
comments: false
layout: post
title: API, Data Strategies
description: Resource guide to using and making APIs.  This includes AWS, Postman, 3rd Party APIs, and Code expertise.
type: devops
courses: { csp: {week: 9} }
---

## API, Data Resources

Applications, Web Applications are nothing without data.  After many reviews, Teachers are concerned that many groups are not making the effort to understand and look at Data requirements for end of Trimester.

### API Terms and Postman

Knowing Terms and Postman needs to be a part of your vocabular and demonstrations as you move into Feature, Integration, and Final reviews.  

- [API Control, Model, Postman](https://nighthawkcoders.github.io/APCSP/2023/01/19/PBL-control.html)  Make your live review more interesting by completing and showing hacks discussed in this guide for your solution.

### Variation off of Jokes

Student teams have opportunity for 90% if they do a variation of Jokes.  However, this is considered about 10 hours of work for both frontend and backend development.   So, there would need to be a couple of variation to meet team goals for 4 people.

- [Frontend Fetch of Jokes](https://nighthawkcoders.github.io/APCSP/techtalk/webfrontend).  In this code example you will learn many of the key Frontend requirements in displaying the Jokes API.  This meets 1/2 the requirements for this project.
  - JavaScript Fetch and Display
    - Use JavaScript "fetch" get, put, update operation with Python APIs
    - Use JavaScript to trap errors through invalid response
    - Use JavaScript to displays data by updating DOM

- [Python Web API for Jokes](https://nighthawkcoders.github.io/APCSP/techtalk/webapi).  Review this document that describes how to make Model and Interface endpoints.
  - Python Endpoints and CRUD
    - Python public API endpoints is require definition on backend
    - Build Python CRUD operations to support endpoints
  
### Alternative to Jokes

Student teams need could look into Python "requests" and learning [dotenv](https://pypi.org/project/python-dotenv/) on AWS server to hide access keys.  This is fundamental for using ChatGPT.  Additionally, you will add your own API to be accessed by JavaScript "fetch", this is a two step process.  This should be considered a requirement for anyone doing Food, Cars, Fitness or other common API categories.  Doing a JavaScript "fetch" is not enough.

- [Python 3rd Party API](https://nighthawkcoders.github.io/APCSP/techtalk/rapidapi).  It can be beneficial to access APIs in the backend versus the frontend.  Plus, this multi step process will meet Frontend to Backend API requirements.
  - ChatGPT APIs keys are required to be hidden on server.
  - Rate limits can be controlled on backend.  Always ensuring result.
  - Python Endpoints and CRUD
  - JavaScript Fetch and Display

### 100% and CPT project

Starting to learn about persistent data and databases with APIs is something that will put you ahead of the game.  Above expectations would require some original work or thinking.  

- [User Database API](https://nighthawkcoders.github.io/APCSP/2023/04/11/AP-writeup-sample.html).  This is a more advanced approach to APIs, but learning this will prepare you for requirements and language of Create Performance Task, the CSP project.
  - Developer learns CRUD operations and Database access
  - Python Endpoints and CRUD
  - JavaScript Fetch and Display

## Backend Session on Jokes

### Setup VSCode as Follows

Load three files that are pertinant to this excercise.

- main.py, run the application with Debugging
- api/joke.py, endpoint for each joke interface
- model/jokes.py, model means data or data for jokes

#### Run Web Application Locally

![joke run]({{site.baseurl}}/images/jokes/run.png)

#### Run Observations and actions

This start the application use Python with Debugging on.  The objective is to load Web Server.  Look at Terminal for outputs.

### Review api/joke.py

Now is a good time to look at code around this code.

- Definition of joke_api with browser prefix /api/jokes.

```python
joke_api = Blueprint('joke_api', __name__,
                   url_prefix='/api/jokes')

# API generator https://flask-restful.readthedocs.io/en/latest/api.html#id1
api = Api(joke_api)
```

- _Read resource is defined using "get" method

```python
class _Read(Resource):
        def get(self):
            return jsonify(getJokes())
```

- api /api/jokes/

```python
api.add_resource(_Read, '/')
```

### Debug api/joke.py with Browswer

Learn to setup break point and usage of play controls(continue, step over, step into, step out)

![joke debug]({{site.baseurl}}/images/jokes/debug.png)

- Setup breakpoint in Code
- Call endpoint from Browser
- Observe code stopping and play controls

#### Debug Observations and actions

- Open Locals self observe endpoint and method
- Step into code observe that step takes you to jokes.py
- Open Globals jokes_data
- Hover over jokes_data in code
- Press continue play control and observe data in browser

### Debug api/joke.py with Postman

Similar debugging goals as previous, but now we can perform put method as well as get methond.

#### Postman Observation and actions

- [Download Postman](https://www.postman.com/downloads/) for free
- Build Collections
  - Get APIs
  - Put APIs
- Test Collections
- Set Breakpoints in Code and Observe

![joke run]({{site.baseurl}}/images/jokes/postman.png)

## Hacks

- Build Collection of API tests in Postman on localhost.
- Try APIs off of a deployed server: <https://flask.nighthawkcodingsociety.com/api/jokes>
- Extra.  Write code for _Create method for Jokes, hint use Body to pass data versus command line
- Extra.  Write your own frontend code to read your own Jokes API.   Here is example.  
  - [Sample github.io Frontend Runtime](https://nighthawkcoders.github.io/APCSP/data/jokes) - [Sample github.io Raw Code](https://raw.githubusercontent.com/nighthawkcoders/APCSP/master/_posts/2022-07-10-PBL-jokes.md).
