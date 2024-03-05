---
title: Java JWT Login
layout: base
description: A login screen that interacts with Java and obtains a JWT  
permalink: /java/login
---


<form action="javascript:login_user()">
    <p><label>
        User ID:
        <input type="text" name="uid" id="uid" required>
    </label></p>
    <p><label>
        Password:
        <input type="password" name="password" id="password" required>
    </label></p>
    <p>
        <button>Login</button>
    </p>
    <p id="error-message" style="color: red;"></p>
</form>

<script>
    // URL for deployment
    var url = "https://spring.nighthawkcodingsociety.com"
    // Comment out the next line for local testing
    // url = "http://localhost:8085"
    // Authenticate endpoint
    const login_url = url + '/authenticate';


    function login_user(){
        // Set body to include login data
        const body = {
            email: document.getElementById("uid").value,
            password: document.getElementById("password").value,
        };

        // Set Headers to support cross-origin
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

        document.getElementById("error-message").textContent = "";

        // Fetch JWT
        fetch(login_url, requestOptions)
        .then(response => {
            // trap error response from Web API
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);
                document.getElementById("error-message").textContent = errorMsg;
                return;
            }
            // Success!!!
            // Redirect to Database location
            window.location.href = "/teacher_portfolio/java/database";
        })
        .catch(error => {
            // Handle network errors
            console.log('Possible CORS or service down error: ' + error);
            document.getElementById("error-message").textContent = 'Possible CORS or service down error: ' + error;
        });
    }


</script>
