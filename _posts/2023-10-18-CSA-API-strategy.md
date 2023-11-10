---
toc: true
comments: false
layout: post
title: API, Data Strategies
description: Resource guide to using and making APIs.  This includes AWS, Postman, 3rd Party APIs, and Code expertise.
type: devops
courses: { csa: {week: 9} }
---

## API, Data Resources

Applications, Web Applications are nothing without data.  API's are the most common source on the internet for obtaining data.

### Variation off of Jokes

Student teams have opportunity for 90% if they do a variation of Jokes.  However, this is considered about 10 hours of work for both frontend and backend development.   So, there would need to be a couple of variation to meet team goals for 4 people.

- [Frontend Fetch of Jokes](hhttps://nighthawkcoders.github.io/APCSA/data/jokes).  In this code example you will learn many of the key Frontend requirements in displaying the Jokes API.  This meets 1/2 the requirements for an API.
  - JavaScript Fetch and Display
    - Use JavaScript "fetch" get, put, update operation with Python APIs
    - Use JavaScript to trap errors through invalid response
    - Use JavaScript to displays data by updating DOM

- [Javascript Web API for Jokes](https://nighthawkcoders.github.io/APCSP/techtalk/webapi).  Review this code that describes how to make Model and Interface endpoints.
  - Java Endpoints and CRUD
    - Each public API endpoint requires definition on backend
    - Build Spring CRUD operations to support endpoints

```java
package com.nighthawk.spring_portfolio.mvc.jokes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // annotation to simplify the creation of RESTful web services
@RequestMapping("/api/jokes")  // all requests in file begin with this URI
public class JokesApiController {

    // Autowired enables Control to connect URI request and POJO Object to easily for Database CRUD operations
    @Autowired
    private JokesJpaRepository repository;

    /* GET List of Jokes
     * @GetMapping annotation is used for mapping HTTP GET requests onto specific handler methods.
     */
    @GetMapping("/")
    public ResponseEntity<List<Jokes>> getJokes() {
        // ResponseEntity returns List of Jokes provide by JPA findAll()
        return new ResponseEntity<>( repository.findAll(), HttpStatus.OK);
    }

    /* Update Like
     * @PutMapping annotation is used for mapping HTTP PUT requests onto specific handler methods.
     * @PathVariable annotation extracts the templated part {id}, from the URI
     */
    @PostMapping("/like/{id}")
    public ResponseEntity<Jokes> setLike(@PathVariable long id) {
        /* 
        * Optional (below) is a container object which helps determine if a result is present. 
        * If a value is present, isPresent() will return true
        * get() will return the value.
        */
        Optional<Jokes> optional = repository.findById(id);
        if (optional.isPresent()) {  // Good ID
            Jokes joke = optional.get();  // value from findByID
            joke.setHaha(joke.getHaha()+1); // increment value
            repository.save(joke);  // save entity
            return new ResponseEntity<>(joke, HttpStatus.OK);  // OK HTTP response: status code, headers, and body
        }
        // Bad ID
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // Failed HTTP response: status code, headers, and body
    }

    /* Update Jeer
     */
    @PostMapping("/jeer/{id}")
    public ResponseEntity<Jokes> setJeer(@PathVariable long id) {
        Optional<Jokes> optional = repository.findById(id);
        if (optional.isPresent()) {  // Good ID
            Jokes joke = optional.get();
            joke.setBoohoo(joke.getBoohoo()+1);
            repository.save(joke);
            return new ResponseEntity<>(joke, HttpStatus.OK);
        }
        // Bad ID
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
```
  
### Alternative to Jokes

- [Python 3rd Party API](https://nighthawkcoders.github.io/APCSA/techtalk/rapidapi).  It can be beneficial to access APIs in the backend versus the frontend.  Plus, this multi step process will meet Frontend to Backend API requirements.
  - ChatGPT APIs keys are required to be hidden on server.
  - Rate limits can be controlled on backend.  Always ensuring result.
  - Python Endpoints and CRUD
  - JavaScript Fetch and Display

### Backend API Debugging and Postman

Pictures need to be rewworked for Java

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
