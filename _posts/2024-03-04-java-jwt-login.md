---
title: Java JWT Login
layout: base
description: A login screen that interacts with Java and obtains a JWT  
permalink: /java/login
---

## Login Page (Java)

<!-- Login Form -->
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

<script type="module">
    import { javaURI, fetchOptions } from '/teacher_portfolio/assets/js/api/config.js';

    // Set the URLs for the endpoints used in this script.
    const URL = javaURI + '/authenticate';
    const redirect =  "{{site.baseurl}}" + '/java/database'; 

    // Method to login user
    window.login_user = function() {

        // Set body to include login data from HTML form
        const body = {
            email: document.getElementById("uid").value,
            password: document.getElementById("password").value,
        };

        // Modify the options to use the POST method and include the request body.
        const authOptions = {
            ...fetchOptions, // This will copy all properties from options
            method: 'POST', // Override the method property
            cache: 'no-cache', // Set the cache property
            body: JSON.stringify(body)
        };

        document.getElementById("error-message").textContent = "";

        // Fetch JWT
        fetch(URL, authOptions)
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
            window.location.href = redirect;
        })
        .catch(error => {
            // Handle network errors
            console.log('Possible CORS or service down error: ' + error);
            document.getElementById("error-message").textContent = 'Possible CORS or service down error: ' + error;
        });
    }


</script>
