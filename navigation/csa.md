---
layout: base
title: Computer Science "A"
units: "1,2,3,4,5,6,7,8,9"
search_exclude: true
course: csa
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
    <p id="login-message" style="color: red;"></p>
</form>

<!-- Data Table Layout -->
<table>
  <thead>
  <tr>
    <th>Name</th>
    <th>ID</th>
    <th>Age</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>

<script type="module">
    import { javaURI, options } from '/teacher_portfolio/assets/js/api/config.js';

    // Set the URLs for the endpoints used in this script.
    const login_URL = javaURI + '/authenticate';
    const data_URL = javaURI + '/api/person/';

    // Method to login user
    window.login_user = function() {

        // Set body to include login data from HTML form
        const body = {
            email: document.getElementById("uid").value,
            password: document.getElementById("password").value,
        };

        // Modify the options to use the POST method and include the request body.
        const authOptions = {
            ...options, // This will copy all properties from options
            method: 'POST', // Override the method property
            cache: 'no-cache', // Set the cache property
            body: JSON.stringify(body)
        };

        document.getElementById("login-message").textContent = "";

        // Fetch JWT
        fetch(login_URL, authOptions)
        .then(response => {
            // trap error response from Web API
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);
                document.getElementById("login-message").textContent = errorMsg;
                return;
            }
            // Success!!!
            // Redirect to the Database location
            document.getElementById("login-message").textContent = "Success: " + document.getElementById("uid").value 
            database();
        })
        .catch(error => {
            // Handle network errors
            console.log('Possible CORS or service down error: ' + error);
            document.getElementById("login-message").textContent = 'Possible CORS or service down error: ' + error;
        });
    }

    function database() {
        // Define the loginForm and dataTable variables
        const loginForm = document.querySelector('form');
        const dataTable = document.querySelector('table');

        // prepare HTML result container for new output
        const resultContainer = document.getElementById("result");

        // Modify the options to use the POST method and include the request body.
        const authOptions = {
            ...options, // This will copy all properties from the options
            method: 'GET', // Override the method property
        };

        // fetch the API
        fetch(data_URL, options)
            // response is a RESTful "promise" on any successful fetch
            .then(response => {
            // check for response errors and display
            if (response.status !== 200) {
                // fails, show login form and hide data
                loginForm.style.display = 'block';
                dataTable.style.display = 'none';

                const errorMsg = 'Database response error: ' + response.status;
                console.log(errorMsg);
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.innerHTML = errorMsg;
                tr.appendChild(td);
                resultContainer.appendChild(tr);
                return;
            }
            // valid response will contain JSON data
            loginForm.style.display = 'none';
            dataTable.style.display = 'block';

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
                    // this builds td's into tr
                    tr.appendChild(name);
                    tr.appendChild(id);
                    tr.appendChild(age);
                    // append the row to table
                    resultContainer.appendChild(tr);
                }
            })
        })
        // catch fetch errors (ie ACCESS to server blocked)
        .catch(err => {
           // fails, show login form and hide data
            loginForm.style.display = 'block';
            dataTable.style.display = 'none'; 

            console.error(err);
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = err + ": " + url;
            tr.appendChild(td);
            resultContainer.appendChild(tr);
        });
    }

    window.onload = database;
</script>
