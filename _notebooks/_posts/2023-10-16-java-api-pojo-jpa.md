---
layout: default
title: API, POJO, JPA
description: Define a POJO, essentially an class with @Entity properties that enables it to be used with Spring Boot in the process of making a database.  Continue by creating API and JPA to enable frontend to request, backend to write to database and respond.
categories: [1.A, 3.A, 3.B, C4.5, C4.7]
courses: { csa: {week: 6} }
type: ccc
spring_api_orm: &spring_api_orm |
  Spring API and ORM
  ------------------
    +-------------------+
    |   API Controller  |-- Developer defines Request Mappings
    |     Request       |----- @PathVariable are received
    |     JPA call      |----- @Autowired method is called
    |     Respone       |----- ResponseEntity<> wraps data from JPA (ie JSON)
    +-------------------+
       |
       | JPA Methods
       v
    +-----------------+
    |  JPA            |-- Developer defines Database Queries
    |   Java          | ----- a.) JPA built in (long names)
    |   Persistent    | ----- b.) SQL native queries
    |   API           | 
    +-----------------+
       |
       | Database Access Methods
       v
    +-----------------+
    |  ORM            | -- Spring layers supporting Database Framework
    |   Object        | ----- Behind the scene managing tables
    |   Relational    |  ----- Behind the scene database construction
    |   Model         |
    +-----------------+
       |
       | Entities Definition
       v
    +-----------------+
    |  Database/POJOs | -- Developer defines each Class
    |    Plain        | ----- Define attributes in Table
    |    Old Java     | ----- Define relationships in Database
    |    Objects      | 
    +-----------------+

---

## Introduction
APIs build programmatic interactions between applications, people, and businesses.  They are designed around sharing data and executing pre-defined processes.  Spring Boot and Spring Data JPA reduce time for development; developers implement POJOs and JPA access layers; Spring hanldes the rest.  

An API allows you to request and receive data from the system. A POJO is the foundation for making an Entity that is turned into a Database.  The Java Persistent API (JPA) allows the database to be queried and updated.    

The subject of this article is Jokes, likes (haha)  and dislike (boohoo).   User clicks haha or boohoo and updates counters.

[Runtime](https://nighthawkcoders.github.io/APCSA/data/jokes)

[Back-end Java Spring Files](https://github.com/nighthawkcoders/spring_portfolio/tree/master/src/main/java/com/nighthawk/spring_portfolio/mvc/jokes)
- Jokes.java - contains POJO which defines Model
- JokesApiControler.java - contains APIs and Control, which respond to View actions
- JokesJpaRepository.java - contains CRUD and data acess queries

### Visual Overview

<pre>
  <p>{{ page.spring_api_orm }}</p>
</pre>

### POJO Review
> This code fragment shows power of Spring and Annotations to define a Model.  Using Spring, a little bit of POJO code, the Developer is enabling persistent data storage of a table in a database. It is left to student to search up each annotation for personal clarification beyond the comments below.

```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Data  // Annotations to simplify writing code (ie constructors, setters)
@NoArgsConstructor  // Builds zero argument constructor
@AllArgsConstructor // Builds constructor for all agurments
@Entity // Annotation to simplify creating an entity, which is a lightweight persistence domain object. Typically, an entity represents a table in a relational database, and each entity instance corresponds to a row in that table.
public class Jokes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;  // Unique identifier

    @Column(unique=true)
    private String joke;  // The Joke

    private int haha;  // Store joke likes
    private int boohoo;  // Store joke jeers
}
```

### Java Persistence API (JPA)
> The JPA code is defined to access the database. The JokesJpaRepository interface extends JpaRepository.  This allows the developer access JPA predefined and developer custom interfaces to perform CRUD operations on persistent storage.  It is left to student to define "Delete" operation in CRUD.

```java
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

// JPA is an object-relational mapping (ORM) to persistent data, originally relational databases (SQL). Today JPA implementations has been extended for NoSQL.
public interface JokesJpaRepository extends JpaRepository<Jokes, Long> {
    // JPA has many built in methods, these few have been prototyped for this application
    void save(String Joke);  // used for Create, Update operations in CRUD

    // Accessors, Read operations in CRUD
    List<Jokes> findAllByOrderByJokeAsc();  // returns a List of Jokes in Ascending order
    List<Jokes> findByJokeIgnoreCase(String joke);  // look to see if Joke(s) exist
}
```

### JPA returns List
> List is a super class to ArrayList.  In the JPA code you can see that List of Jokes is common result from JPA accessor method.  It is left to the student to review [List and ArrayList from GeeksForGeeks](https://www.geeksforgeeks.org/difference-between-list-and-arraylist-in-java/) and understand research difference between interface and implementation.


### API Controller
> This backend piece of the Spring process is building out the RESTful API services to access the data.  Below is the JokesApiController, this is commented extensively.  It is left for the student to review and update the "Spring API and ORM" illustration and add it to their personal blogging notes from the notes and code below.
- @Autowired annotation provides full access to JokesJpaRepository, what we made with the code above.  Review repository.<actions>, there are actions for set, get, save and more.
- @GetMapping and @PutMapping which establishes endpoints for RESTful web services to access the data.
- API @PathVariable for obtaining information from the request URL.
- The respones "return new ResponseEntity" returning JSON and Statis/

```java
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
    @PutMapping("/like/{id}")
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
    @PutMapping("/jeer/{id}")
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

### Front End
> This database was setup to allow people to HaHa or Boohoo a collection of Computer Jokes.  The entirety has lot of limitation.  

- People can vote more than once and in both categories.
- There is no auto refresh if several are voting and updating as you are looking at your static page.
- Perhaps Q and A style could hide punch line.
- Perhaps we could accept new jokes, or have interface for adding them.

> Amazingly, though ... the front-end code is in a completely different project.  The front end project GETs and PUTs using the back end APIs.  The key element that makes this different than other public APIs, like RapidAPI, is the "reaction" function.  This function updates the elementID of the like or jeer as soon as you impact the button.

[Frontend JavaScript Code](https://github.com/nighthawkcoders/APCSA/blob/master/_posts/2022-07-10-PBL-jokes.md)

```javascript
// Reaction function to likes or jeers user actions
  function reaction(type, put_url, elemID) {

    // fetch the API
    fetch(put_url, put_options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors
      if (response.status !== 200) {
          error("PUT API response failure: " + response.status)
          return;  // api failure
      }
      // valid response will have JSON data
      response.json().then(data => {
          console.log(data);
          // Likes or Jeers updated/incremented
          if (type === HAHA) // like data element
            document.getElementById(elemID).innerHTML = data.haha;  // fetched haha data assigned to haha Document Object Model (DOM)
          else if (type === BOOHOO) // jeer data element
            document.getElementById(elemID).innerHTML = data.boohoo;  // fetched boohoo data assigned to boohoo Document Object Model (DOM)
          else
            error("unknown type: " + type);  // should never occur
      })
    })
    // catch fetch errors (ie Nginx ACCESS to server blocked)
    .catch(err => {
      error(err + " " + put_url);
    });
    
  }
```

## Hacks
AP required.  Review the lambok annotations (https://projectlombok.org/features/).  
- Write the POJO and show code generated by lambok.  Comment this code in context of requirements for the AP exam.

PBL foundational.  Establish a POJO, JPA and APIs in your own project.  You can begin with Jokes.
- Make new POJO attribute.  Alert, I suggest deleting /volumes/sqlite.db each time you change schema.  Schema changes are not ugraded automatically.
- Make a new API endpoint.
- [Test your API using Postman](https://www.geeksforgeeks.org/basics-of-api-testing-using-postman/).  You should be able to test with localhost:port.

### Resources, recommended by ChatGPT
1. [Spring Framework Documentation](https://spring.io/projects/spring-framework)
  The official Spring Framework documentation is entirely free to access. It provides comprehensive information on various Spring modules, including Spring Boot and Spring Data JPA.

2. [Baeldung Spring Boot Tutorials](https://www.baeldung.com/spring-boot)
  Baeldung: Baeldung offers a mix of free and paid content. While some articles may require a subscription, many tutorials and guides on Spring Boot and Spring Data JPA are available for free.

3. [Baeldung Spring Boot Tutorials](https://www.baeldung.com/spring-boot)
  Spring Guides: The Spring Guides are completely free and provide step-by-step tutorials on various aspects of Spring development, including Spring Boot and Spring Data JPA.

4. [Spring Guides](https://spring.io/guides)
Java Brains YouTube Channel: The Java Brains YouTube channel offers free video tutorials on Java and Spring frameworks, including dedicated playlists for Spring Boot and Spring Data JPA.

5 Java Brains YouTube Channe
  Spring Data JPA Reference Documentation: The Spring Data JPA reference documentation is freely available online and provides in-depth insights into Spring Data JPA features.
  - [Java Brains Spring Boot Playlist](https://www.youtube.com/playlist?list=PLqq-6Pq4lTTZSKAFG6aCDVDP86Qx4lNas)
  - [Java Brains Spring Data JPA Playlist](https://www.youtube.com/playlist?list=PLqq-6Pq4lTTZSKAFG6aCDVDP86Qx4lNas)

[Spring Data JPA Reference Documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference)
  The Spring Data JPA reference documentation is freely available online and provides in-depth insights into Spring Data JPA features.

