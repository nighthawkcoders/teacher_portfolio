---
toc: true
comments: false
layout: default
title:  Spring Security using JWT
description: Manage access and roles to a backend Java Spring Security Application using JSON Web Tokens.
courses: { csa: {week: 8, categories: []} }
categories: []
type: devops
---

## Spring Security using Java Web Tokens Competition

- [JWT Hello Articles](https://www.javainuse.com/spring/boot-jwt)

### JWT concepts via ChatGPT with added illustrations

JSON Web Token (JWT) is a popular way to authenticate users in a web application. It is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS).
Here is an example of how you might use JWT for authentication in a JavaScript application:

1. The client sends a login request to the server with the user's credentials (e.g., username and password).
    - Client/Origin: <https://nighthawkcoders.github.io/APCSA/data/login>
    - Server/Host: <https://spring.nighthawkcodingsociety.com/>
2. If the credentials are valid, the server generates a JWT and sends it back to the client.  Here ae some sample credentials.
    - Sec-Fetch-Mode: cors
    - Sec-Fetch-Site: cross-site
3. The client stores the JWT in a cookie. Here is cookie in Chrome Inspect properties
    - ![JWT Cookie]({{site.baseurl}}/images/jwt_cookie.png)
4. For subsequent requests, the client sends the JWT in the Authorization header.  Here is a sample JWT.
    - jwt=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqbTEwMjFAZ21haWwuY29tIiwiZXhwIjoxNjc1ODA0MTg2LCJpYXQiOjE2NzU3ODYxODZ9.rHoLxTcBJOBv36gH5qNI1VhgGv2Jub1OPtpddf1-fHd84BcL5MeGxiBhi2M0MpEJcuhTjeC2TYWVaOjT7ek0tg; Path=/; Max-Age=3600; Expires=Tue, 07 Feb 2023 17:09:46 GMT; Secure; HttpOnly; SameSite=None; Secure
5. The server verifies the JWT and, if it is valid, allows the request to proceed.  Here is successful response.
    - ![JWT Response]({{site.baseurl}}/images/jwt_response.png)

The JWT consists of three parts, separated by dots (.). The first part is the header, which specifies the algorithm used to sign the JWT (e.g., HS256). The second part is the payload, which contains the claims. The third part is the signature, which is used to verify that the sender of the JWT is who it claims to be and to ensure that the message wasn't changed along the way.

It is important to use HTTPS when transmitting JWTs to ensure that the JWT is not intercepted by an attacker. It is also a good idea to use short-lived JWTs (e.g., with an expiration time of one hour) and to refresh them frequently to reduce the risk of unauthorized access.

#### Storing JWT

There are a few different options for storing a JWT in a JavaScript application:

1. Cookies: You can store the JWT in a cookie and send it back to the server with each request. This is a simple and widely-supported option, but it has some limitations. For example, you can't access cookies from JavaScript on a different domain, and some users may have cookies disabled in their browser settings.
2. Local storage: You can store the JWT in the browser's local storage (localStorage) or session storage (sessionStorage). This option allows you to access the JWT from JavaScript on the same domain, but it is vulnerable to cross-site scripting (XSS) attacks, where an attacker can inject malicious code into your application and steal the JWT from the storage.
3. ***HttpOnly cookie***: You can store the JWT in an HttpOnly cookie, which is a cookie that can only be accessed by the server and not by client-side JavaScript. This option provides some protection against XSS attacks, but it is still vulnerable to other types of attacks, such as cross-site request forgery (CSRF).

ChatGPT says ... It is generally recommended to use a combination of options to provide the best security for your application. For example, you could store the JWT in an HttpOnly cookie and also in local storage, and use JavaScript to send the JWT from local storage to the server with each request. This way, you can still access the JWT from JavaScript on the same domain, while also protecting against XSS attacks.

However, for this implementation we have used ***#3 HttpOnly Cookie***.

### Key Configuration Areas

#### Nginx configuration snippet (Client to this Server)
>
> Nginx. Focus on add_header in preflight that allow cross domain (github.io) to access server.

```java
location / {
        proxy_pass http://localhost:8085;

        # Preflighted requests
        if ($request_method = OPTIONS ) {
                add_header "Access-Control-Allow-Credentials"  "true";
                add_header "Access-Control-Allow-Origin"  "https://myserver.github.io";
                add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, HEAD";
                add_header "Access-Control-Allow-MaxAge"  600;
                add_header "Access-Control-Allow-Headers" "Content-Type, Authorization, x-csrf-token";
                return 200;
        }

    }
```

#### Java JWT / Authenticate API
>
> Java. Focus on the response ResponseCookie to see type, path, age, and allowing for cross-origin (sameSite).

```java
@PostMapping("/authenticate")
public ResponseEntity<?> createAuthenticationToken(@RequestBody Person authenticationRequest) throws Exception {
    authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());
    final UserDetails userDetails = personDetailsService
            .loadUserByUsername(authenticationRequest.getEmail());
    final String token = jwtTokenUtil.generateToken(userDetails);
    final ResponseCookie tokenCookie = ResponseCookie.from("jwt", token)
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(3600)
        .sameSite("None; Secure")
        // .domain("example.com") // Set to backend domain
        .build();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, tokenCookie.toString()).build();
}
```

#### Java WebMvcConfigurer addCorsMappings
>
> Java. Focus on allowedOrigins, clients that can access this server server

```java
@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("https://myserver.github.io", "http://localhost:4000");
    }
```

#### Java Security Config
>
> Java. CORS enablement and headers to allow access to API endpoints from cross origin.

```java
.cors().and()
    .headers()
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Credentials", "true"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-ExposedHeaders", "*", "Authorization"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Headers", "Content-Type", "Authorization", "x-csrf-token"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-MaxAge", "600"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Methods", "POST", "GET", "OPTIONS", "HEAD"))
        //.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "https://nighthawkcoders.github.io", "http://localhost:4000"))
```

#### Authenticate with JWT in a JavaScript application

> This example sends a POST request to the /authorize endpoint with the user's credentials in the request body. If the login was successful, the server will return a 200 OK response with the JWT set to Application properties.

```javascript
/// URL for deployment
var url = "https://spring.nighthawkcodingsociety.com"
// Comment out next line for local testing
// url = "http://localhost:8085"
// Authenticate endpoint
const login_url = url + '/authenticate';


function login_user(){
    // Set body to include login data
    const body = {
        email: document.getElementById("uid").value,
        password: document.getElementById("password").value,
    };

    // Set Headers to support cross origin
    const requestOptions = {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        },
    };

    // Fetch JWT
    fetch(login_url, requestOptions)
    .then(response => {
        // trap error response from Web API
        if (!response.ok) {
            const errorMsg = 'Login error: ' + response.status;
            console.log(errorMsg);
            return;
        }
        // Success!!!
        // Redirect to Database location
        window.location.href = "/APCSA/data/database";
    })
}
```

You can then use the JWT for authentication in subsequent fetch requests as the browser sends JWT in the Authorization header.   Here is an example, but there is ***Nothing Unique*** in this example.  

```javascript
// prepare HTML result container for new output
  const resultContainer = document.getElementById("result");

  // prepare URL
  var url = "https://spring.nighthawkcodingsociety.com/api/person/";
  // Uncomment next line for localhost testing
  // url = "http://localhost:8085/api/person/";

  // set options for cross origin header request
  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // fetch the API
  fetch(url, options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors and display
      if (response.status !== 200) {
          const errorMsg = 'Database response error: ' + response.status;
          console.log(errorMsg);
          const tr = document.createElement("tr");
          const td = document.createElement("td");
          td.innerHTML = errorMsg;
          tr.appendChild(td);
          resultContainer.appendChild(tr);
          return;
      }
      // valid response will contain json data
      response.json().then(data => {
          console.log(data);
          for (const row of data) {
            // tr and td build out for each row
            const tr = document.createElement("tr");
            const name = document.createElement("td");
            const id = document.createElement("td");
            const age = document.createElement("td");
            // data is specific to the API
            name.innerHTML = row.name; 
            id.innerHTML = row.email; 
            age.innerHTML = row.age; 
            // this build td's into tr
            tr.appendChild(name);
            tr.appendChild(id);
            tr.appendChild(age);
            // add HTML to container
            resultContainer.appendChild(tr);
          }
      })
  })
  // catch fetch errors (ie ACCESS to server blocked)
  .catch(err => {
    console.error(err);
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = err + ": " + url;
    tr.appendChild(td);
    resultContainer.appendChild(tr);
  });
  ```

## Hacks
>
> This is first time that a nighthawkcoding society apps are under JWT.  There are some best practices, but these are simply preliminary thoughts.  These can be done in your project or on mine.

- GitHub Pages Application
  - Make a Login and SignUp option in upper left corner of page.  To handle this well it may require some them adjustment.  Login or Name should alway be displayed in upper right corner, review [csa.nighthawkcodingsociety.com](https://csa.nighthawkcodingsociety.com/) for example.
  - Only block or present login/signup page when someone fails on a fetch of something that is unauthorized.
  - Spring Application
  - Add Roles to authentication
  - Bring JavaScript or Spring/Thymeleaf Admin operations into this page.  Some Thymeleaf exists in the project,
- Blog or Video on your successes and how you got there.

## Hack Helpers
>
> Additional user and security elements.

- security/SecurityConfig.java.
  - This code sets up BCrypt as password encoder, this is wired into Spring Security
  - HTTP security is changed so that you white list things that you want secure.  It is possible to do this either way, white list authenticated `.antMatchers("/api/person/**").authenticated()` or white list permitted `.antMatchers("/", "/frontend/**").permitAll()`.  In either case, it is valuable to have a convention on naming endpoints to simplify rules.

```java
/*
* To enable HTTP Security in Spring, extend the WebSecurityConfigurerAdapter. 
*/
@Configuration
@EnableWebSecurity  // Beans to enable basic Web security
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private PersonDetailsService personDetailsService;

    @Bean  // Sets up password encoding style
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
        auth.userDetailsService(personDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    ...
}

```

- mvc\person\PersonDetailsService.java, implements UserDetailsService from JWT.
  - UserDetailsService is how we train Spring Security to use Person and PersonRoles POJOs for security.
  - PersonDetails makes sure each save use password encoding
  - PersonDetails in my implementation is to build abstraction of all the Jpa complexities, allowing  API and MVC classes and methods to be simpler and reusable.

```java
@Service
@Transactional
public class PersonDetailsService implements UserDetailsService {  // "implements" ties ModelRepo to Spring Security
    // Encapsulate many object into a single Bean (Person, Roles, and Scrum)
    @Autowired  // Inject PersonJpaRepository
    private PersonJpaRepository personJpaRepository;
    @Autowired  // Inject RoleJpaRepository
    private PersonRoleJpaRepository personRoleJpaRepository;
    @Autowired  // Inject PasswordEncoder
    private PasswordEncoder passwordEncoder;

    /* UserDetailsService Overrides and maps Person & Roles POJO into Spring Security */
    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personJpaRepository.findByEmail(email); // setting variable user equal to the method finding the username in the database
        if(person==null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        person.getRoles().forEach(role -> { //loop through roles
            authorities.add(new SimpleGrantedAuthority(role.getName())); //create a SimpleGrantedAuthority by passed in role, adding it all to the authorities list, list of roles gets past in for spring security
        });
        // train spring security to User and Authorities
        return new org.springframework.security.core.userdetails.User(person.getEmail(), person.getPassword(), authorities);
    }


    // ....

    // encode password prior to sava
    public void save(Person person) {
        person.setPassword(passwordEncoder.encode(person.getPassword()));
        personJpaRepository.save(person);
    }

    // ....

    // custom JPA query to find anything containing term in name or email ignoring case
    public  List<Person>listLike(String term) {
        return personJpaRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(term, term);
    }

    // ....

}
```

- mvc\ModelInit.java, used to initialize database for testing
  - The `CommandLineRunner run()` occurs prior to web site port being available.  Typically, there is only one Bean of type without application.properties override.  Thus, you see jokes and person in same runner.  Splitting this and having Person initialization in person package is desireable.
  - Class methods for Person (`Person.init`) is used to initialize object.  
  - Each object is checked and saved using `personService` methods.
  - Test Notes are added to ensure functionality.  Intention is to add notes into person package.

```java
@Component // Scans Application for ModelInit Bean, this detects CommandLineRunner
public class ModelInit {  
    @Autowired JokesJpaRepository jokesRepo;
    @Autowired NoteJpaRepository noteRepo;
    @Autowired PersonDetailsService personService;

    @Bean
    CommandLineRunner run() {  // The run() method will be executed after the application starts
        return args -> {

            // Joke database is populated with starting jokes
            String[] jokesArray = Jokes.init();
            for (String joke : jokesArray) {
                List<Jokes> jokeFound = jokesRepo.findByJokeIgnoreCase(joke);  // JPA lookup
                if (jokeFound.size() == 0)
                    jokesRepo.save(new Jokes(null, joke, 0, 0)); //JPA save
            }

            // Person database is populated with test data
            Person[] personArray = Person.init();
            for (Person person : personArray) {
                //findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase
                List<Person> personFound = personService.list(person.getName(), person.getEmail());  // lookup
                if (personFound.size() == 0) {
                    personService.save(person);  // save

                    // Each "test person" starts with a "test note"
                    String text = "Test " + person.getEmail();
                    Note n = new Note(text, person);  // constructor uses new person as Many-to-One association
                    noteRepo.save(n);  // JPA Save                  
                }
            }

        };
    }
}

```
