---
toc: true
layout: post
title: UX-BE, Spring/Thymeleaf
description: Tour frontend server side capabilities using the Java Spring Thymeleaf framework. The Spring template engine is Thymeleaf and like all template engines it is used to process and create HTML on server side and for an HTML page.
courses: { csa: {week: 16} }
type: ccc
image: /images/spring_thymeleaf.png
---

## Tour of Frontend

<div>
    <div>
        <div style="float: right; margin: 0px 10px 10px 0px;">
            <a href="https://github.com/nighthawkcoders/spring_portfolio">
                <img atl="Frontend Files" src="{{site.baseurl}}/images/frontend.png" title="VS Code frontend files"
                width="250">
            </a>
        </div>
        <div>
            <hr>
            <p>
            This visual shows files for a Java Spring Boot Web Application project.  The frontend of the project contains HTML files that are infused with Thymeleaf.  Each frontend file has a backend has a Controller that loads the HTML template.  In this illustration Greet.java loads greet.html, Birds.java loads birds.html, index.html is using default/non-visible Controller to load its page.  This article will discuss the HTML files, the backend will discuss the Java files
        
            Read more or review files in the <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/">Spring Boot Reference Documentation</a>
            </p>
            <hr>
        </div>
    </div>
</div>

### HTML page (index.html)

The index.html file is infused with page specific fragments via Thymeleaf, it uses layouts/base.html as the template.  Thus, files in this project are NOT pure HTML.  The Thymeleaf pre-processor runs across all HTML files in this project, taking fragments and base to form pure HTML prior to files being sent to the Web Browser.  Review comments in source code for understanding ...

```html
<!-- This page is illustrative and contains ideas about HTML formatting -->
<!DOCTYPE HTML>
<!-- Signals HTML to understand Thymeleaf Layout Dialect -->
<html xmlns:layout="http://www.w3.org/1999/xhtml" xmlns:th="http://www.w3.org/1999/xhtml"
      layout:decorate="~{layouts/base}" lang="en">

<head>
<!-- Thymeleaf inserts below th:block into the <head> from layout/base.html -->
<th:block layout:fragment="head" th:remove="tag">
    <title>Intro</title>
</th:block>
</head>

<body>
<!-- Thymeleaf inserts below into the <body> from layout/base.html -->
<th:block layout:fragment="body" th:remove="tag">
    <!-- Start of body content specific to page -->
    <div class="px-5 py-5 mx-auto">
        <h1><strong>Java Home Page</strong></h1> 
        <!-- This page uses BootStrap defined in layout/base.html -->
        <div class="row">  <!-- each row has 12 logical positions -->
            <div class="col-4">  <!-- each card is grated 4 positions, 3 cards to a row -->
                <div class="card">
                    <img class="card-img-top" th:src="@{/images/java.png}" alt="Java Development" height="250">
                    <div class="card-body">
                    <h5 class="card-title">What should Java Developers learn?</h5>
                    <p class="card-text">
                        <ol>
                            <li>Java 11-17 is used for PBL. Java 8 appears to be College Board standard.  Java features like Reactive Streams, HTTP2 client, JShell, React JS are more recent than 8.</li>
                            <li>GitHub.  Learning to master managing change, branches, pull requests, and more.</li>
                            <li>Development DevOps. Java programmers should have a passion for managing the environment and learning automation (Git, Maven, Docker).</li>
                            <li>REST and Microservice using Spring.  Mastering creating and consuming RESTful APIs</li>
                        </ol>
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <img class="card-img-top" th:src="@{/images/spring.png}" alt="Spring Development" height="250">
                    <div class="card-body">
                    <h5 class="card-title">What is Spring?</h5>
                    <p class="card-text">
                        <ol>
                            <li>Spring Framework is the most popular application development framework of Java. </li>
                            <li>Spring Boot helps to create a stand-alone application with less configuration.</li>
                            <li>Spring MVC is a model view controller-based web framework under the Spring framework.</li>
                            <li>ThymeLeaf is a server-side Java template engine, supports HTML5 JVM web development, and provides full integration with Spring Framework.</li>
                        </ol>
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <img class="card-img-top" th:src="@{/images/pojo.jpeg}" alt="Java Persistence" height="250">
                    <div class="card-body">
                    <h5 class="card-title">How do you create Persistent data?</h5>
                    <p class="card-text">
                        <ol>
                            <li>Java Persistent API (JPA) provides a query language that allows create, read, update, and delete objects from a database.</li>
                            <li>Beans, Controller Code, and Business logic interact with the JPA to manage data in and out of the Database.</li>
                            <li>An Object-Relational Model (ORM) mapping Java classes (entities + supporting structures) with a relational database</li>
                            <li>Plain Old Java Objects (POJO) are the Class definitions that are foundations for JPA and ORM, see the @entity declaration over the Class definition.</li>
                        </ol>
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <!-- End of body content specific to page -->
</th:block>
</body>

</html>
```

### Layouts Folder

This folder contains a base.html and two fragments: footer.html and nav.html.  These files form the standards for each HTML page in this Web Application project.  The layouts/base.html is structural beginning file for index.html, greet.html, birds.html or any future file added to this project.  This connection is made at the top of each HTML template, layout:decorate="~{layouts/base}".

As you look at the contents of the layouts/base.html think of it as the structure and common contents that will be in every HTML file.  As you look back at the index.html, consider that it is starting with layouts/base.html and inserting its page specific fragments for the head and body.

Thymeleaf will put all these things together through a pre-process step.  In the end, every HTML pages that is given to the Web Browser has style and structure from layouts/base, but content from its own HTML head and body.

```html
<!-- This page is illustrative and contains ideas about HTML layouts -->
<!DOCTYPE HTML>
<html xmlns:layout="http://www.w3.org/1999/xhtml" xmlns:th="http://www.w3.org/1999/xhtml" lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <!-- JQuery CSS -->
    <script th:src="@{https://code.jquery.com/jquery-3.3.1.slim.min.js}" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <!-- Bootstrap CSS -->
    <link th:href="@{https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css}" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- Project CSS -->
    <link rel="stylesheet" type="text/css" th:href="@{/scss/custom.css}">

    <th:block layout:fragment="head" th:remove="tag">Head details are added by ThymeLeaf layout consumer</th:block>
</head>

<body>
    <th:block th:replace="layouts/nav :: header" th:remove="tag">Standard header and Navigation</th:block>

    <th:block layout:fragment="body" th:remove="tag">Body details are added by ThymeLeaf layout consumer</th:block>

    <th:block th:replace="layouts/footer :: footer" th:remove="tag">Standard footer</th:block>

    <!-- Bootstrap 5.0 Bundle with Popper -->
    <script th:src="@{https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js}" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

<th:block layout:fragment="script" th:remove="tag"></th:block>

</html>
```

### [Resources](images/resources.png) Overview
<div>
    <div>
        <div style="float: right; margin: 0px 10px 10px 0px;">
            <a href="https://github.com/nighthawkcoders/spring_portfolio">
                <img atl="Frontend Files" src="{{site.baseurl}}/images/resources.png" title="VS Code frontend files"
                width="250">
            </a>
        </div>
        <div>
            <hr>
            <p>
            Resources are structure in standard directories for many reasons: familiarity amongst developer, tool defaults, deployment defaults, cache optimizations, etc.  Here are some of introductions:
            </p>
            <ul>
                <li> static/images - this is where a web server typically expects images that do not change after deployment.  Service in deployment will cache these files for quick loading over the internet.
                </li>
                <li> static/sccs - these are cached as well.  This location and the sccs name state this will work with node tools.  The standard is called Sassy and is the same as used in Python Flask projects.
                </li> 
                <li> templates/error - error pages can be placed here.  Can you guess were you would put a 500 error page.  
                </li> 
                <li> application.properties - this resource is used to define defaults for the application.  Most of these default are used by backed, for instance this will be used to define location of a database.  This is similar to __init__.py.
                </li>
            </ul>
            <hr>
        </div>
        
    </div>
</div>